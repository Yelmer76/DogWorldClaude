/**
 * E-post-utsending via Resend.
 *
 * Lokalt dev:   Hvis RESEND_API_KEY mangler, logger vi bare til konsoll
 *               (samme dev-vennlighet som Sprint 14 hadde).
 * Hvis nøkkel:  Sender ekte mail via Resend SDK.
 *
 * I produksjon (Cloudflare Pages) settes RESEND_API_KEY som en secret:
 *   wrangler secret put RESEND_API_KEY
 */
import "server-only";
import { Resend } from "resend";

const FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";

export type MagicLinkEmail = {
  to: string;
  url: string;
  expiresAt: string;
};

/**
 * Send the magic-link email. Returns true if the user actually got an
 * email; false if we just logged it to console (dev mode without key).
 */
export async function sendMagicLinkEmail(
  msg: MagicLinkEmail,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  // No key → dev mode, just log
  if (!apiKey) {
    console.log("\n────────────────────────────────────────────");
    console.log(`✉  [DEV] Magic link for ${msg.to}`);
    console.log(`   ${msg.url}`);
    console.log(`   (expires ${msg.expiresAt})`);
    console.log("   Set RESEND_API_KEY to send real email");
    console.log("────────────────────────────────────────────\n");
    return false;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `DogWorld(tmp) <${FROM}>`,
    to: msg.to,
    subject: "Logg inn på DogWorld(tmp)",
    text: [
      `Hei,`,
      ``,
      `Klikk lenken under for å logge inn på DogWorld(tmp). Lenken`,
      `er gyldig i 15 minutter og kan kun brukes én gang.`,
      ``,
      `${msg.url}`,
      ``,
      `Om du ikke ba om å logge inn, kan du trygt ignorere denne mailen.`,
      ``,
      `— DogWorld(tmp)`,
    ].join("\n"),
    html: magicLinkHtml(msg),
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(`E-post-utsending feilet: ${error.message}`);
  }

  return true;
}

function magicLinkHtml({ to, url, expiresAt }: MagicLinkEmail): string {
  const expiresClock = new Date(expiresAt).toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `<!doctype html>
<html lang="nb">
<body style="margin:0;font-family:-apple-system,Segoe UI,Inter,sans-serif;background:#F5F2ED;padding:40px 20px;color:#1a1a1a;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e7e3d8;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:32px 32px 8px;">
      <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#3F5A55;font-family:'JetBrains Mono',monospace;">DogWorld(tmp)</p>
      <h1 style="margin:12px 0 0;font-size:24px;letter-spacing:-0.01em;color:#1a1a1a;">Logg inn</h1>
      <p style="margin:12px 0 0;font-size:15px;line-height:1.55;color:#5a5a5a;">
        Klikk knappen for å logge inn som ${escapeHtml(to)}.
        Lenken er gyldig fram til kl. ${expiresClock} og kan kun brukes én gang.
      </p>
    </td></tr>
    <tr><td style="padding:24px 32px;">
      <a href="${url}" style="display:inline-block;background:#1C3245;color:#fff;text-decoration:none;padding:12px 20px;border-radius:6px;font-size:15px;font-weight:500;">Logg inn nå →</a>
    </td></tr>
    <tr><td style="padding:8px 32px 32px;">
      <p style="margin:0;font-size:12px;color:#8a8a8a;line-height:1.55;">
        Fungerer ikke knappen? Kopier denne URL-en til nettleseren:
      </p>
      <p style="margin:8px 0 0;font-size:12px;color:#3F5A55;font-family:'JetBrains Mono',monospace;word-break:break-all;">
        ${url}
      </p>
    </td></tr>
    <tr><td style="padding:16px 32px;border-top:1px solid #efeae0;background:#faf8f3;">
      <p style="margin:0;font-size:11px;color:#8a8a8a;">
        Om du ikke ba om å logge inn, kan du trygt ignorere denne mailen.
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
