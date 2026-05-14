// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING — Screen components
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateO, useEffect: useEffectO, useRef: useRefO } = React;

// ── Tiny icon set ───────────────────────────────────────────────────────────
const I = {
  arrow: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>,
  back:  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="14 6 8 12 14 18" /></svg>,
  check: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 12 10 17 19 7" /></svg>,
  close: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>,
  pen:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L9 21H3v-6z" /></svg>,
  link:  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M14 11a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /></svg>,
  map:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20" /><line x1="9" y1="4" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="20" /></svg>,
  dog:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="10" r="2.6" /><circle cx="17" cy="10" r="2.2" /><path d="M5 19c0-2.8 1.8-5 4-5s4 2.2 4 5" /></svg>,
  photo: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="3" /><path d="M8 6l2-3h4l2 3" /></svg>,
  doc:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><polyline points="14 3 14 8 19 8" /></svg>,
  trophy: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5h8v4a4 4 0 0 1-8 0z" /><path d="M8 5H5v2a3 3 0 0 0 3 3" /><path d="M16 5h3v2a3 3 0 0 1-3 3" /><path d="M9 19h6" /><path d="M10 16h4" /><path d="M12 13v3" /></svg>,
  health: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M5 7l7-4 7 4" /></svg>,
  tree:  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="12" r="2" /><path d="M8 6h4l4 6-4 6H8" /></svg>,
  mail:  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2" /><polyline points="3 8 12 14 21 8" /></svg>,
  globe: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
  blank: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="14" height="18" rx="2" /><line x1="10" y1="10" x2="16" y2="10" opacity="0.4" /><line x1="10" y1="14" x2="14" y2="14" opacity="0.4" /></svg>,
  migrate: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="7" height="12" rx="1.5" /><rect x="15" y="6" width="7" height="12" rx="1.5" /><line x1="10" y1="12" x2="14" y2="12" /><polyline points="12 10 14 12 12 14" /></svg>,
  chev:  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>,
};

// ── Conf dot ────────────────────────────────────────────────────────────────
function ConfDot({ level }) {
  return <span className={`conf-dot conf-${level}`} title={level === "high" ? "Høy sikkerhet" : level === "medium" ? "Middels sikkerhet" : "Lav — sjekk gjerne"}></span>;
}

// ── Photo (themed) ──────────────────────────────────────────────────────────
function PhotoO({ tone = "elkhound", width = "100%", height = 120, radius = 8, label = "", style = {} }) {
  const cls = `photo-o tone-${tone}`;
  return <div className={cls} style={{ width, height, borderRadius: radius, ...style }}><span>{label}</span></div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1 — WELCOME
// ─────────────────────────────────────────────────────────────────────────────
function WelcomeScreen({ onNext, onLogin }) {
  return (
    <div className="scr welcome">
      <div className="welcome-bg" aria-hidden="true"></div>
      <div className="welcome-content">
        <div className="welcome-mark">
          <span>D</span>
        </div>
        <div className="welcome-supertext">Velkommen til DogWorld<sup>(tmp)</sup></div>
        <h1 className="welcome-head">
          Få kennelen<br/>din online<br/>på 10 minutter.
        </h1>
        <p className="welcome-sub">
          Vi flytter alle dine hunder, kull og bilder fra den gamle nettsiden din —<br/>gratis, mens du tar en kaffe.
        </p>
        <div className="welcome-actions">
          <button className="btn-o btn-o-primary btn-o-lg" onClick={onNext}>
            Kom i gang
            {I.arrow}
          </button>
          <button className="btn-o btn-o-link" onClick={onLogin}>
            Logg inn (har allerede konto)
          </button>
        </div>
      </div>
      <div className="welcome-foot">
        <span>Brukt av 240+ kenneler i Norden</span>
        <span className="welcome-foot-sep">·</span>
        <span>Gratis under 20 hunder</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2 — EMAIL (passwordless)
// ─────────────────────────────────────────────────────────────────────────────
function EmailScreen({ onNext, onBack }) {
  const [email, setEmail] = useStateO("marit@granheim.no");
  const [sent, setSent] = useStateO(false);

  return (
    <div className="scr panel">
      <FormHeader onBack={onBack} eyebrow="Trinn 1 av 5" title="Hva er e-postadressen din?" sub="Vi sender deg en magisk lenke — ingen passord å huske." />

      {!sent ? (
        <>
          <div className="field-o">
            <label className="field-o-label">E-postadresse</label>
            <input
              className="field-o-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="marit@granheim.no"
              autoFocus
            />
          </div>
          <div className="form-actions">
            <button className="btn-o btn-o-primary btn-o-lg" onClick={() => setSent(true)} disabled={!email.includes("@")}>
              Send meg lenken
              {I.arrow}
            </button>
            <p className="form-fineprint">Vi deler aldri e-posten din. Du kan slette kontoen når som helst.</p>
          </div>
        </>
      ) : (
        <div className="sent-state">
          <div className="sent-art">{I.mail}</div>
          <h3 className="sent-title">Sjekk innboksen din</h3>
          <p className="sent-sub">
            Vi sendte en magisk lenke til <strong>{email}</strong>.<br/>
            Lenken utløper om 10 minutter.
          </p>
          <button className="btn-o btn-o-primary btn-o-lg" onClick={onNext}>
            Jeg har klikket på lenken
            {I.arrow}
          </button>
          <button className="btn-o btn-o-link" style={{ marginTop: 12 }} onClick={() => setSent(false)}>
            Bruk en annen e-post
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3 — KENNEL BASICS
// ─────────────────────────────────────────────────────────────────────────────
function BasicsScreen({ onNext, onBack }) {
  const [name, setName] = useStateO("Kennel Granheim");
  const [country, setCountry] = useStateO("Norge");
  const [breeds, setBreeds] = useStateO(["Norsk Elghund"]);
  const [breedQuery, setBreedQuery] = useStateO("");

  const filtered = breedSuggestions.filter(b => !breeds.includes(b) && (breedQuery === "" || b.toLowerCase().includes(breedQuery.toLowerCase())));

  return (
    <div className="scr panel">
      <FormHeader onBack={onBack} eyebrow="Trinn 2 av 5" title="Litt om kennelen din" sub="Tre raske spørsmål — så kommer det morsomme." />

      <div className="field-o">
        <label className="field-o-label">Kennelens navn</label>
        <input className="field-o-input" value={name} onChange={(e) => setName(e.target.value)} />
        <span className="field-o-hint">Brukes på offentlig profil og stamtavler.</span>
      </div>

      <div className="field-o">
        <label className="field-o-label">Land</label>
        <div className="field-o-input field-o-select">
          <span>{country}</span>
          <span className="dropdown-flag">🇳🇴</span>
          {I.chev}
        </div>
        <span className="field-o-hint">Avgjør hvilket register vi kobler stamtavler mot (NKK, VDH, KC…)</span>
      </div>

      <div className="field-o">
        <label className="field-o-label">Hvilke raser?</label>
        <div className="chips-row">
          {breeds.map((b) => (
            <span key={b} className="chip-pick">
              {b}
              <button className="chip-x" onClick={() => setBreeds(breeds.filter(x => x !== b))} aria-label={`Fjern ${b}`}>{I.close}</button>
            </span>
          ))}
          <input
            className="chip-input"
            placeholder={breeds.length === 0 ? "Søk etter rase…" : "Legg til en rase…"}
            value={breedQuery}
            onChange={(e) => setBreedQuery(e.target.value)}
          />
        </div>
        {breedQuery && filtered.length > 0 && (
          <div className="chip-suggest">
            {filtered.slice(0, 4).map((b) => (
              <button key={b} className="chip-suggest-item" onClick={() => { setBreeds([...breeds, b]); setBreedQuery(""); }}>{b}</button>
            ))}
          </div>
        )}
        <span className="field-o-hint">Vi forhåndsutfyller riktige helse-tester og NKK-regler for rasen din.</span>
      </div>

      <div className="form-actions">
        <button className="btn-o btn-o-primary btn-o-lg" onClick={onNext} disabled={!name || breeds.length === 0}>
          Fortsett
          {I.arrow}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4 — WEDGE (the question that defines the product)
// ─────────────────────────────────────────────────────────────────────────────
function WedgeScreen({ onMigrate, onScratch, onBack }) {
  return (
    <div className="scr panel">
      <FormHeader onBack={onBack} eyebrow="Trinn 3 av 5" title="Har du en eksisterende nettside vi kan flytte fra?" sub="Du kan alltid endre dette senere — men de fleste sparer timer på å starte med å importere." />

      <div className="wedge-cards">
        <button className="wedge-card is-primary" onClick={onMigrate}>
          <div className="wedge-card-eyebrow">Anbefalt</div>
          <div className="wedge-card-icon">{I.migrate}</div>
          <h3 className="wedge-card-title">Ja — flytt mine hunder hit</h3>
          <p className="wedge-card-sub">Lim inn URL-en, så henter KI alt automatisk. Du får gjennomgå før publisering.</p>
          <div className="wedge-card-foot">
            <span>Tar 3–5 minutter</span>
            {I.arrow}
          </div>
        </button>

        <button className="wedge-card" onClick={onScratch}>
          <div className="wedge-card-icon">{I.blank}</div>
          <h3 className="wedge-card-title">Nei — start fra null</h3>
          <p className="wedge-card-sub">Bygg kennelen min steg for steg. Du kan importere senere når som helst.</p>
          <div className="wedge-card-foot">
            <span>Tar 15+ minutter</span>
            {I.arrow}
          </div>
        </button>
      </div>

      <div className="wedge-alt">
        Importerer du fra et annet program? &nbsp;
        <a href="#" onClick={(e) => e.preventDefault()}>ZooEasy · Breeders Assistant · CSV →</a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 5 — URL
// ─────────────────────────────────────────────────────────────────────────────
function UrlScreen({ onNext, onBack }) {
  const [url, setUrl] = useStateO("https://kennel-granheim.no");

  return (
    <div className="scr panel">
      <FormHeader onBack={onBack} eyebrow="Trinn 4 av 5" title="Hvor er den gamle nettsiden din?" sub="Vi støtter WordPress, Wix, Squarespace, Weebly og de fleste andre. Tar 30–90 sekunder." />

      <div className="field-o url-field">
        <label className="field-o-label">URL til den gamle nettsiden</label>
        <div className="url-input-wrap">
          {I.globe}
          <input
            className="field-o-input url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://kennel-granheim.no"
          />
        </div>
        <div className="platform-row">
          <span className="platform-label">Vi kjenner igjen:</span>
          <span className="platform-pill">WordPress</span>
          <span className="platform-pill is-detected">Wix</span>
          <span className="platform-pill">Squarespace</span>
          <span className="platform-pill">Weebly</span>
          <span className="platform-pill">… +12 andre</span>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-o btn-o-primary btn-o-lg" onClick={onNext}>
          Hent dataene mine
          {I.arrow}
        </button>
        <p className="form-fineprint">
          🔒 Vi henter kun det som allerede er offentlig på nettsiden din. Ingen pålogging nødvendig.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 6 — CRAWL (magic moment)
// ─────────────────────────────────────────────────────────────────────────────
function CrawlScreen({ onDone, onBack }) {
  const [shown, setShown] = useStateO(0);
  const [progress, setProgress] = useStateO(0);

  useEffectO(() => {
    const timers = [];
    crawlSteps.forEach((s, i) => {
      timers.push(setTimeout(() => setShown(i + 1), s.t));
    });
    // Progress bar
    const start = Date.now();
    const total = crawlSteps[crawlSteps.length - 1].t + 500;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // Auto-advance after final
    timers.push(setTimeout(onDone, total + 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="scr crawl">
      <header className="crawl-head">
        <div className="crawl-mark"><div className="crawl-mark-pulse"></div>D</div>
        <h2 className="crawl-title">Henter dataene fra <strong>kennel-granheim.no</strong>...</h2>
        <div className="crawl-progress-bar">
          <div className="crawl-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="crawl-progress-meta">
          <span>{Math.round(progress)} %</span>
          <span>{Math.max(0, Math.ceil((100 - progress) / 100 * (crawlSteps[crawlSteps.length - 1].t / 1000)))} sek igjen</span>
        </div>
      </header>

      <div className="crawl-log">
        {crawlSteps.slice(0, shown).map((s, i) => (
          <div key={i} className={`crawl-entry ${i === shown - 1 ? "is-latest" : ""}`}>
            <span className="crawl-entry-icon">{I[s.icon] || I.check}</span>
            <span className="crawl-entry-text">{s.text}</span>
            {s.mono && <span className="crawl-entry-mono">{s.mono}</span>}
            <span className="crawl-entry-tick">{I.check}</span>
          </div>
        ))}
        {shown < crawlSteps.length && (
          <div className="crawl-entry crawl-entry-pending">
            <span className="crawl-pending-dot"></span>
            <span className="crawl-entry-text">Leser videre …</span>
          </div>
        )}
      </div>

      <div className="crawl-foot">
        Du kan trygt forlate denne skjermen — vi varsler deg på e-post når vi er ferdige.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 7 — REVIEW (the hardest UX)
// ─────────────────────────────────────────────────────────────────────────────
function ReviewScreen({ onNext, onBack, variant }) {
  const isEmpty = variant === "empty";
  const allDefault = variant === "all-confirmed";
  const showDetail = variant === "expanded";

  const [statuses, setStatuses] = useStateO(() => {
    const s = {};
    extractedDogs.forEach(d => { s[d.id] = allDefault ? "confirmed" : "pending"; });
    return s;
  });
  const [openId, setOpenId] = useStateO(showDetail ? "bobby" : null);
  const [editId, setEditId] = useStateO(null);

  useEffectO(() => {
    if (variant === "all-confirmed") {
      const s = {};
      extractedDogs.forEach(d => { s[d.id] = "confirmed"; });
      setStatuses(s);
      setOpenId(null);
      setEditId(null);
    } else if (variant === "expanded") {
      const s = {};
      extractedDogs.forEach(d => { s[d.id] = "pending"; });
      setStatuses(s);
      setOpenId("bobby");
      setEditId(null);
    } else {
      const s = {};
      extractedDogs.forEach(d => { s[d.id] = "pending"; });
      setStatuses(s);
      setOpenId(null);
      setEditId(null);
    }
  }, [variant]);

  if (isEmpty) {
    return (
      <div className="scr panel">
        <FormHeader onBack={onBack} eyebrow="Trinn 5 av 5" title="Vi fant ikke nok data på den gamle nettsiden din" sub="Det skjer noen ganger — ofte når nettsiden er bak innlogging eller bruker tunge bilder uten tekst." />
        <div className="review-empty">
          <div className="review-empty-art">{I.dog}</div>
          <p>Du kan fortsatt sette opp kennelen. Velg én:</p>
          <div className="review-empty-actions">
            <button className="btn-o btn-o-secondary">Importer fra ZooEasy</button>
            <button className="btn-o btn-o-secondary">Last opp CSV / Excel</button>
            <button className="btn-o btn-o-primary" onClick={onNext}>Start fra null</button>
          </div>
        </div>
      </div>
    );
  }

  const confirmed = Object.values(statuses).filter(s => s === "confirmed").length;
  const rejected = Object.values(statuses).filter(s => s === "rejected").length;
  const remaining = extractedDogs.length - confirmed - rejected;
  const allDone = remaining === 0;

  const confirm = (id) => setStatuses(s => ({ ...s, [id]: s[id] === "confirmed" ? "pending" : "confirmed" }));
  const reject  = (id) => setStatuses(s => ({ ...s, [id]: "rejected" }));
  const reset   = (id) => setStatuses(s => ({ ...s, [id]: "pending" }));

  return (
    <div className="scr review">
      <header className="review-head">
        <div className="review-back-row">
          <button className="back-btn" onClick={onBack} aria-label="Tilbake">{I.back}</button>
          <span className="review-eyebrow">Trinn 5 av 5</span>
        </div>
        <h2 className="review-title">Vi fant {extractedDogs.length} hunder. Bekreft hver enkelt.</h2>
        <p className="review-sub">Trykk «Bekreft» på de som ser riktige ut, «Rett» for å justere, eller «Avvis» for å hoppe over. Du kan også tappe på et kort for detaljer.</p>
        <div className="review-progress">
          <div className="review-progress-track">
            <div className="review-progress-fill" style={{ width: `${(confirmed / extractedDogs.length) * 100}%` }}></div>
          </div>
          <span className="review-progress-text">{confirmed} av {extractedDogs.length} bekreftet · {rejected > 0 ? `${rejected} avvist · ` : ""}{remaining} igjen</span>
        </div>
      </header>

      <div className="review-grid">
        {extractedDogs.map((d) => (
          <ReviewCard
            key={d.id}
            dog={d}
            status={statuses[d.id]}
            isOpen={openId === d.id}
            onTap={() => setOpenId(openId === d.id ? null : d.id)}
            onConfirm={() => confirm(d.id)}
            onReject={() => reject(d.id)}
            onCorrect={() => setEditId(d.id)}
            onReset={() => reset(d.id)}
          />
        ))}
      </div>

      <footer className="review-foot">
        <button
          className={`btn-o ${allDone ? "btn-o-primary" : "btn-o-secondary is-disabled"} btn-o-lg`}
          onClick={allDone ? onNext : undefined}
          disabled={!allDone}
        >
          {allDone ? "Bekreft alle og fortsett" : `Bekreft alle ${remaining} resterende først`}
          {allDone && I.arrow}
        </button>
      </footer>

      {editId && (
        <EditModal
          dog={extractedDogs.find(d => d.id === editId)}
          onClose={() => setEditId(null)}
          onSave={() => { setEditId(null); confirm(editId); }}
        />
      )}
    </div>
  );
}

// ── Review card ─────────────────────────────────────────────────────────────
function ReviewCard({ dog, status, isOpen, onTap, onConfirm, onReject, onCorrect, onReset }) {
  const isStub = dog.stub;
  const isPhotoMissing = !dog.photo;
  const hasLow = dog.overall === "low" || dog.fields.some(f => f.conf === "low");
  const flagBg = status === "confirmed" ? "is-confirmed" : status === "rejected" ? "is-rejected" : "";

  return (
    <article className={`rev-card ${flagBg} ${isStub ? "is-stub" : ""} ${isOpen ? "is-open" : ""}`}>
      <button className="rev-card-main" onClick={onTap}>
        <div className="rev-photo-wrap">
          {dog.photo ? (
            <PhotoO tone={dog.tone} width="100%" height={140} radius={6} label={isStub ? "?" : dog.name.slice(0, 2).toUpperCase()} />
          ) : (
            <div className="rev-photo-missing">
              <span className="rev-photo-missing-icon">{I.photo}</span>
              <span>Ingen bilde funnet</span>
            </div>
          )}
          <span className={`rev-overall conf-${dog.overall}`}>
            <ConfDot level={dog.overall} />
            {dog.overall === "high" ? "Høy sikkerhet" : dog.overall === "medium" ? "Middels" : "Lav — sjekk"}
          </span>
        </div>

        <div className="rev-body">
          {dog.titles && dog.titles.length > 0 && (
            <div className="rev-titles">{dog.titles.join(" ")}</div>
          )}
          <h4 className="rev-name">{dog.name}</h4>
          <div className="rev-meta">
            <span className={`sex-pip ${dog.sex === "m" ? "is-sire" : dog.sex === "f" ? "is-dam" : ""}`} style={{ width: 14, height: 14, fontSize: 8 }}>
              {dog.sex === "m" ? "♂" : dog.sex === "f" ? "♀" : "?"}
            </span>
            {dog.born && <span>{dog.born}</span>}
            {dog.deceased && <span className="rev-deceased">· avdød</span>}
          </div>

          {(isOpen || hasLow) && (
            <div className="rev-fields">
              {dog.fields.map((f, i) => (
                <div key={i} className={`rev-field conf-${f.conf}`}>
                  <span className="rev-field-k">{f.k}</span>
                  <span className="rev-field-v">
                    <ConfDot level={f.conf} />
                    <span>{f.v}</span>
                  </span>
                  {f.note && isOpen && <span className="rev-field-note">{f.note}</span>}
                </div>
              ))}
            </div>
          )}

          {dog.note && (isOpen || hasLow) && (
            <div className="rev-note">{dog.note}</div>
          )}

          {isPhotoMissing && !isStub && (
            <div className="rev-tip">Vi kunne ikke finne et bilde av denne hunden — legg gjerne til ett etter import.</div>
          )}

          {isOpen && dog.source && (
            <div className="rev-source">
              {I.link} <span>Hentet fra <code>{dog.source}</code></span>
            </div>
          )}
        </div>
      </button>

      <footer className="rev-actions">
        {status === "confirmed" ? (
          <button className="rev-action is-status is-confirmed" onClick={onReset}>
            {I.check} Bekreftet
          </button>
        ) : status === "rejected" ? (
          <button className="rev-action is-status is-rejected" onClick={onReset}>
            {I.close} Avvist
          </button>
        ) : (
          <>
            <button className="rev-action is-reject" onClick={onReject}>{I.close} Avvis</button>
            <button className="rev-action is-correct" onClick={onCorrect}>{I.pen} Rett</button>
            <button className="rev-action is-confirm" onClick={onConfirm}>{I.check} Bekreft</button>
          </>
        )}
      </footer>
    </article>
  );
}

// ── Edit modal ──────────────────────────────────────────────────────────────
function EditModal({ dog, onClose, onSave }) {
  return (
    <div className="modal-back-o" onClick={onClose}>
      <div className="modal-o" onClick={(e) => e.stopPropagation()}>
        <header className="modal-o-head">
          <div>
            <div className="modal-eyebrow">Rett opp</div>
            <h3>{dog.name}</h3>
          </div>
          <button className="modal-o-close" onClick={onClose}>{I.close}</button>
        </header>
        <div className="modal-o-body">
          <p className="modal-intro">Vi tror dette er riktig, men noen felter trenger et tryggere blikk.</p>
          {dog.fields.map((f, i) => (
            <div key={i} className="edit-field">
              <label className="edit-field-label">
                {f.k}
                <ConfDot level={f.conf} />
              </label>
              <input className="edit-field-input" defaultValue={f.v === "—" ? "" : f.v} placeholder={f.v === "—" ? "Skriv inn verdi" : ""} />
              {f.note && <span className="edit-field-note">{f.note}</span>}
            </div>
          ))}
          {dog.source && (
            <a className="modal-source-link" href="#" onClick={(e) => e.preventDefault()}>
              {I.link} Se kilden: <code>{dog.source}</code>
            </a>
          )}
        </div>
        <footer className="modal-o-foot">
          <button className="btn-o btn-o-secondary" onClick={onClose}>Avbryt</button>
          <button className="btn-o btn-o-primary" onClick={onSave}>Lagre og bekreft</button>
        </footer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 8 — TEMPLATE
// ─────────────────────────────────────────────────────────────────────────────
function TemplateScreen({ onNext, onBack }) {
  const [picked, setPicked] = useStateO("show");

  return (
    <div className="scr panel">
      <FormHeader onBack={onBack} eyebrow="Trinn 6 av 7" title="Velg en startmal for kennelnettsiden din" sub="Du kan alltid endre senere. Velg det som passer din kennel best i dag." />

      <div className="template-grid">
        {templates.map((t) => (
          <button
            key={t.id}
            className={`template-card ${picked === t.id ? "is-picked" : ""}`}
            onClick={() => setPicked(t.id)}
          >
            <TemplatePreview kind={t.id} />
            <div className="template-body">
              <div className="template-eyebrow">{picked === t.id && "✓ Valgt"}</div>
              <h3 className="template-title">{t.title}</h3>
              <p className="template-sub">{t.fits}</p>
              <div className="template-accents">
                {t.accents.map((a) => <span key={a} className="template-accent">{a}</span>)}
              </div>
            </div>
          </button>
        ))}
      </div>

      <a href="#" className="template-compare" onClick={(e) => e.preventDefault()}>Sammenlign malene i detalj →</a>

      <div className="form-actions">
        <button className="btn-o btn-o-primary btn-o-lg" onClick={onNext} disabled={!picked}>
          Fortsett
          {I.arrow}
        </button>
      </div>
    </div>
  );
}

// ── Template preview (SVG mock) ─────────────────────────────────────────────
function TemplatePreview({ kind }) {
  if (kind === "show") {
    return (
      <div className="tpl-preview">
        <div className="tpl-pv-hero"><div className="tpl-pv-hero-text"></div></div>
        <div className="tpl-pv-titles">
          <span className="tpl-pv-title-chip"></span>
          <span className="tpl-pv-title-chip"></span>
        </div>
        <div className="tpl-pv-grid">
          <div className="tpl-pv-card"></div>
          <div className="tpl-pv-card"></div>
          <div className="tpl-pv-card"></div>
        </div>
        <div className="tpl-pv-pedigree">
          <div className="tpl-pv-ped-line"></div>
          <div className="tpl-pv-ped-line short"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="tpl-preview tpl-preview-commercial">
      <div className="tpl-pv-hero tpl-pv-hero-pups">
        <div className="tpl-pv-puppy"></div>
        <div className="tpl-pv-puppy"></div>
        <div className="tpl-pv-puppy"></div>
      </div>
      <div className="tpl-pv-form">
        <div className="tpl-pv-form-row"></div>
        <div className="tpl-pv-form-row"></div>
        <div className="tpl-pv-form-cta"></div>
      </div>
      <div className="tpl-pv-grid tpl-pv-grid-tight">
        <div className="tpl-pv-card"></div>
        <div className="tpl-pv-card"></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 9 — DOMAIN
// ─────────────────────────────────────────────────────────────────────────────
function DomainScreen({ onNext, onBack }) {
  const [sub, setSub] = useStateO("granheim");
  const [choice, setChoice] = useStateO("dogworld");

  return (
    <div className="scr panel">
      <FormHeader onBack={onBack} eyebrow="Trinn 7 av 7" title="Hvor skal kennelen din leve?" sub="Velg en gratis adresse på dogworldtmp.no, eller koble til ditt eget domene senere." />

      <button
        className={`domain-card ${choice === "dogworld" ? "is-picked" : ""}`}
        onClick={() => setChoice("dogworld")}
      >
        <div className="domain-card-head">
          <div className="domain-radio"><span></span></div>
          <div className="domain-card-title">Gratis adresse på DogWorld</div>
          <span className="domain-tag">Anbefalt</span>
        </div>
        <div className="domain-url-preview">
          <span className="domain-url-protocol">https://</span>
          <input
            className="domain-url-input"
            value={sub}
            onChange={(e) => setSub(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          />
          <span className="domain-url-suffix">.dogworldtmp.no</span>
          <span className="domain-url-check">
            <ConfDot level="high" />
            tilgjengelig
          </span>
        </div>
      </button>

      <button
        className={`domain-card ${choice === "custom" ? "is-picked" : ""}`}
        onClick={() => setChoice("custom")}
      >
        <div className="domain-card-head">
          <div className="domain-radio"><span></span></div>
          <div className="domain-card-title">Bruk mitt eget domene</div>
          <span className="domain-tag-secondary">Senere</span>
        </div>
        <p className="domain-card-sub">Du kan koble til <code>kennel-granheim.no</code> når som helst i innstillingene.</p>
      </button>

      <div className="form-actions">
        <button className="btn-o btn-o-primary btn-o-lg" onClick={onNext}>
          Fortsett
          {I.arrow}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 10 — PUBLISHED (celebration)
// ─────────────────────────────────────────────────────────────────────────────
function PublishedScreen({ onDashboard, onBack }) {
  return (
    <div className="scr published">
      <ConfettiO />
      <div className="pub-content">
        <div className="pub-tick">{I.check}</div>
        <h1 className="pub-head">Kennelen din er live <span className="pub-emoji">🎉</span></h1>
        <p className="pub-sub">
          <strong>granheim.dogworldtmp.no</strong> er nå åpen for verden.
        </p>

        <div className="pub-preview">
          <div className="pub-preview-chrome">
            <span className="pub-dot r"></span>
            <span className="pub-dot y"></span>
            <span className="pub-dot g"></span>
            <span className="pub-url">granheim.dogworldtmp.no</span>
          </div>
          <div className="pub-preview-body">
            <div className="pub-hero">
              <div className="pub-hero-mark">G</div>
              <div className="pub-hero-text">
                <div className="pub-hero-title">Kennel Granheim</div>
                <div className="pub-hero-sub">Norsk Elghund · siden 2015 · Vossestrand</div>
              </div>
            </div>
            <div className="pub-stats">
              <div><strong>9</strong> hunder</div>
              <div><strong>3</strong> kull</div>
              <div><strong>2</strong> championat</div>
            </div>
            <div className="pub-cards">
              <div className="pub-card"></div>
              <div className="pub-card"></div>
              <div className="pub-card"></div>
            </div>
          </div>
        </div>

        <div className="pub-next">
          <div className="pub-next-head">Foreslåtte neste steg</div>
          <div className="pub-next-grid">
            <button className="pub-next-card">
              <span className="pub-next-icon">{I.globe}</span>
              <div>
                <div className="pub-next-title">Se hvordan kennelen din ser ut</div>
                <div className="pub-next-sub">Åpne den offentlige siden</div>
              </div>
              {I.chev}
            </button>
            <button className="pub-next-card">
              <span className="pub-next-icon">{I.mail}</span>
              <div>
                <div className="pub-next-title">Inviter medeier til kontoen</div>
                <div className="pub-next-sub">Eks. kjæreste eller co-breeder</div>
              </div>
              {I.chev}
            </button>
            <button className="pub-next-card">
              <span className="pub-next-icon">{I.photo}</span>
              <div>
                <div className="pub-next-title">Last opp ditt første kullbilde</div>
                <div className="pub-next-sub">Kull C — uke 4</div>
              </div>
              {I.chev}
            </button>
          </div>
        </div>

        <div className="pub-actions">
          <button className="btn-o btn-o-primary btn-o-lg" onClick={onDashboard}>
            Gå til dashbordet
            {I.arrow}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Confetti ────────────────────────────────────────────────────────────────
function ConfettiO() {
  const colors = ["#3F5A55", "#1C3245", "#c98a27", "#5a7a9a", "#c0789a", "#a8504a"];
  const N = 30;
  return (
    <div className="confetti-o" aria-hidden="true">
      {Array.from({ length: N }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 9 + 3) % 98}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i * 61) % 1200}ms`,
            animationDuration: `${1600 + (i * 137) % 800}ms`,
            transform: `rotate(${(i * 53) % 360}deg)`,
          }}
        ></span>
      ))}
    </div>
  );
}

// ── Form header helper ──────────────────────────────────────────────────────
function FormHeader({ onBack, eyebrow, title, sub }) {
  return (
    <header className="form-head">
      {onBack && (
        <button className="back-btn" onClick={onBack} aria-label="Tilbake">{I.back}</button>
      )}
      {eyebrow && <div className="form-eyebrow">{eyebrow}</div>}
      <h2 className="form-title">{title}</h2>
      {sub && <p className="form-sub">{sub}</p>}
    </header>
  );
}

// Expose
Object.assign(window, {
  I, ConfDot, PhotoO, FormHeader,
  WelcomeScreen, EmailScreen, BasicsScreen, WedgeScreen,
  UrlScreen, CrawlScreen, ReviewScreen, ReviewCard, EditModal,
  TemplateScreen, TemplatePreview, DomainScreen, PublishedScreen, ConfettiO,
});
