// ─────────────────────────────────────────────────────────────────────────────
// TODAY DASHBOARD — App: mobile + desktop layouts, state switcher
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateApp2, useEffect: useEffectApp2, useCallback: useCallbackApp2 } = React;

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
function MobileToday({ mode, onToast }) {
  const [expanded, setExpanded] = useStateApp2(null);
  const [sheetOpen, setSheetOpen] = useStateApp2(false);
  const [notifOpen, setNotifOpen] = useStateApp2(false);
  const [feed, setFeed] = useStateApp2(todayFeed);
  const [activeTab, setActiveTab] = useStateApp2("hjem");

  // Reset on mode change
  useEffectApp2(() => {
    setFeed(todayFeed);
    setExpanded(null);
    setSheetOpen(false);
    setNotifOpen(false);
  }, [mode]);

  const handleSnooze = (id) => {
    setFeed((f) => f.filter((c) => c.id !== id));
    onToast(`Slumret · vi minner deg på det i morgen`);
  };
  const handleDone = (id) => {
    setFeed((f) => f.filter((c) => c.id !== id));
    onToast(`Markert som ferdig`);
  };
  const handleSheetSelect = (a) => {
    setSheetOpen(false);
    onToast(`Åpner: ${a.label}`);
  };

  return (
    <div className="mobile-shell-t">
      <MobileHeader
        kennel={todayKennel}
        unread={3}
        onKennelTap={() => onToast("Kennel-meny")}
        onBellTap={() => setNotifOpen(true)}
      />

      <div className="m-scroll">
        <HeroStrip
          greeting={todayDate.greeting}
          dateLine={todayDate.dateLine}
          weather={todayDate.weather}
        />

        {/* Karma strip — appears in default and karma-celebration modes */}
        {mode === "default" && (
          <KarmaStrip
            delta={todayKennel.karma.deltaToday}
            reason={todayKennel.karma.reason}
            onTap={() => onToast("Karma-detaljer")}
          />
        )}
        {mode === "karma" && (
          <KarmaCelebration onTap={() => onToast("Karma-detaljer")} />
        )}

        {/* Feed body */}
        {mode === "empty" ? (
          <EmptyToday />
        ) : (
          <div className="feed-stack">
            {feed.map((card, idx) => {
              const isExpanded = expanded === card.id;
              if (card.kind === "hero-litter") {
                return (
                  <div key={card.id} className="feed-card-wrap" style={{ animationDelay: `${idx * 60}ms` }}>
                    <LitterHeroCard
                      card={card}
                      expanded={isExpanded}
                      onToggleExpand={() => setExpanded(isExpanded ? null : card.id)}
                      onPrimary={(a) => onToast(`→ ${a.label}`)}
                    />
                  </div>
                );
              }
              return (
                <div key={card.id} className="feed-card-wrap" style={{ animationDelay: `${idx * 60}ms` }}>
                  <FeedCard
                    card={card}
                    expanded={isExpanded}
                    onToggleExpand={() => setExpanded(isExpanded ? null : card.id)}
                    onSnooze={() => handleSnooze(card.id)}
                    onDone={() => handleDone(card.id)}
                    onPrimary={(a) => onToast(`→ ${a.label}`)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Stats strip — hidden in empty + karma celebration */}
        {mode === "default" && (
          <StatStrip stats={todayStats} onTap={(id) => onToast(`Åpner: ${id}`)} />
        )}
      </div>

      <CameraFAB onTap={() => setSheetOpen(true)} pulse={mode === "default"} />

      <TabBar active={activeTab} onTap={(id) => { setActiveTab(id); onToast(`Tab: ${id}`); }} />

      <BottomSheet
        open={sheetOpen}
        actions={fabActions}
        onSelect={handleSheetSelect}
        onClose={() => setSheetOpen(false)}
      />

      <NotificationOverlay
        open={notifOpen}
        items={todayNotifications}
        onClose={() => setNotifOpen(false)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
function DesktopToday({ mode, onToast }) {
  const [selected, setSelected] = useStateApp2(todayFeed[1].id); // start with litter card open
  const [activeNav, setActiveNav] = useStateApp2("hjem");
  const [feed, setFeed] = useStateApp2(todayFeed);

  useEffectApp2(() => {
    setFeed(todayFeed);
    setSelected(todayFeed[1].id);
  }, [mode]);

  // Keyboard shortcut: "c" to open quick capture
  useEffectApp2(() => {
    const handle = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        onToast("Hurtig-fangst åpnet (c)");
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onToast]);

  const selectedCard = feed.find((c) => c.id === selected);

  return (
    <div className="desktop-shell-t">
      {/* Top bar */}
      <header className="d-topbar-t">
        <div className="d-brand-t">
          <div className="mark">G</div>
          <div>
            <div style={{ fontWeight: 600 }}>{todayKennel.name}</div>
            <div className="d-brand-sub">
              <span className="karma-chip"><span className="karma-dot"></span>{todayKennel.karma.tier}-tier</span>
              · {todayDate.dateLine}
            </div>
          </div>
        </div>
        <div className="d-top-actions">
          <div className="d-search">
            {Icon.search}
            <input className="d-search-input" placeholder="Søk hunder, kull, kjøpere…" />
            <kbd>⌘K</kbd>
          </div>
          <button className="d-icon-btn" aria-label="Varsler">
            {Icon.bell}
            <span className="d-icon-badge">3</span>
          </button>
          <PhotoT size={30} label="O" />
        </div>
      </header>

      <div className="d-body-t">
        {/* Side nav */}
        <aside className="d-side-t">
          {[
            { id: "hjem",    label: "Hjem",    icon: TabIcons.hjem },
            { id: "hunder",  label: "Hunder",  icon: TabIcons.hunder, count: 8 },
            { id: "kull",    label: "Kull",    icon: TabIcons.kull, count: 1 },
            { id: "kjopere", label: "Kjøpere", icon: TabIcons.kjopere, badge: 4 },
            { id: "mer",     label: "Mer",     icon: TabIcons.mer },
          ].map((item) => (
            <button
              key={item.id}
              className={`d-nav-item ${item.id === activeNav ? "is-active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="d-nav-icon">{item.icon}</span>
              <span className="d-nav-label">{item.label}</span>
              {item.count != null && <span className="d-nav-count mute">{item.count}</span>}
              {item.badge && <span className="d-nav-count">{item.badge}</span>}
            </button>
          ))}

          <div className="d-side-spacer"></div>
          <div className="d-side-foot">
            <div className="d-shortcut-hint">
              <kbd>C</kbd>
              <span>Hurtig fangst</span>
            </div>
            <button className="d-nav-item">
              <span className="d-nav-icon">{Icon.edit}</span>
              <span className="d-nav-label">Innstillinger</span>
            </button>
          </div>
        </aside>

        {/* Main area */}
        <main className="d-main-t">
          {/* Stats / charts area */}
          <section className="d-stats-row">
            <div className="d-stat-tile">
              <div className="d-stat-head">
                <span className="d-stat-label">Aktive hunder</span>
                <span className="d-stat-trend up">+2</span>
              </div>
              <div className="d-stat-value">8</div>
              <StatChart data={todayStats[0].spark} color="var(--forest-700)" />
              <div className="d-stat-foot">Siste 7 mnd</div>
            </div>
            <div className="d-stat-tile">
              <div className="d-stat-head">
                <span className="d-stat-label">Aktive kull</span>
                <span className="d-stat-trend">—</span>
              </div>
              <div className="d-stat-value">1</div>
              <StatChart data={todayStats[1].spark} color="var(--ochre-600)" />
              <div className="d-stat-foot">Kull C, uke 4</div>
            </div>
            <div className="d-stat-tile">
              <div className="d-stat-head">
                <span className="d-stat-label">Søknader</span>
                <span className="d-stat-trend up">+3</span>
              </div>
              <div className="d-stat-value">4</div>
              <StatChart data={todayStats[2].spark} color="var(--info-dot)" bars />
              <div className="d-stat-foot">3 nye denne uken</div>
            </div>
            <div className="d-stat-tile is-pull">
              <div className="d-stat-head">
                <span className="d-stat-label">Karma</span>
                <span className="karma-chip"><span className="karma-dot"></span>Sølv</span>
              </div>
              <div className="d-stat-value">+50<span className="d-stat-unit"> i dag</span></div>
              <div className="d-stat-karma-bar">
                <div className="d-stat-karma-fill" style={{ width: "64%" }}></div>
              </div>
              <div className="d-stat-foot">64 % til Gull</div>
            </div>
          </section>

          {/* Feed + detail */}
          <section className="d-two-col">
            <div className="d-feed-col">
              <div className="d-feed-head">
                <h2>Hva skjer i dag</h2>
                <div className="d-feed-filters">
                  <button className="d-chip is-active">Alt</button>
                  <button className="d-chip">Haster</button>
                  <button className="d-chip">Kull</button>
                  <button className="d-chip">Kjøpere</button>
                  <button className="d-chip">Nyheter</button>
                </div>
              </div>

              {mode === "empty" ? (
                <EmptyToday />
              ) : (
                <div className="d-feed-stack">
                  {feed.map((card, idx) => (
                    <button
                      key={card.id}
                      className={`d-feed-row stripe-${card.kind} ${selected === card.id ? "is-selected" : ""}`}
                      onClick={() => setSelected(card.id)}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="feed-stripe"></div>
                      <div className={`feed-icon ${card.kind}`}>{Icon[card.icon]}</div>
                      <div className="d-feed-row-body">
                        <div className="d-feed-row-headline">{card.headline}</div>
                        <div className="d-feed-row-sub">{card.sub}</div>
                      </div>
                      <span className="d-feed-row-chev">{Icon.chevron}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detail panel */}
            <aside className="d-detail-col">
              {selectedCard && mode !== "empty" ? (
                <DetailPanel card={selectedCard} onAction={(a) => onToast(`→ ${a.label}`)} />
              ) : (
                <div className="d-detail-empty">
                  <p>Velg et kort til venstre for å se detaljer.</p>
                </div>
              )}
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

// ─── Stat chart (mini sparkline / bar) ──────────────────────────────────────
function StatChart({ data, color = "var(--forest-700)", bars = false }) {
  const W = 220, H = 36;
  const max = Math.max(...data);
  if (bars) {
    const bw = W / data.length;
    return (
      <svg className="d-stat-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {data.map((v, i) => {
          const h = (v / max) * (H - 4);
          return <rect key={i} x={i * bw + 2} y={H - h} width={bw - 4} height={h} rx="1.5" fill={color} opacity={0.85} />;
        })}
      </svg>
    );
  }
  const path = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * (H - 4) - 2;
    return `${i === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");
  const fillPath = `${path} L${W} ${H} L0 ${H} Z`;
  return (
    <svg className="d-stat-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <path d={fillPath} fill={color} opacity="0.10" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Detail panel (desktop right column) ────────────────────────────────────
function DetailPanel({ card, onAction }) {
  const isLitter = card.kind === "hero-litter";
  return (
    <div className={`d-detail stripe-${card.kind}`}>
      <div className="feed-stripe"></div>
      <header className="d-detail-head">
        <div className={`feed-icon ${card.kind}`} style={{ marginBottom: 12 }}>{Icon[card.icon]}</div>
        <h3>{card.headline}</h3>
        <p>{card.sub}</p>
      </header>

      {isLitter && (
        <>
          <div className="d-detail-section">
            <div className="d-detail-section-head">Valpene i dag</div>
            <div className="d-detail-pups">
              {card.puppies.map((p, i) => (
                <div key={i} className={`d-pup-row ${p.sex === "m" ? "is-sire" : "is-dam"}`}>
                  <PhotoT size={36} label={p.name.slice(0, 1)} />
                  <div className="d-pup-meta">
                    <div className="d-pup-name">{p.name}</div>
                    <div className="d-pup-sex">{p.sex === "m" ? "Hannvalp" : "Tispevalp"}</div>
                  </div>
                  <div className="d-pup-weight">
                    <span>{p.weight}</span>
                    <small>kg</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-detail-section">
            <div className="d-detail-section-head">Vektutvikling · siste 7 dager</div>
            <LitterChart puppies={card.puppies} />
          </div>
        </>
      )}

      {!isLitter && card.expand && (
        <>
          <div className="d-detail-section">
            <p style={{ margin: 0, fontSize: 14, color: "var(--n-700)" }}>{card.expand.summary}</p>
          </div>
          {card.expand.detail && (
            <div className="d-detail-section">
              <div className="d-detail-section-head">Detaljer</div>
              <dl className="feed-expand-kv">
                {card.expand.detail.map(([k, v], i) => (
                  <React.Fragment key={i}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          )}
        </>
      )}

      <footer className="d-detail-foot">
        {(card.actions || [card.action]).filter(Boolean).map((a, i) => (
          <button
            key={i}
            className={`btn ${a.primary ? "btn--primary" : "btn--secondary"}`}
            onClick={() => onAction(a)}
          >
            {a.label}
          </button>
        ))}
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — state switcher + both viewports
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [mode, setMode] = useStateApp2("default");
  const [toast, setToast] = useStateApp2(null);

  const showToast = useCallbackApp2((msg) => setToast(msg), []);

  const modes = [
    { id: "default", label: "Default · normal day" },
    { id: "empty",   label: "Empty · calm day" },
    { id: "karma",   label: "Karma celebration" },
  ];

  return (
    <div className="page-root-t">
      <header className="page-head-t">
        <div className="page-eyebrow">DogWorld · Prototype</div>
        <h1>Today Dashboard</h1>
        <p className="page-sub">
          What a breeder sees 30+ times a day. Orientation in under 2 seconds,
          one clear next action. Camera FAB is the universal input — add a dog,
          scan a certificate, log a weight, all start here.
        </p>
        <div className="state-switcher" role="tablist" aria-label="Demo states">
          {modes.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              className={`state-btn ${mode === m.id ? "is-active" : ""}`}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </header>

      <div className="frames-t">
        {/* MOBILE */}
        <div className="frame-col-t">
          <div className="frame-meta-t">
            <span className="frame-label-t">Mobile · 375 × 812</span>
            <span className="frame-hint-t">Tap a card to expand · FAB for camera</span>
          </div>
          <div className="device-mobile-t">
            <div className="device-mobile-screen-t">
              <MobileToday mode={mode} onToast={showToast} />
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="frame-col-t">
          <div className="frame-meta-t">
            <span className="frame-label-t">Desktop · 1280 × 800</span>
            <span className="frame-hint-t"><kbd>C</kbd> for quick capture · click feed to preview right</span>
          </div>
          <div className="device-desktop-t">
            <div className="device-desktop-chrome">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="device-url">dogworld.app / hjem</span>
            </div>
            <div className="device-desktop-screen-t">
              <DesktopToday mode={mode} onToast={showToast} />
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />

      <footer className="page-foot-t">
        <div>DogWorld · Today Dashboard · built on Design System v0.1</div>
        <div>Demo: tap Kull C → expand · tap camera FAB → 5 options · toggle state buttons above</div>
      </footer>
    </div>
  );
}

const root2 = ReactDOM.createRoot(document.getElementById("root"));
root2.render(<App />);
