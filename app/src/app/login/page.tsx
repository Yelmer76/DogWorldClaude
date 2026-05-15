import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, issueMagicLink } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * /login — magic-link entry. Server-component form: POSTs the email
 * to a Server Action, which issues a token and redirects to
 * /login/sent?email=… so we can show the dev magic link.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const me = await getCurrentUser();
  if (me) {
    redirect(params.next ?? "/today");
  }

  async function action(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim();
    if (!email) {
      redirect("/login?error=empty");
    }
    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("host") ?? "localhost:3000";
    const origin = `${proto}://${host}`;
    const result = await issueMagicLink(email, origin);
    redirect(
      `/login/sent?email=${encodeURIComponent(result.email)}&link=${encodeURIComponent(result.url)}`,
    );
  }

  return (
    <main className="min-h-screen grid place-items-center bg-bg-page px-4">
      <div className="w-full max-w-[420px] bg-bg-card border border-n-200 rounded-card p-6 md:p-8 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)]">
        <div className="text-xs text-n-500 mb-6 inline-flex items-center gap-1">
          DogWorld(tmp)
        </div>
        <h1 className="m-0 text-2xl md:text-[28px] font-semibold tracking-[-0.015em] text-n-950">
          Logg inn
        </h1>
        <p className="m-0 mt-2 text-sm text-n-700 leading-relaxed">
          Vi sender deg en magisk lenke til e-posten din. Ingen passord —
          klikker du lenken, er du innlogget.
        </p>

        <form action={action} className="mt-6 flex flex-col gap-3">
          <label className="block">
            <span className="text-sm font-medium text-n-950 block mb-1.5">
              E-post
            </span>
            <input
              type="email"
              name="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="ole@granheim.no"
              className="w-full bg-bg-card border border-n-300 rounded-btn px-3 py-2.5 text-base focus:outline-none focus:border-forest-500"
            />
          </label>

          {params.error === "empty" && (
            <div className="text-xs text-error-fg">
              Vennligst skriv inn e-postadressen din.
            </div>
          )}
          {params.error === "expired" && (
            <div className="text-xs text-warning-fg">
              Lenken har utløpt eller er allerede brukt — be om en ny.
            </div>
          )}

          <button
            type="submit"
            className="bg-ochre-600 hover:bg-[#25415a] text-white rounded-btn px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Send magisk lenke
          </button>
        </form>

        <p className="text-[11px] text-n-500 mt-6 text-center">
          For demo: bruk{" "}
          <span className="font-mono">ole@granheim.no</span> eller{" "}
          <span className="font-mono">marit@granheim.no</span>.
          <br />
          Andre e-poster oppretter en helt ny konto.
        </p>
      </div>
    </main>
  );
}
