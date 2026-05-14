// ─────────────────────────────────────────────────────────────────────────────
// DOG DETAIL — App: mobile + desktop, 3 state variants, state switcher
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateApp3, useEffect: useEffectApp3, useRef: useRefApp3, useCallback: useCallbackApp3 } = React;

// ── Profil tab content (shared mobile + desktop) ───────────────────────────
function ProfilTab({ dog, mode, onSave, onTapParent, onOpenPedigree, onStatusTap, onToggle, onScan }) {
  return (
    <div className="profil-tab">
      {mode === "sparse" && (
        <SparseSuggestion onScan={onScan} />
      )}

      <section className="profil-section">
        <SectionHead>Grunnleggende</SectionHead>
        <div className="field-list">
          {dog.basics.map((row) => (
            <InlineField key={row.key} row={row} onSave={(k, v) => onSave("basics", k, v)} />
          ))}
        </div>
      </section>

      <section className="profil-section">
        <SectionHead>Foreldre</SectionHead>
        <ParentsBlock
          parents={dog.parents}
          onTapParent={onTapParent}
          onOpenPedigree={onOpenPedigree}
          sparse={mode === "sparse"}
        />
      </section>

      <section className="profil-section">
        <SectionHead>Oppdretter og eier</SectionHead>
        <AttributionBlock rows={dog.attribution} />
      </section>

      <section className="profil-section">
        <SectionHead>Personlighet</SectionHead>
        <PersonalityBlock
          value={dog.personality}
          onSave={(v) => onSave("personality", null, v)}
          sparse={mode === "sparse"}
        />
      </section>

      {mode === "memorial" ? (
        <section className="profil-section">
          <SectionHead>Minne</SectionHead>
          <MemorialBlock dog={dog} />
        </section>
      ) : (
        <section className="profil-section">
          <SectionHead>Status og synlighet</SectionHead>
          <VisibilityBlock dog={dog} onStatusTap={onStatusTap} onToggle={onToggle} memorial={false} />
        </section>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
function MobileDog({ mode, onToast }) {
  const initial = mode === "sparse" ? astorSparse : mode === "memorial" ? astorMemorial : astorDefault;
  const [dog, setDog] = useStateApp3(initial);
  const [activeTab, setActiveTab] = useStateApp3("profil");
  const [scrollY, setScrollY] = useStateApp3(0);
  const [statusOpen, setStatusOpen] = useStateApp3(false);
  const [fabOpen, setFabOpen] = useStateApp3(false);
  const [moreOpen, setMoreOpen] = useStateApp3(false);
  const [shareOpen, setShareOpen] = useStateApp3(false);
  const [galleryOpen, setGalleryOpen] = useStateApp3(false);
  const scrollRef = useRefApp3(null);

  useEffectApp3(() => {
    const fresh = mode === "sparse" ? astorSparse : mode === "memorial" ? astorMemorial : astorDefault;
    setDog(fresh);
    setActiveTab("profil");
    setScrollY(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [mode]);

  const handleScroll = (e) => setScrollY(e.target.scrollTop);

  const onSave = (section, key, value) => {
    setDog((d) => {
      if (section === "basics") {
        return {
          ...d,
          basics: d.basics.map((r) => r.key === key ? { ...r, value } : r),
        };
      }
      if (section === "personality") {
        return { ...d, personality: value };
      }
      return d;
    });
    onToast("Lagret");
  };

  const onToggle = (which) => {
    setDog((d) => ({ ...d, [which]: !d[which] }));
    onToast(which === "publicProfile" ? "Synlighet oppdatert" : "Genealogi-deling oppdatert");
  };

  const onStatusSelect = (opt) => {
    setStatusOpen(false);
    setDog((d) => ({ ...d, status: opt.id, statusLabel: opt.label }));
    onToast(`Status: ${opt.label}`);
  };

  const heroParallax = Math.min(scrollY * 0.4, 60);

  return (
    <div className="dog-shell">
      <NavBar
        scrolled={scrollY > 120}
        title={dog.identity.callName || "Astor"}
        onBack={() => onToast("← Hunder")}
        onShare={() => setShareOpen(true)}
        onMore={() => setMoreOpen(true)}
      />

      <div ref={scrollRef} className="dog-scroll" onScroll={handleScroll}>
        <div
          className="hero-wrap"
          style={{ transform: `translateY(${-heroParallax * 0.5}px)` }}
        >
          <HeroBlock
            dog={dog}
            onTapPhoto={() => mode === "sparse" ? onToast("Last opp første bilde") : setGalleryOpen(true)}
            onStatusTap={() => setStatusOpen(true)}
            sparse={mode === "sparse"}
            memorial={mode === "memorial"}
          />
        </div>

        <NameBlock dog={dog} sparse={mode === "sparse"} />

        <div className="tab-bar-sticky">
          <TabBarD active={activeTab} tabs={tabsList} onTap={(id) => {
            setActiveTab(id);
          }} />
        </div>

        <div className="tab-content" key={activeTab + mode}>
          {activeTab === "profil" && (
            <ProfilTab
              dog={dog}
              mode={mode}
              onSave={onSave}
              onTapParent={(id) => onToast(`→ ${id === "bobby" ? "Bobby av Skogen" : "Saga vom Nordwald"}`)}
              onOpenPedigree={() => onToast("→ Pedigree explorer")}
              onStatusTap={() => setStatusOpen(true)}
              onToggle={onToggle}
              onScan={() => onToast("→ Skann papirstamtavle")}
            />
          )}
          {activeTab === "stamtavle" && <StamtavleTab dog={dog} mode={mode} onToast={onToast} />}
          {activeTab === "helse"     && <HelseTab dog={dog} mode={mode} onToast={onToast} />}
          {activeTab === "titler"    && <TitlerTab dog={dog} mode={mode} onToast={onToast} />}
          {activeTab === "bilder"    && <BilderTab dog={dog} mode={mode} onToast={onToast} />}
          {activeTab === "notater"   && <NotaterTab dog={dog} mode={mode} onToast={onToast} />}
        </div>

        <div className="scroll-tail"></div>
      </div>

      {mode !== "memorial" && (
        <button className="fab-d" onClick={() => setFabOpen(true)} aria-label="Legg til">
          {IconD.camera}
        </button>
      )}

      <StatusSheet
        open={statusOpen}
        options={statusOptions}
        current={dog.status}
        onSelect={onStatusSelect}
        onClose={() => setStatusOpen(false)}
      />
      <FabSheet open={fabOpen} actions={fabActionsDog} onSelect={(a) => { setFabOpen(false); onToast(`→ ${a.label}`); }} onClose={() => setFabOpen(false)} />
      <MoreSheet open={moreOpen} actions={moreMenuActions} onSelect={(a) => { setMoreOpen(false); onToast(`→ ${a.label}`); }} onClose={() => setMoreOpen(false)} />
      <ShareSheet open={shareOpen} dog={dog} onClose={() => setShareOpen(false)} />
      <GalleryModalD open={galleryOpen} dog={dog} onClose={() => setGalleryOpen(false)} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP LAYOUT — 3-column with public-preview pane
// ─────────────────────────────────────────────────────────────────────────────
function DesktopDog({ mode, onToast }) {
  const initial = mode === "sparse" ? astorSparse : mode === "memorial" ? astorMemorial : astorDefault;
  const [dog, setDog] = useStateApp3(initial);
  const [activeTab, setActiveTab] = useStateApp3("profil");
  const [statusOpen, setStatusOpen] = useStateApp3(false);
  const [shareOpen, setShareOpen] = useStateApp3(false);

  useEffectApp3(() => {
    const fresh = mode === "sparse" ? astorSparse : mode === "memorial" ? astorMemorial : astorDefault;
    setDog(fresh);
    setActiveTab("profil");
  }, [mode]);

  const onSave = (section, key, value) => {
    setDog((d) => {
      if (section === "basics") return { ...d, basics: d.basics.map((r) => r.key === key ? { ...r, value } : r) };
      if (section === "personality") return { ...d, personality: value };
      return d;
    });
    onToast("Lagret");
  };

  const onToggle = (which) => {
    setDog((d) => ({ ...d, [which]: !d[which] }));
    onToast(which === "publicProfile" ? "Synlighet oppdatert" : "Genealogi-deling oppdatert");
  };

  const onStatusSelect = (opt) => {
    setStatusOpen(false);
    setDog((d) => ({ ...d, status: opt.id, statusLabel: opt.label }));
    onToast(`Status: ${opt.label}`);
  };

  return (
    <div className="dog-desktop">
      <header className="dd-topbar">
        <div className="dd-brand">
          <div className="mark">G</div>
          <div>
            <div style={{ fontWeight: 600 }}>Kennel Granheim</div>
            <div className="dd-brand-sub">
              <span className="karma-chip-d"><span className="karma-dot-d"></span>Sølv-tier</span>
              · Hunder
            </div>
          </div>
        </div>
        <div className="dd-top-actions">
          <div className="dd-search">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="6" /><line x1="20" y1="20" x2="16" y2="16" /></svg>
            <input className="dd-search-input" placeholder="Søk hunder…" />
            <kbd>⌘K</kbd>
          </div>
          <button className="btn btn--secondary" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => setShareOpen(true)}>
            {IconD.share}
            Del
          </button>
          <button className="btn btn--primary" style={{ padding: "7px 12px", fontSize: 13 }}>
            {IconD.camera}
            Legg til hund
          </button>
        </div>
      </header>

      <div className="dd-body">
        {/* Left: dog list */}
        <aside className="dd-left">
          <div className="dd-left-head">
            <h4>Mine hunder</h4>
            <span className="dd-left-count">{recentDogs.length}</span>
          </div>
          <div className="dd-list-filter">
            <button className="d-chip-dd is-active">Alle</button>
            <button className="d-chip-dd">Aktiv</button>
            <button className="d-chip-dd">Avl</button>
            <button className="d-chip-dd">Valper</button>
          </div>
          <div className="dd-dog-list">
            {recentDogs.map((d) => (
              <button
                key={d.id}
                className={`dd-dog-row ${d.id === "astor" ? "is-active" : ""} ${d.sex === "m" ? "is-sire" : "is-dam"}`}
                onClick={() => d.id !== "astor" && onToast(`→ ${d.name}`)}
              >
                <PhotoBox tone={d.sex === "m" ? "sire" : "dam"} label={d.sex === "m" ? "♂" : "♀"} width={36} height={36} radius={6} />
                <div className="dd-dog-row-meta">
                  <div className="dd-dog-row-titles">{d.titles.join(" ")}</div>
                  <div className="dd-dog-row-name">{d.name}</div>
                  <div className="dd-dog-row-sub">{d.age}</div>
                </div>
                {d.status === "puppy" && <span className="dd-status-mini puppy">valp</span>}
                {d.status === "retired" && <span className="dd-status-mini retired">pens.</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Center: dog detail */}
        <main className="dd-center">
          <NavBar
            scrolled={true}
            title={dog.identity.callName || "Astor"}
            onBack={() => onToast("← Hunder")}
            onShare={() => setShareOpen(true)}
            onMore={() => onToast("Mer-meny")}
          />
          <div className="dd-center-scroll">
            <HeroBlock
              dog={dog}
              onTapPhoto={() => onToast("Galleri")}
              onStatusTap={() => setStatusOpen(true)}
              sparse={mode === "sparse"}
              memorial={mode === "memorial"}
            />
            <NameBlock dog={dog} sparse={mode === "sparse"} />
            <TabBarD active={activeTab} tabs={tabsList} onTap={(id) => {
              setActiveTab(id);
            }} />
            <div className="tab-content" key={activeTab + mode + "-d"}>
              {activeTab === "profil" ? (
                <ProfilTab
                  dog={dog}
                  mode={mode}
                  onSave={onSave}
                  onTapParent={(id) => onToast(`→ ${id === "bobby" ? "Bobby av Skogen" : "Saga vom Nordwald"}`)}
                  onOpenPedigree={() => onToast("→ Pedigree explorer")}
                  onStatusTap={() => setStatusOpen(true)}
                  onToggle={onToggle}
                  onScan={() => onToast("→ Skann papirstamtavle")}
                />
              ) : (
                <>
                  {activeTab === "stamtavle" && <StamtavleTab dog={dog} mode={mode} onToast={onToast} />}
                  {activeTab === "helse"     && <HelseTab dog={dog} mode={mode} onToast={onToast} />}
                  {activeTab === "titler"    && <TitlerTab dog={dog} mode={mode} onToast={onToast} />}
                  {activeTab === "bilder"    && <BilderTab dog={dog} mode={mode} onToast={onToast} />}
                  {activeTab === "notater"   && <NotaterTab dog={dog} mode={mode} onToast={onToast} />}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Right: public preview */}
        <aside className="dd-right">
          <div className="dd-right-head">
            <div className="dd-right-eyebrow">Slik ser andre Astors profil</div>
            <h4>Offentlig forhåndsvisning</h4>
            <div className="dd-right-url">dogworld.app / kennel-granheim / {dog.identity.callName?.toLowerCase() || "astor"}-av-granheim</div>
          </div>
          <PublicPreview dog={dog} mode={mode} />
          <div className="dd-right-foot">
            <span style={{ fontSize: 12, color: "var(--n-700)" }}>
              {dog.publicProfile ? "Profilen er synlig for alle." : "Profilen er skjult fra offentlig søk."}
            </span>
            <Toggle on={dog.publicProfile} onTap={() => onToggle("publicProfile")} />
          </div>
        </aside>
      </div>

      <StatusSheet open={statusOpen} options={statusOptions} current={dog.status} onSelect={onStatusSelect} onClose={() => setStatusOpen(false)} />
      <ShareSheet open={shareOpen} dog={dog} onClose={() => setShareOpen(false)} />
    </div>
  );
}

// ── Public preview component (what visitors see) ───────────────────────────
function PublicPreview({ dog, mode }) {
  if (mode === "memorial") {
    return (
      <div className="pp-card pp-memorial">
        <PhotoBox tone="elkhound" muted label="ASTOR" height={120} radius={6} />
        <div className="pp-body">
          <div className="pp-titles">{dog.identity.titles.join(" ")}</div>
          <h5 className="pp-name">{dog.identity.fullName}</h5>
          <div className="pp-mem">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="7" /><path d="M12 4v4" /></svg>
            <span>{dog.identity.born} – {dog.identity.died}</span>
          </div>
          <p className="pp-blurb">Over regnbuebroen. Minneside aktiv.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="pp-card">
      {dog.hero.photo ? (
        <PhotoBox tone="elkhound" label="ASTOR" height={120} radius={6} />
      ) : (
        <div className="pp-photo-empty">Ingen bilder ennå</div>
      )}
      <div className="pp-body">
        {dog.identity.titles.length > 0 && (
          <div className="pp-titles">{dog.identity.titles.join(" ")}</div>
        )}
        <h5 className="pp-name">{dog.identity.fullName || "Astor"}</h5>
        <div className="pp-meta">
          <SexPip sex="m" size={12} />
          <span>{dog.identity.sex}</span>
          <span>·</span>
          <span>{dog.identity.born}</span>
        </div>
        {dog.preview && (
          <>
            <div className="pp-section">
              <div className="pp-section-head">Helse</div>
              <div className="pp-health">
                {dog.preview.health.map((h, i) => (
                  <span key={i} className={`pp-h-tag s-${h.state}`}>
                    <span className="pp-h-k">{h.k}</span>
                    <span className="pp-h-v">{h.v}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="pp-section">
              <div className="pp-section-head">Siste titler</div>
              <div className="pp-titles-list">
                {dog.preview.titles.slice(0, 3).map((t, i) => (
                  <div key={i} className="pp-title-row">
                    <span className="pp-title-y">{t.y}</span>
                    <span className="pp-title-t">{t.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {!dog.publicProfile && (
          <div className="pp-private">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            Skjult — kun du ser denne profilen
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [mode, setMode] = useStateApp3("default");
  const [toast, setToast] = useStateApp3(null);

  const showToast = useCallbackApp3((msg) => setToast(msg), []);

  const modes = [
    { id: "default",  label: "Default · full profile" },
    { id: "sparse",   label: "Sparse · newly added" },
    { id: "memorial", label: "Memorial · over regnbuebroen" },
  ];

  return (
    <div className="page-root-d">
      <header className="page-head-d">
        <div className="page-eyebrow">DogWorld · Prototype</div>
        <h1>Dog Detail — Astor av Granheim</h1>
        <p className="page-sub">
          The screen breeders land on from every other screen. Inline editing (no edit-mode dance),
          camera as a first-class input, structured data shown as tables not prose. Three states.
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

      <div className="frames-d">
        {/* MOBILE */}
        <div className="frame-col-d">
          <div className="frame-meta-d">
            <span className="frame-label-d">Mobile · 375 × 812</span>
            <span className="frame-hint-d">Tap any value to edit · camera FAB always present</span>
          </div>
          <div className="device-mobile-d">
            <div className="device-mobile-screen-d">
              <MobileDog mode={mode} onToast={showToast} />
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="frame-col-d">
          <div className="frame-meta-d">
            <span className="frame-label-d">Desktop · 1280 × 800</span>
            <span className="frame-hint-d">List left · detail center · live public preview right</span>
          </div>
          <div className="device-desktop-d">
            <div className="device-desktop-chrome">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="device-url">dogworld.app / hunder / astor-av-granheim</span>
            </div>
            <div className="device-desktop-screen-d">
              <DesktopDog mode={mode} onToast={showToast} />
            </div>
          </div>
        </div>
      </div>

      <ToastD message={toast} onClose={() => setToast(null)} />

      <footer className="page-foot-d">
        <div>DogWorld · Dog Detail · built on Design System v0.1</div>
        <div>Demo: tap "Kallenavn" → inline edit · tap status pill → sheet · toggle public profile · switch states above</div>
      </footer>
    </div>
  );
}

const root3 = ReactDOM.createRoot(document.getElementById("root"));
root3.render(<App />);
