// ─────────────────────────────────────────────────────────────────────────────
// LITTER DETAIL — App shell: view router, state, mobile + desktop
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateLA, useEffect: useEffectLA, useCallback: useCallbackLA } = React;

const ALL_VIEWS = [
  { id: "detail",     label: "1 · Litter detail (breeder)" },
  { id: "list",       label: "2 · Applications list" },
  { id: "convo",      label: "3 · Conversation" },
  { id: "public",     label: "4 · Public litter view" },
  { id: "form",       label: "5 · Application form" },
];

const STATE_OPTIONS = [
  { id: "active",    label: "A · Active uke 4 (default)" },
  { id: "convo-berg", label: "B · Conversation w/ Berg (full thread)" },
  { id: "assign",    label: "C · Puppy assignment modal" },
  { id: "planned",   label: "F · Planned (no puppies yet)" },
  { id: "delivered", label: "G · Delivered (all sold)" },
];

function App() {
  // Demo state
  const [stateVar, setStateVar] = useStateLA("active");
  const [view, setView] = useStateLA("detail");

  // Working data — mutable copies
  const [pups, setPups] = useStateLA(puppies);
  const [apps, setApps] = useStateLA(applications);
  const [selectedAppId, setSelectedAppId] = useStateLA("pettersen");
  const [assignOpen, setAssignOpen] = useStateLA(false);
  const [pulse, setPulse] = useStateLA(null);
  const [toast, setToast] = useStateLA(null);

  // Apply state preset
  useEffectLA(() => {
    setPups(puppies);
    setApps(applications);
    setAssignOpen(false);

    if (stateVar === "convo-berg") {
      setView("convo");
      setSelectedAppId("berg");
    } else if (stateVar === "assign") {
      setView("convo");
      setSelectedAppId("pettersen");
      setAssignOpen(true);
    } else if (stateVar === "planned") {
      setView("detail");
    } else if (stateVar === "delivered") {
      setView("detail");
      // Mark all puppies sold
      setPups(puppies.map(p => ({ ...p, status: "solgt", statusLabel: "SOLGT" })));
    } else {
      setView("detail");
      setSelectedAppId("pettersen");
    }
  }, [stateVar]);

  const showToast = (m) => setToast(m);

  const selectedApp = apps.find(a => a.id === selectedAppId);
  const availablePups = pups.filter(p => p.status === "tilgjengelig");

  const openApp = (app) => {
    setSelectedAppId(app.id);
    setView("convo");
  };

  const openAllApps = () => setView("list");

  const offerPuppy = (app) => {
    setAssignOpen(true);
  };

  const confirmAssign = (pup) => {
    // Update puppy status
    setPups(pups.map(p => p.id === pup.id ? { ...p, status: "tilbudt", statusLabel: "TILBUDT", assignedTo: `${selectedApp.who}, ${selectedApp.city} (venter)` } : p));
    // Update app status
    setApps(apps.map(a => a.id === selectedAppId ? { ...a, status: "tilbudt", statusLabel: "TILBUDT VALP", offered: { puppyId: pup.id, whenOffered: "i dag", expires: "om 7 dager" } } : a));
    setAssignOpen(false);
    setPulse(`«${pup.name}» tilbudt ${selectedApp.who}`);
  };

  const renderView = (deviceWide = false) => {
    const litterState = stateVar === "planned" ? "planned" : stateVar === "delivered" ? "delivered" : "active";

    switch (view) {
      case "detail":
        return (
          <LitterDetailView
            pups={pups}
            apps={apps}
            litterState={litterState}
            onOpenApp={openApp}
            onOpenAllApps={openAllApps}
            onOpenPuppy={(p) => showToast(`→ Valpdetalj: ${p.name}`)}
            onToast={showToast}
          />
        );
      case "list":
        return (
          <ApplicationsListView
            apps={apps}
            onBack={() => setView("detail")}
            onOpen={openApp}
            onReject={(a) => {
              setApps(apps.map(x => x.id === a.id ? { ...x, status: "avvist", statusLabel: "AVVIST" } : x));
              showToast(`${a.who} avvist`);
            }}
          />
        );
      case "convo":
        if (!selectedApp) return null;
        return (
          <ApplicationDetailView
            app={selectedApp}
            pups={pups}
            onBack={() => setView("list")}
            onOfferPuppy={offerPuppy}
            onToast={showToast}
          />
        );
      case "public":
        return (
          <PublicLitterView
            pups={pups}
            onApply={() => setView("form")}
            onBackToTemplate={() => showToast("→ Granheim hjemmeside")}
            onToast={showToast}
          />
        );
      case "form":
        return (
          <ApplicationFormView
            onClose={() => setView("public")}
            onSubmit={() => showToast("Søknad sendt")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-root-l">
      <header className="page-head-l">
        <div className="page-eyebrow">DogWorld · Prototype</div>
        <h1>Kull (Litter) Detail</h1>
        <p className="page-sub">
          Where dogs become matches. Breeders manage active litters AND buyers connect to specific puppies on the same data.
          Five connected views — and the asymmetric model: breeders <em>offer</em> a puppy to an approved applicant, not the other way around.
        </p>

        <div className="ob-controls-l">
          <ViewToggle
            label="Demo state:"
            options={STATE_OPTIONS}
            value={stateVar}
            onChange={setStateVar}
          />
          <ViewToggle
            label="View:"
            options={ALL_VIEWS}
            value={view}
            onChange={setView}
          />
        </div>
      </header>

      <div className="frames-l">
        <div className="frame-col-l">
          <div className="frame-meta-l">
            <span className="frame-label-l">Mobile · 375 × 812</span>
            <span className="frame-hint-l">{ALL_VIEWS.find(v => v.id === view)?.label}</span>
          </div>
          <div className="device-mobile-l">
            <div className="device-mobile-screen-l">
              {renderView(false)}
              <PuppyAssignModal
                open={assignOpen}
                app={selectedApp}
                availablePuppies={availablePups}
                onClose={() => setAssignOpen(false)}
                onConfirm={confirmAssign}
              />
              <ActionPulse message={pulse} onDone={() => setPulse(null)} />
              {toast && (
                <div className="l-toast"><span className="l-toast-dot"></span>{toast}</div>
              )}
            </div>
          </div>
        </div>

        <div className="frame-col-l">
          <div className="frame-meta-l">
            <span className="frame-label-l">Desktop · 1280 × 800</span>
            <span className="frame-hint-l">3-col layout · drag-drop puppy assignment</span>
          </div>
          <div className="device-desktop-l">
            <div className="device-desktop-chrome-l">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="device-url">
                {view === "public" || view === "form" ? "granheim.dogworldtmp.no / kull-c" : "dogworld.app / kull-c"}
              </span>
            </div>
            <div className="device-desktop-screen-l">
              <DesktopLitterShell
                view={view}
                stateVar={stateVar}
                pups={pups}
                apps={apps}
                selectedAppId={selectedAppId}
                onSelectApp={setSelectedAppId}
                onOpenAllApps={openAllApps}
                onOpenDetail={() => setView("detail")}
                onOfferPuppy={offerPuppy}
                onToast={showToast}
                renderView={renderView}
              />
              <PuppyAssignModal
                open={assignOpen}
                app={selectedApp}
                availablePuppies={availablePups}
                onClose={() => setAssignOpen(false)}
                onConfirm={confirmAssign}
              />
            </div>
          </div>
        </div>
      </div>

      <ActionPulse message={pulse} onDone={() => setPulse(null)} />

      <footer className="page-foot-l">
        <div>DogWorld · Litter Detail · built on Design System v0.1</div>
        <div>Demo: View 1 → tap NY app card → conversation → "Tilby valp" → assignment modal → see puppy turn TILBUDT → toggle to Public View → "Send en søknad" → 4-step form</div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — 3-column layout for breeder view
// ─────────────────────────────────────────────────────────────────────────────
function DesktopLitterShell({ view, stateVar, pups, apps, selectedAppId, onSelectApp, onOpenAllApps, onOpenDetail, onOfferPuppy, onToast, renderView }) {
  // For public, form, list views, just render the mobile-style content centered
  if (view === "public" || view === "form" || view === "list") {
    return (
      <div className="d-litter-host">
        <div className="d-litter-center">
          {renderView(true)}
        </div>
      </div>
    );
  }

  // For detail and convo, render the 3-column breeder workspace
  const selectedApp = apps.find(a => a.id === selectedAppId);
  const litterState = stateVar === "planned" ? "planned" : stateVar === "delivered" ? "delivered" : "active";
  const order = ["ny", "samtale", "godkjent", "tilbudt", "avvist"];
  const sortedApps = [...apps].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

  return (
    <div className="d-litter">
      {/* Top bar */}
      <header className="d-litter-top">
        <div className="d-litter-brand">
          <div className="d-litter-mark">G</div>
          <div>
            <div className="d-litter-name">{litter.callName} <span className="d-litter-poetic">{litter.poetic}</span></div>
            <div className="d-litter-sub">
              <span className={`l-litter-status l-st-${litterState} is-sm`}>
                <span className="l-status-dot"></span>
                Uke {litter.weekOfAge}
              </span>
              · Født {litter.whelping} · {pups.length} valper · {apps.length} søknader
            </div>
          </div>
        </div>
        <div className="d-litter-actions">
          <button className="l-btn l-btn-secondary l-btn-sm" onClick={() => onToast("→ Logg vekt")}>{Li.scale} Logg vekt</button>
          <button className="l-btn l-btn-secondary l-btn-sm" onClick={() => onToast("→ Send oppdatering")}>{Li.msg} Oppdatering</button>
          <button className="l-btn l-btn-primary l-btn-sm" onClick={() => onToast("→ Ny manuell søknad")}>{Li.plus} Ny søknad</button>
        </div>
      </header>

      <div className="d-litter-body">
        {/* LEFT — puppies */}
        <aside className="d-litter-left">
          <div className="d-litter-section-head">
            <h3>Valper</h3>
            <span className="d-litter-section-count">{pups.length}</span>
          </div>
          <div className="d-puppies-list">
            {pups.map(p => (
              <PuppyCard
                key={p.id}
                pup={p}
                onTap={() => onToast(`→ Valpdetalj: ${p.name}`)}
                draggable={p.status === "tilgjengelig"}
                onDragStart={() => onToast(`Drag «${p.name}» til en søker for å tilby`)}
              />
            ))}
          </div>
          <div className="d-litter-section-head" style={{ marginTop: 16 }}>
            <h3>Dagbok</h3>
            <span className="d-litter-section-count">uke {litter.weekOfAge}</span>
          </div>
          <div className="d-log-list">
            {dailyLog.slice(0, 2).map((e, i) => (
              <article key={i} className="d-log-card">
                <div className="d-log-date">{e.d}</div>
                <p className="d-log-text">{e.summary}</p>
              </article>
            ))}
            <button className="l-btn l-btn-secondary l-btn-sm l-btn-block">{Li.plus} Logg i dag</button>
          </div>
        </aside>

        {/* CENTER — conversation / detail */}
        <main className="d-litter-center-pane">
          {view === "convo" && selectedApp ? (
            <ConversationPane app={selectedApp} pups={pups} onOfferPuppy={onOfferPuppy} onToast={onToast} />
          ) : (
            <div className="d-detail-placeholder">
              <h3>Velg en søker fra høyre kolonne</h3>
              <p>Klikk en søknad for å åpne samtale, profil og handlinger.</p>
            </div>
          )}
        </main>

        {/* RIGHT — applications */}
        <aside className="d-litter-right">
          <div className="d-litter-section-head">
            <h3>Søknader</h3>
            <span className="d-litter-section-count">{apps.length}</span>
          </div>
          <div className="d-apps-list">
            {sortedApps.map(a => (
              <button
                key={a.id}
                className={`d-app-row app-st-${a.status} ${a.id === selectedAppId && view === "convo" ? "is-active" : ""}`}
                onClick={() => onSelectApp(a.id)}
              >
                <Avatar tone={a.avatarTone} initials={a.who.split(/\s+/).slice(-1)[0].slice(0, 2)} size={32} />
                <div className="d-app-row-body">
                  <div className="d-app-row-head">
                    <span className="d-app-row-who">{a.who}</span>
                    <AppStatusPill status={a.status} label={a.statusLabel} />
                  </div>
                  <div className="d-app-row-city">{a.city} · {a.received}</div>
                  <div className="d-app-row-summary">{a.summary}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

// Conversation pane for desktop center
function ConversationPane({ app, pups, onOfferPuppy, onToast }) {
  const [draft, setDraft] = useStateLA("");
  const [thread, setThread] = useStateLA(app.messages || []);

  useEffectLA(() => { setThread(app.messages || []); }, [app.id]);

  const send = () => {
    if (!draft.trim()) return;
    setThread([...thread, { from: "breeder", t: draft, at: "nå" }]);
    setDraft("");
    onToast("Sendt");
  };

  return (
    <div className="d-conv">
      <header className="d-conv-head">
        <div className="d-conv-applicant">
          <Avatar tone={app.avatarTone} initials={app.who.split(/\s+/).slice(-1)[0].slice(0, 2)} size={36} />
          <div>
            <div className="d-conv-who">{app.who}</div>
            <div className="d-conv-sub">{app.city} · {app.received}</div>
          </div>
        </div>
        <AppStatusPill status={app.status} label={app.statusLabel} />
      </header>

      <div className="d-conv-profile">
        <dl className="l-app-profile-kv">
          <dt>Husholdning</dt><dd>{app.household}</dd>
          <dt>Bolig</dt><dd>{app.housing}</dd>
          <dt>Erfaring</dt><dd>{app.experience}</dd>
          <dt>Intent</dt><dd>{app.intent}</dd>
        </dl>
        <div className="l-app-profile-why" style={{ flex: 1, minWidth: 0 }}>
          <div className="l-app-why-head">Hvorfor</div>
          <p>"{app.why}"</p>
        </div>
      </div>

      {app.offered && (
        <div className={`l-offer-banner ${app.offered.accepted ? "is-accepted" : ""}`} style={{ margin: "0 16px" }}>
          {app.offered.accepted ? (
            <>{Li.check} <span><strong>{pups.find(p => p.id === app.offered.puppyId)?.name}</strong> akseptert · depositum mottatt</span></>
          ) : (
            <>{Li.paw} <span><strong>{pups.find(p => p.id === app.offered.puppyId)?.name}</strong> tilbudt {app.offered.whenOffered} · venter på svar</span></>
          )}
        </div>
      )}

      <div className="d-conv-thread">
        {thread.length === 0 ? (
          <div className="l-thread-empty">Ingen meldinger ennå. Send en åpning til {app.who}.</div>
        ) : (
          thread.map((m, i) => <ChatBubble key={i} msg={m} applicantName={app.who} />)
        )}
      </div>

      <footer className="d-conv-foot">
        <div className="l-compose-shortcuts">
          <button className="l-shortcut-chip" onClick={() => onToast("Maler")}>{Li.doc} Spørsmål</button>
          <button className="l-shortcut-chip is-warm" onClick={() => onOfferPuppy(app)} disabled={app.status === "godkjent" || app.status === "avvist"}>
            {Li.paw} Tilby valp
          </button>
          <button className="l-shortcut-chip" onClick={() => onToast("Hjemmebesøk")}>{Li.cal} Hjemmebesøk</button>
        </div>
        <div className="l-compose-row">
          <textarea className="l-compose-input" placeholder="Skriv en melding…" value={draft} onChange={e => setDraft(e.target.value)} rows={2} />
          <button className="l-compose-send" onClick={send} disabled={!draft.trim()}>{Li.send}</button>
        </div>
      </footer>
    </div>
  );
}

const rootL = ReactDOM.createRoot(document.getElementById("root"));
rootL.render(<App />);
