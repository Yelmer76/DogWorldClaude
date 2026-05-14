// ─────────────────────────────────────────────────────────────────────────────
// LITTER DETAIL — Views (5 total)
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateLV, useEffect: useEffectLV, useRef: useRefLV } = React;

// ═════════════════════════════════════════════════════════════════════════════
// VIEW 1 — LITTER DETAIL (breeder)
// ═════════════════════════════════════════════════════════════════════════════
function LitterDetailView({ pups, apps, litterState, onOpenApp, onOpenAllApps, onOpenPuppy, onToast }) {
  const [scrolled, setScrolled] = useStateLV(false);
  const handleScroll = (e) => setScrolled(e.target.scrollTop > 200);

  const isPlanned   = litterState === "planned";
  const isDelivered = litterState === "delivered";

  // Order apps: NY first, then I SAMTALE, then GODKJENT, etc.
  const order = ["ny", "samtale", "godkjent", "tilbudt", "avvist"];
  const sortedApps = [...apps].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

  return (
    <div className="l-shell">
      {/* Nav bar */}
      <header className="l-navbar">
        <button className="l-nav-icon">{Li.back}</button>
        <div className="l-nav-title">{litter.callName}</div>
        <div className="l-nav-right">
          <button className="l-nav-icon">{Li.share}</button>
          <button className="l-nav-icon">{Li.more}</button>
        </div>
      </header>

      <div className="l-scroll" onScroll={handleScroll}>
        {/* Litter header */}
        <section className="l-header">
          <div className="l-status-row">
            <span className={`l-litter-status l-st-${litterState}`}>
              <span className="l-status-dot"></span>
              {isPlanned ? "Planlagt" : isDelivered ? "Avsluttet — alle levert" : `Aktivt — uke ${litter.weekOfAge}`}
            </span>
          </div>
          <h1 className="l-litter-name">
            {litter.callName} <span className="l-litter-poetic">{litter.poetic}</span>
          </h1>
          <p className="l-litter-meta">
            {isPlanned ? "Planlagt levering juni 2026 · forventet 5 valper" : isDelivered ? `Født ${litter.whelping} · 5 valper · alle hjemme` : `Født ${litter.whelping} · ${litter.count.total} valper (${litter.count.males}♂ · ${litter.count.females}♀)`}
          </p>

          <div className="l-parents-row">
            <button className="l-parent-card is-sire">
              <Lp tone="sire" width={48} height={48} radius={6} label="ASTOR" />
              <div className="l-parent-meta">
                <div className="l-parent-role">Far · sire</div>
                <div className="l-parent-titles">{litter.sire.titles}</div>
                <div className="l-parent-name">{litter.sire.name}</div>
              </div>
            </button>
            <button className="l-parent-card is-dam">
              <Lp tone="dam" width={48} height={48} radius={6} label="SAGA" />
              <div className="l-parent-meta">
                <div className="l-parent-role">Mor · dam</div>
                <div className="l-parent-titles">{litter.dam.titles}</div>
                <div className="l-parent-name">{litter.dam.name}</div>
              </div>
            </button>
          </div>
        </section>

        {/* Timeline */}
        <TimelineStrip stages={litterStages} current={isPlanned ? "planned" : isDelivered ? "done" : "rearing"} sticky={scrolled} />

        {/* Puppies grid */}
        <section className="l-sec">
          <header className="l-sec-head">
            <h2>{isPlanned ? "Forventede valper" : "Valpene"}</h2>
            <span className="l-sec-count">{pups.length}</span>
          </header>

          {isPlanned ? (
            <div className="l-planned-grid">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="l-planned-card">
                  <div className="l-planned-photo">?</div>
                  <div className="l-planned-text">Valp #{i + 1}</div>
                  <div className="l-planned-sub">Forventet i april</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="l-puppies-grid">
              {pups.map((p) => (
                <PuppyCard key={p.id} pup={p} onTap={onOpenPuppy} kind="breeder" />
              ))}
            </div>
          )}
        </section>

        {/* Applications strip */}
        {!isPlanned && !isDelivered && (
          <section className="l-sec l-apps-sec">
            <header className="l-sec-head">
              <h2>Søknader <span className="l-sec-count">{apps.length}</span></h2>
              <button className="l-link-btn" onClick={onOpenAllApps}>Se alle {Li.arrow}</button>
            </header>
            <div className="l-apps-strip">
              {sortedApps.slice(0, 5).map((a) => (
                <AppCardCompact key={a.id} app={a} onTap={onOpenApp} />
              ))}
            </div>
          </section>
        )}

        {/* Daily log */}
        {!isPlanned && (
          <section className="l-sec">
            <header className="l-sec-head">
              <h2>Dagbok <span className="l-sec-count-sub">uke {litter.weekOfAge}</span></h2>
              <button className="l-link-btn" onClick={() => onToast("→ Full dagbok")}>Se hele dagboken {Li.arrow}</button>
            </header>
            <div className="l-log-list">
              {dailyLog.map((e, i) => (
                <article key={i} className="l-log-card">
                  <Lp tone="elkhound" width={56} height={56} radius={6} label={`D${e.day}`} />
                  <div className="l-log-body">
                    <div className="l-log-head">
                      <span className="l-log-date">{e.d}</span>
                      <span className="l-log-week">uke {e.week} · dag {e.day}</span>
                    </div>
                    <p className="l-log-text">{e.summary}</p>
                  </div>
                </article>
              ))}
            </div>
            <button className="l-btn l-btn-secondary l-btn-block" onClick={() => onToast("→ Logg dagen")}>
              {Li.plus} Logg dagen i dag
            </button>
          </section>
        )}

        {/* Delivered state: full timeline summary */}
        {isDelivered && (
          <section className="l-sec">
            <header className="l-sec-head"><h2>Tidslinje</h2></header>
            <div className="l-journey">
              <div className="l-journey-item is-done"><span className="l-journey-pip">14 feb</span><span>Paret</span></div>
              <div className="l-journey-item is-done"><span className="l-journey-pip">14 apr</span><span>Født — 5 valper</span></div>
              <div className="l-journey-item is-done"><span className="l-journey-pip">8 jun</span><span>Levering startet</span></div>
              <div className="l-journey-item is-done"><span className="l-journey-pip">12 jun</span><span>Siste valp hjemme</span></div>
              <div className="l-journey-item is-current"><span className="l-journey-pip">2026</span><span>Alumni — 5 hunder følges opp i 12 år</span></div>
            </div>
          </section>
        )}

        <div className="l-scroll-tail"></div>
      </div>

      {/* Quick actions */}
      {!isPlanned && !isDelivered && (
        <footer className="l-quick-bar">
          <button className="l-quick-btn" onClick={() => onToast("→ Logg vekt")}>{Li.scale} Logg vekt</button>
          <button className="l-quick-btn" onClick={() => onToast("→ Send oppdatering")}>{Li.msg} Send oppdatering</button>
          <button className="l-quick-btn" onClick={() => onToast("→ Ny manuell søknad")}>{Li.plus} Ny søknad</button>
        </footer>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// VIEW 2 — APPLICATIONS PIPELINE (list)
// ═════════════════════════════════════════════════════════════════════════════
function ApplicationsListView({ apps, onBack, onOpen, onReject }) {
  const [filter, setFilter] = useStateLV("all");
  const filters = [
    { id: "all",      label: "Alle",       n: apps.length },
    { id: "ny",       label: "Nye",        n: apps.filter(a => a.status === "ny").length },
    { id: "samtale",  label: "I samtale",  n: apps.filter(a => a.status === "samtale").length },
    { id: "godkjent", label: "Godkjente",  n: apps.filter(a => a.status === "godkjent").length + apps.filter(a => a.status === "tilbudt").length },
    { id: "avvist",   label: "Avviste",    n: apps.filter(a => a.status === "avvist").length },
  ];
  const filtered = apps.filter(a => filter === "all" ? true : filter === "godkjent" ? (a.status === "godkjent" || a.status === "tilbudt") : a.status === filter);

  return (
    <div className="l-shell">
      <header className="l-navbar">
        <button className="l-nav-icon" onClick={onBack}>{Li.back}</button>
        <div className="l-nav-title">Søknader · {litter.callName}</div>
        <button className="l-nav-icon">{Li.more}</button>
      </header>
      <div className="l-scroll">
        <div className="l-filter-row">
          {filters.map(f => (
            <button key={f.id} className={`l-filter-chip ${filter === f.id ? "is-active" : ""}`} onClick={() => setFilter(f.id)}>
              {f.label}
              <span className="l-filter-count">{f.n}</span>
            </button>
          ))}
        </div>
        <div className="l-apps-list">
          {filtered.map(a => (
            <AppCardFull key={a.id} app={a} onTap={onOpen} onReject={onReject} />
          ))}
          {filtered.length === 0 && (
            <div className="l-empty">Ingen søknader i dette filteret.</div>
          )}
        </div>
        <div className="l-scroll-tail"></div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// VIEW 3 — APPLICATION & CONVERSATION
// ═════════════════════════════════════════════════════════════════════════════
function ApplicationDetailView({ app, pups, onBack, onOfferPuppy, onToast }) {
  const [draft, setDraft] = useStateLV("");
  const [showTemplates, setShowTemplates] = useStateLV(false);
  const [thread, setThread] = useStateLV(app.messages || []);

  useEffectLV(() => { setThread(app.messages || []); }, [app.id]);

  const send = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const at = `${now.getDate()}. ${["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des"][now.getMonth()]} · ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
    setThread([...thread, { from: "breeder", t: draft, at }]);
    setDraft("");
    onToast("Sendt");
  };

  const insertTemplate = (q) => {
    setDraft(q);
    setShowTemplates(false);
  };

  return (
    <div className="l-shell">
      <header className="l-navbar">
        <button className="l-nav-icon" onClick={onBack}>{Li.back}</button>
        <div className="l-nav-title-stack">
          <div className="l-nav-title">{app.who}</div>
          <AppStatusPill status={app.status} label={app.statusLabel} />
        </div>
        <button className="l-nav-icon">{Li.more}</button>
      </header>

      <div className="l-scroll l-conv-scroll">
        {/* Applicant profile */}
        <section className="l-app-profile">
          <header className="l-app-profile-head">
            <Avatar tone={app.avatarTone} initials={app.who.split(/\s+/).slice(-1)[0].slice(0, 2)} size={48} />
            <div>
              <div className="l-app-profile-who">{app.who}</div>
              <div className="l-app-profile-city">{app.city} · søkte {app.received}</div>
            </div>
          </header>

          <dl className="l-app-profile-kv">
            <dt>Husholdning</dt><dd>{app.household}</dd>
            <dt>Bolig</dt><dd>{app.housing}</dd>
            <dt>Erfaring</dt><dd>{app.experience}</dd>
            <dt>Intent</dt><dd>{app.intent}</dd>
            <dt>Aktivitet</dt><dd>{app.activity}</dd>
            <dt>Referanser</dt><dd>{app.references}</dd>
          </dl>

          <div className="l-app-profile-why">
            <div className="l-app-why-head">Hvorfor en valp herfra</div>
            <p>"{app.why}"</p>
          </div>

          <div className="l-app-match">
            {app.match.map((m, i) => (
              <span key={i} className={`appf-match-row s-${m.state}`}>
                <span className={`appf-match-dot s-${m.state}`}></span>
                {m.k}
              </span>
            ))}
          </div>

          {app.offered && (
            <div className={`l-offer-banner ${app.offered.accepted ? "is-accepted" : ""}`}>
              {app.offered.accepted ? (
                <>{Li.check} <span><strong>{pups.find(p => p.id === app.offered.puppyId)?.name}</strong> tilbudt og akseptert · depositum mottatt {app.offered.whenOffered}</span></>
              ) : (
                <>{Li.paw} <span><strong>{pups.find(p => p.id === app.offered.puppyId)?.name}</strong> tilbudt {app.offered.whenOffered} · venter på svar (utløper {app.offered.expires})</span></>
              )}
            </div>
          )}
        </section>

        {/* Conversation thread */}
        <section className="l-thread">
          <div className="l-thread-divider">Samtale</div>
          {thread.length === 0 ? (
            <div className="l-thread-empty">Ingen meldinger ennå. Send en åpning til {app.who}.</div>
          ) : (
            thread.map((m, i) => <ChatBubble key={i} msg={m} applicantName={app.who} />)
          )}
        </section>

        <div className="l-scroll-tail"></div>
      </div>

      {/* Compose */}
      <footer className="l-compose">
        {showTemplates && (
          <div className="l-templates">
            <div className="l-templates-head">Forhåndsgodkjente spørsmål</div>
            {breederTemplates.map((q, i) => (
              <button key={i} className="l-template-item" onClick={() => insertTemplate(q)}>{q}</button>
            ))}
          </div>
        )}
        <div className="l-compose-shortcuts">
          <button className="l-shortcut-chip" onClick={() => setShowTemplates(!showTemplates)}>
            {Li.doc} Spørsmål
          </button>
          <button className="l-shortcut-chip is-warm" onClick={() => onOfferPuppy(app)} disabled={app.status === "godkjent" || app.status === "avvist"}>
            {Li.paw} Tilby valp
          </button>
          <button className="l-shortcut-chip" onClick={() => onToast("→ Avtal hjemmebesøk")}>
            {Li.cal} Hjemmebesøk
          </button>
        </div>
        <div className="l-compose-row">
          <textarea
            className="l-compose-input"
            placeholder="Skriv en melding…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
          />
          <button className="l-compose-send" onClick={send} disabled={!draft.trim()}>{Li.send}</button>
        </div>
      </footer>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// VIEW 4 — PUBLIC LITTER VIEW
// ═════════════════════════════════════════════════════════════════════════════
function PublicLitterView({ pups, onApply, onBackToTemplate, onToast }) {
  const available = pups.filter(p => p.status === "tilgjengelig");
  const reserved  = pups.filter(p => p.status === "reservert" || p.status === "tilbudt" || p.status === "beholdt");

  return (
    <div className="l-shell l-public">
      <header className="l-pub-nav">
        <button className="l-pub-brand" onClick={onBackToTemplate}>
          <div className="l-pub-mark">G</div>
          <div>
            <div className="l-pub-brand-name">Kennel Granheim</div>
            <div className="l-pub-brand-sub">Norsk Elghund · Lillehammer</div>
          </div>
        </button>
      </header>

      <div className="l-scroll">
        {/* Hero */}
        <section className="l-pub-hero">
          <Lp tone="elkhound" height={240} radius={0} label="KULL C · UKE 4" />
          <div className="l-pub-hero-overlay">
            <div className="l-pub-hero-eyebrow">Aktivt kull</div>
            <h1 className="l-pub-hero-name">{litter.callName}</h1>
            <p className="l-pub-hero-tag">Født {litter.whelping} · 5 valper</p>
          </div>
        </section>

        {/* Parents */}
        <section className="l-pub-sec">
          <h2 className="l-pub-h">Foreldrene</h2>
          <div className="l-pub-parents">
            <div className="l-pub-parent">
              <Lp tone="sire" height={140} radius={8} label="ASTOR" />
              <div className="l-pub-parent-meta">
                <div className="l-pub-parent-titles">{litter.sire.titles}</div>
                <div className="l-pub-parent-name">{litter.sire.name}</div>
                <div className="l-pub-parent-role">Far · sire</div>
                <div className="l-pub-parent-health">{litter.sire.health}</div>
              </div>
            </div>
            <div className="l-pub-parent">
              <Lp tone="dam" height={140} radius={8} label="SAGA" />
              <div className="l-pub-parent-meta">
                <div className="l-pub-parent-titles">{litter.dam.titles}</div>
                <div className="l-pub-parent-name">{litter.dam.name}</div>
                <div className="l-pub-parent-role">Mor · dam</div>
                <div className="l-pub-parent-health">{litter.dam.health}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Slik fungerer det */}
        <section className="l-pub-sec l-pub-process">
          <h2 className="l-pub-h">Slik fungerer det hos oss</h2>
          <p className="l-pub-process-intro">
            Vi velger hvem som får hvilken valp. Du «kjøper» ikke en valp som et produkt — vi matcher dere med riktig hund etter en samtale.
          </p>
          <ol className="l-pub-steps">
            <li>
              <span className="l-pub-step-n">1</span>
              <div>
                <h4>Du sender en søknad</h4>
                <p>Fortell om dere — bolig, hverdag, erfaring, hva dere ser for dere med hunden.</p>
              </div>
            </li>
            <li>
              <span className="l-pub-step-n">2</span>
              <div>
                <h4>Vi inviterer til en samtale eller hjemmebesøk</h4>
                <p>Vi blir kjent. Det er ingen forpliktelse i denne fasen.</p>
              </div>
            </li>
            <li>
              <span className="l-pub-step-n">3</span>
              <div>
                <h4>Hvis vi finner en god match, tilbyr vi en spesifikk valp</h4>
                <p>Vi velger hvilken valp som passer dere. Dere får 7 dager til å bestemme.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* Available puppies */}
        <section className="l-pub-sec">
          <h2 className="l-pub-h">Tilgjengelige valper</h2>
          <p className="l-pub-sub">{available.length} av {pups.length} valper er tilgjengelige. Vi har valgt å holde {pups.filter(p => p.status === "beholdt").length} tilbake til avl.</p>

          <div className="l-pub-pups">
            {available.map(p => (
              <PuppyCard key={p.id} pup={p} kind="public" onTap={() => onToast(`→ Mer om ${p.name}`)} />
            ))}
          </div>

          {reserved.length > 0 && (
            <>
              <div className="l-pub-reserved-head">Ikke tilgjengelig</div>
              <div className="l-pub-reserved">
                {reserved.map(p => (
                  <div key={p.id} className="l-pub-reserved-card">
                    <span className="l-pub-reserved-dot" style={{ background: PUPPY_COLORS[p.color] }}></span>
                    <span className="l-pub-reserved-name">«{p.name}»</span>
                    <span className="l-pub-reserved-status">{p.statusLabel}</span>
                  </div>
                ))}
              </div>
              <p className="l-pub-trust">Vi viser alltid hele kullet — også de som er reservert eller beholdt. Åpenhet er en del av tilliten.</p>
            </>
          )}
        </section>

        {/* CTA */}
        <section className="l-pub-sec l-pub-cta">
          <button className="l-btn l-btn-warm l-btn-lg l-btn-block" onClick={onApply}>
            Send en søknad {Li.arrow}
          </button>
          <div className="l-pub-trust-row">
            <span className="l-pub-trust-pill">{Li.check} DogWorld<sup>(tmp)</sup> Verifisert</span>
            <span className="l-pub-trust-pill">NKK-medlem</span>
            <span className="l-pub-trust-pill">Sølv-tier</span>
          </div>
        </section>

        {/* Health tests */}
        <section className="l-pub-sec">
          <h2 className="l-pub-h">Foreldrene har bestått disse helsetestene</h2>
          <div className="l-pub-health">
            {["HD","ED","Øyne","DM","prcd-PRA"].map((k) => (
              <div key={k} className="l-pub-health-row">
                <span className="l-pub-health-k">{k}</span>
                <span className="l-pub-health-v">
                  <span className="l-pub-health-sire">Astor · A</span>
                  <span className="l-pub-health-dam">Saga · A</span>
                </span>
                <span className="l-pub-health-tick">{Li.check}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="l-scroll-tail"></div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// VIEW 5 — APPLICATION FORM MODAL (multi-step)
// ═════════════════════════════════════════════════════════════════════════════
function ApplicationFormView({ onClose, onSubmit }) {
  const [step, setStep] = useStateLV(0);
  const [form, setForm] = useStateLV({
    name: "Familien Sørby", email: "", phone: "", city: "Bodø",
    housing: "Hus", outdoor: "Hage", household: "",
    activity: "Aktive", experience: "had-breed",
    why: "", intent: ["Familie","Tur-kamerat"], alone: "0-3 timer",
    vet: "", priorBreeder: "",
    readGuide: false, understandSelection: false,
  });
  const [submitted, setSubmitted] = useStateLV(false);

  if (submitted) {
    return (
      <div className="l-shell">
        <header className="l-navbar">
          <div></div>
          <div className="l-nav-title">Søknad sendt</div>
          <button className="l-nav-icon" onClick={onClose}>{Li.close}</button>
        </header>
        <div className="l-scroll">
          <div className="l-sent-state">
            <div className="l-sent-art">{Li.check}</div>
            <h2>Takk!</h2>
            <p>Søknaden er sendt til <strong>{litterKennel.name}</strong>. De pleier å svare innen 3 dager. Vi sender deg en e-post når de har lest den.</p>
            <button className="l-btn l-btn-primary l-btn-block" onClick={onClose}>
              Ferdig {Li.arrow}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const next = () => step < applicationSteps.length - 1 ? setStep(step + 1) : setSubmitted(true);
  const prev = () => step > 0 ? setStep(step - 1) : onClose();

  return (
    <div className="l-shell">
      <header className="l-navbar">
        <button className="l-nav-icon" onClick={prev}>{Li.back}</button>
        <div className="l-nav-title">Søknad · {litter.callName}</div>
        <button className="l-nav-icon" onClick={onClose}>{Li.close}</button>
      </header>

      <div className="l-form-progress">
        {applicationSteps.map((s, i) => (
          <span key={s.id} className={`l-form-dot ${i <= step ? "is-on" : ""}`}></span>
        ))}
      </div>

      <div className="l-scroll">
        <div className="l-form-pane" key={step}>
          <div className="l-form-eyebrow">Steg {step + 1} av {applicationSteps.length}</div>
          <h2 className="l-form-title">{applicationSteps[step].label}</h2>

          {step === 0 && (
            <>
              <FormField label="Navn"><input className="l-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></FormField>
              <FormField label="E-post"><input className="l-input" placeholder="dere@eksempel.no" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></FormField>
              <FormField label="Telefon"><input className="l-input" placeholder="+47" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></FormField>
              <FormField label="By"><input className="l-input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></FormField>
            </>
          )}

          {step === 1 && (
            <>
              <FormField label="Bolig">
                <ChipGroup options={["Hus","Leilighet","Hytte","Annet"]} value={form.housing} onChange={v => setForm({ ...form, housing: v })} />
              </FormField>
              <FormField label="Plass utendørs">
                <ChipGroup options={["Hage","Innhegnet uteareal","Ingen","Annet"]} value={form.outdoor} onChange={v => setForm({ ...form, outdoor: v })} />
              </FormField>
              <FormField label="Hvem bor i husholdet?">
                <textarea className="l-input l-textarea" rows={3} placeholder="Voksne, barn (alder), andre dyr…" value={form.household} onChange={e => setForm({ ...form, household: e.target.value })} />
              </FormField>
              <FormField label="Aktivitetsnivå">
                <ChipGroup options={["Veldig aktive","Aktive","Stillesittende"]} value={form.activity} onChange={v => setForm({ ...form, activity: v })} />
              </FormField>
            </>
          )}

          {step === 2 && (
            <>
              <FormField label="Tidligere hund-erfaring">
                <RadioList options={[
                  { v: "first", l: "Førstegangs" },
                  { v: "had-dog", l: "Hatt hund før" },
                  { v: "had-breed", l: "Hatt rasen før" },
                ]} value={form.experience} onChange={v => setForm({ ...form, experience: v })} />
              </FormField>
              <FormField label="Hvorfor denne rasen?">
                <textarea className="l-input l-textarea" rows={3} placeholder="Fortell oss hva dere har lest, hørt, eller opplevd…" value={form.why} onChange={e => setForm({ ...form, why: e.target.value })} />
              </FormField>
              <FormField label="Hva ser dere for dere?">
                <ChipGroupMulti options={["Familie","Jaktkamerat","Tur-kamerat","Utstilling","Sport","Avl"]} value={form.intent} onChange={v => setForm({ ...form, intent: v })} />
              </FormField>
              <FormField label="Hvor mye tid kan hunden være alene?">
                <ChipGroup options={["0-3 timer","3-5 timer","5-8 timer","Aldri"]} value={form.alone} onChange={v => setForm({ ...form, alone: v })} />
              </FormField>
            </>
          )}

          {step === 3 && (
            <>
              <FormField label="Veterinær (valgfritt)"><input className="l-input" value={form.vet} onChange={e => setForm({ ...form, vet: e.target.value })} placeholder="Navn og by" /></FormField>
              <FormField label="Tidligere oppdretter (valgfritt)"><input className="l-input" value={form.priorBreeder} onChange={e => setForm({ ...form, priorBreeder: e.target.value })} placeholder="Navn på kennel" /></FormField>
              <label className="l-check">
                <input type="checkbox" checked={form.readGuide} onChange={e => setForm({ ...form, readGuide: e.target.checked })} />
                <span>Jeg har lest <a href="#" onClick={(e) => e.preventDefault()}>kennelens kjøpsguide</a></span>
              </label>
              <label className="l-check">
                <input type="checkbox" checked={form.understandSelection} onChange={e => setForm({ ...form, understandSelection: e.target.checked })} />
                <span>Jeg forstår at oppdretteren velger hvilken valp jeg får tilbudt</span>
              </label>
              <p className="l-form-fineprint">Vi behandler søknaden innen 3 dager. Du forplikter deg ikke til noe ved å sende.</p>
            </>
          )}
        </div>
        <div className="l-scroll-tail"></div>
      </div>

      <footer className="l-form-foot">
        {step > 0 && <button className="l-btn l-btn-secondary" onClick={prev}>Tilbake</button>}
        <button
          className="l-btn l-btn-primary"
          style={{ marginLeft: "auto" }}
          onClick={next}
          disabled={step === 3 && (!form.readGuide || !form.understandSelection)}
        >
          {step === applicationSteps.length - 1 ? "Send søknad" : "Neste"} {Li.arrow}
        </button>
      </footer>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div className="l-form-field">
      <label className="l-form-label">{label}</label>
      {children}
    </div>
  );
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="l-chip-group">
      {options.map(o => (
        <button key={o} className={`l-chip ${value === o ? "is-picked" : ""}`} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}
function ChipGroupMulti({ options, value, onChange }) {
  const toggle = (o) => onChange(value.includes(o) ? value.filter(x => x !== o) : [...value, o]);
  return (
    <div className="l-chip-group">
      {options.map(o => (
        <button key={o} className={`l-chip ${value.includes(o) ? "is-picked" : ""}`} onClick={() => toggle(o)}>{o}</button>
      ))}
    </div>
  );
}
function RadioList({ options, value, onChange }) {
  return (
    <div className="l-radio-list">
      {options.map(o => (
        <label key={o.v} className={`l-radio ${value === o.v ? "is-picked" : ""}`}>
          <input type="radio" checked={value === o.v} onChange={() => onChange(o.v)} />
          <span>{o.l}</span>
        </label>
      ))}
    </div>
  );
}

Object.assign(window, {
  LitterDetailView, ApplicationsListView, ApplicationDetailView,
  PublicLitterView, ApplicationFormView,
  FormField, ChipGroup, ChipGroupMulti, RadioList,
});
