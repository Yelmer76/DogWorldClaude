// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC KENNEL — shared components (header, footer, dog card, etc.)
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateK, useEffect: useEffectK, useRef: useRefK } = React;

// ── Icons ───────────────────────────────────────────────────────────────────
const Ki = {
  check:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 12 10 17 19 7" /></svg>,
  arrow:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>,
  back:     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="14 6 8 12 14 18" /></svg>,
  burger:   <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>,
  close:    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>,
  chev:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>,
  chevD:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
  trophy:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5h8v4a4 4 0 0 1-8 0z" /><path d="M8 5H5v2a3 3 0 0 0 3 3" /><path d="M16 5h3v2a3 3 0 0 1-3 3" /><path d="M9 19h6" /><path d="M10 16h4" /><path d="M12 13v3" /></svg>,
  health:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M5 7l7-4 7 4" /></svg>,
  title:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5" /><path d="M9 14v6l3-2 3 2v-6" /></svg>,
  shield:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" /><polyline points="9 12 11 14 15 10" /></svg>,
  pin:      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  mail:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2" /><polyline points="3 8 12 14 21 8" /></svg>,
  phone:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>,
  star:     <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2l2.5 6.6L21 9.5l-5 4.5L17.5 21 12 17.5 6.5 21 8 14l-5-4.5 6.5-.9z" /></svg>,
  wreath:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7" /><path d="M5 12c1-3 4-4 7-3" /><path d="M19 12c-1-3-4-4-7-3" /><path d="M12 4v4" /></svg>,
  edit:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L9 21H3v-6z" /></svg>,
  eye:      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>,
  globe:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
};

// ── Themed photo placeholder ────────────────────────────────────────────────
function Pk({ tone = "elkhound", muted = false, label = "", width = "100%", height = 200, radius = 8, style = {} }) {
  return (
    <div
      className={`pk-photo tone-${tone} ${muted ? "is-muted" : ""}`}
      style={{ width, height, borderRadius: radius, ...style }}
    >
      <span>{label}</span>
    </div>
  );
}

// ── Trust badge row ─────────────────────────────────────────────────────────
function TrustBadges({ kennel, tone = "dark" }) {
  return (
    <div className={`trust-row trust-${tone}`}>
      <span className="trust-pill trust-verified">
        {Ki.check} DogWorld<sup>(tmp)</sup> Verifisert
      </span>
      <span className="trust-pill">
        {Ki.shield} NKK-medlem
      </span>
      <span className={`trust-pill karma-${kennel.karmaTier.toLowerCase()}`}>
        <span className="trust-gem"></span> {kennel.karmaTier}-tier
      </span>
    </div>
  );
}

// ── Section heading helper ──────────────────────────────────────────────────
function SectionHead({ eyebrow, title, sub, action }) {
  return (
    <header className="sec-head">
      <div>
        {eyebrow && <div className="sec-eyebrow">{eyebrow}</div>}
        <h2 className="sec-title">{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {action}
    </header>
  );
}

// ── Public dog card (for kennel page listings) ──────────────────────────────
function PubDogCard({ dog, onTap, compact = false, kind = "show" }) {
  return (
    <button className={`pdog-card ${compact ? "is-compact" : ""} ${kind === "commercial" ? "is-commercial" : ""}`} onClick={onTap}>
      <div className="pdog-photo">
        <Pk tone={dog.tone || (dog.sex === "m" ? "sire" : "dam")} height="100%" radius={0} label={dog.name.split(/\s+/)[0].toUpperCase()} />
        <span className={`pdog-sex ${dog.sex === "m" ? "is-sire" : "is-dam"}`}>{dog.sex === "m" ? "♂" : "♀"}</span>
      </div>
      <div className="pdog-body">
        {dog.titles && dog.titles.length > 0 && (
          <div className="pdog-titles">{dog.titles.join(" ")}</div>
        )}
        <div className="pdog-name">{dog.name}</div>
        <div className="pdog-meta">{dog.born ? `Født ${dog.born}` : ""}</div>
        {dog.health && (
          <div className="pdog-health">
            {Ki.health} <span>{dog.health}</span>
          </div>
        )}
        {dog.note && <div className="pdog-note">{dog.note}</div>}
      </div>
    </button>
  );
}

// ── Application modal (Søk om valp) ─────────────────────────────────────────
function ApplicationModal({ open, kennel, onClose, onSubmit }) {
  const [step, setStep] = useStateK(0);
  const [form, setForm] = useStateK(applicationFormDefaults);

  useEffectK(() => { if (open) { setStep(0); setForm(applicationFormDefaults); } }, [open]);

  if (!open) return null;

  const next = () => setStep(s => Math.min(2, s + 1));
  const sections = [
    {
      title: "Litt om hjemmet",
      body: (
        <>
          <FormRow label="Hjemmesituasjon">
            <textarea className="pk-textarea" value={form.household} onChange={(e) => setForm({ ...form, household: e.target.value })} placeholder="Hvem bor i hjemmet? Voksne, barn, andre hunder?" rows={3} />
          </FormRow>
          <FormRow label="Bolig">
            <textarea className="pk-textarea" value={form.housing} onChange={(e) => setForm({ ...form, housing: e.target.value })} placeholder="Enebolig med hage, leilighet med balkong, …" rows={2} />
          </FormRow>
        </>
      ),
    },
    {
      title: "Erfaring og hverdag",
      body: (
        <>
          <FormRow label="Tidligere hunder">
            <textarea className="pk-textarea" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="Hva slags hunder har du hatt? Hva har du lært?" rows={3} />
          </FormRow>
          <FormRow label="Aktivitetsnivå">
            <textarea className="pk-textarea" value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} placeholder="Tur, jakt, lydighet, agility, hverdag …" rows={2} />
          </FormRow>
        </>
      ),
    },
    {
      title: "Motivasjon",
      body: (
        <>
          <FormRow label={`Hvorfor en valp fra ${kennel.name}?`}>
            <textarea className="pk-textarea" value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} placeholder="Fortell oss litt om hvorfor akkurat oss." rows={4} autoFocus />
          </FormRow>
          <p className="pk-fineprint">Vi behandler søknaden innen 3 dager. Ingen forpliktelser før vi har snakket sammen.</p>
        </>
      ),
    },
  ];

  return (
    <div className="pk-modal-back" onClick={onClose}>
      <div className="pk-modal" onClick={(e) => e.stopPropagation()}>
        <header className="pk-modal-head">
          <div>
            <div className="pk-modal-eyebrow">Søknad · {kennel.name}</div>
            <h3>{sections[step].title}</h3>
            <div className="pk-modal-progress">
              <span className={`pk-dot ${step >= 0 ? "is-on" : ""}`}></span>
              <span className={`pk-dot ${step >= 1 ? "is-on" : ""}`}></span>
              <span className={`pk-dot ${step >= 2 ? "is-on" : ""}`}></span>
            </div>
          </div>
          <button className="pk-modal-close" onClick={onClose} aria-label="Lukk">{Ki.close}</button>
        </header>
        <div className="pk-modal-body">
          {sections[step].body}
        </div>
        <footer className="pk-modal-foot">
          {step > 0 && (
            <button className="pk-btn pk-btn-secondary" onClick={() => setStep(s => s - 1)}>
              {Ki.back} Tilbake
            </button>
          )}
          {step < 2 ? (
            <button className="pk-btn pk-btn-primary" style={{ marginLeft: "auto" }} onClick={next}>
              Neste {Ki.arrow}
            </button>
          ) : (
            <button className="pk-btn pk-btn-primary" style={{ marginLeft: "auto" }} onClick={() => onSubmit(form)}>
              Send søknad {Ki.arrow}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="pk-form-row">
      <label className="pk-form-label">{label}</label>
      {children}
    </div>
  );
}

// ── Mobile menu drawer ──────────────────────────────────────────────────────
function MobileMenu({ open, items, onSelect, onClose }) {
  if (!open) return null;
  return (
    <div className="pk-menu-back" onClick={onClose}>
      <div className="pk-menu" onClick={(e) => e.stopPropagation()}>
        <header className="pk-menu-head">
          <span>Meny</span>
          <button className="pk-menu-close" onClick={onClose}>{Ki.close}</button>
        </header>
        {items.map((item) => (
          <button key={item.id} className="pk-menu-item" onClick={() => { onSelect(item); onClose(); }}>
            <span>{item.label}</span>
            {Ki.chev}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Public header (mobile + desktop) ────────────────────────────────────────
function PubHeader({ kennel, page, onNav, onMenuOpen, sticky }) {
  return (
    <header className={`pk-nav ${sticky ? "is-sticky" : ""}`}>
      <button className="pk-brand" onClick={() => onNav("home")}>
        <div className="pk-brand-mark">{kennel.name.split(" ")[1]?.[0] || "K"}</div>
        <div className="pk-brand-text">
          <div className="pk-brand-name">{kennel.name}</div>
          <div className="pk-brand-sub">{kennel.breed} · {kennel.location}</div>
        </div>
      </button>
      <nav className="pk-nav-links">
        {navItems.map((n) => (
          <button key={n.id} className="pk-nav-link" onClick={() => onNav(n.id)}>{n.label}</button>
        ))}
      </nav>
      <button className="pk-nav-burger" onClick={onMenuOpen} aria-label="Meny">{Ki.burger}</button>
    </header>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function PubFooter({ kennel }) {
  return (
    <footer className="pk-foot">
      <div className="pk-foot-grid">
        <div className="pk-foot-col">
          <div className="pk-foot-mark">
            <div className="pk-brand-mark">{kennel.name.split(" ")[1]?.[0] || "K"}</div>
            <span>{kennel.name}</span>
          </div>
          <p>{kennel.contact.postal}</p>
          <p className="pk-foot-mute">{kennel.nkkReg}</p>
          <p className="pk-foot-mute">© 2026 {kennel.name}</p>
        </div>
        <div className="pk-foot-col">
          <div className="pk-foot-h">Sidekart</div>
          {navItems.map(n => <a key={n.id} href="#" className="pk-foot-link" onClick={(e) => e.preventDefault()}>{n.label}</a>)}
        </div>
        <div className="pk-foot-col">
          <div className="pk-foot-h">Kontakt</div>
          <p className="pk-foot-line">{Ki.mail} {kennel.contact.email}</p>
          <p className="pk-foot-line">{Ki.phone} {kennel.contact.phone}</p>
          <div className="pk-foot-affil">
            {kennel.affiliations.map(a => <span key={a} className="pk-foot-affil-chip">{a}</span>)}
          </div>
        </div>
        <div className="pk-foot-col">
          <div className="pk-foot-h">Drevet av</div>
          <div className="pk-foot-pb">
            <div className="pk-foot-pb-mark">D</div>
            <div>
              <div className="pk-foot-pb-name">DogWorld<sup>(tmp)</sup></div>
              <a href="#" className="pk-foot-pb-cta" onClick={(e) => e.preventDefault()}>Bygg din egen kennelside →</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pk-foot-legal">
        <span>Personvern · Vilkår · Cookies</span>
        <span>GDPR-vennlig · Hostet i Norge</span>
      </div>
    </footer>
  );
}

// ── Owner-view edit banner ─────────────────────────────────────────────────
function OwnerBanner({ mode, onToggle }) {
  return (
    <div className="owner-banner">
      <div className="owner-banner-left">
        {Ki.eye}
        <span>Du ser kennelen din som <strong>eier</strong></span>
      </div>
      <div className="owner-banner-right">
        <button className={`owner-toggle ${mode === "view" ? "is-active" : ""}`} onClick={() => onToggle("view")}>
          {Ki.eye} Se som besøkende
        </button>
        <button className={`owner-toggle ${mode === "edit" ? "is-active" : ""}`} onClick={() => onToggle("edit")}>
          {Ki.edit} Rediger
        </button>
      </div>
    </div>
  );
}

// ── Edit affordance overlay ────────────────────────────────────────────────
function EditAff({ label = "Rediger" }) {
  return (
    <span className="edit-aff">
      {Ki.edit} <span>{label}</span>
    </span>
  );
}

Object.assign(window, {
  Ki, Pk, TrustBadges, SectionHead, PubDogCard,
  ApplicationModal, MobileMenu, PubHeader, PubFooter,
  OwnerBanner, EditAff, FormRow,
});
