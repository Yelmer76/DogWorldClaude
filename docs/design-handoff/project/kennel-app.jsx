// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC KENNEL — App: page/state switcher, mobile + desktop frames
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateKA, useEffect: useEffectKA, useCallback: useCallbackKA } = React;

function KennelView({ pageState, onChangePage, viewMode, onChangeView, onToast }) {
  const [menuOpen, setMenuOpen] = useStateKA(false);
  const [applyOpen, setApplyOpen] = useStateKA(false);
  const [scrolled, setScrolled] = useStateKA(false);

  const handleScroll = (e) => setScrolled(e.target.scrollTop > 80);

  const showOwnerBanner = viewMode === "edit" || viewMode === "owner-view";
  const editMode = viewMode === "edit";

  const onApply = () => setApplyOpen(true);
  const onTapDog = (id) => {
    if (id === "astor" && pageState.startsWith("template-a")) {
      onChangePage("dog-astor");
    } else {
      onToast(`→ Public dog page · ${id}`);
    }
  };
  const onTapMemorial = (id) => {
    if (id === "vidar") onChangePage("memorial-vidar");
    else onToast(`→ Minneside · ${id}`);
  };
  const onTapPedigree = () => onToast("→ Pedigree explorer (egen prototype)");
  const onContact = () => onToast("→ Kontakt oppdretter");
  const onNav = (id) => onToast(`Bla til: ${id}`);

  let content = null;
  let kennel = granheim;

  if (pageState === "template-a") {
    kennel = granheim;
    content = (
      <TemplateA
        kennel={granheim}
        editMode={editMode}
        onTapDog={onTapDog}
        onTapMemorial={onTapMemorial}
        onTapPedigree={onTapPedigree}
        onApplyPuppy={onApply}
      />
    );
  } else if (pageState === "template-b") {
    kennel = lyngheia;
    content = (
      <TemplateB
        kennel={lyngheia}
        editMode={editMode}
        onTapDog={onTapDog}
        onApplyPuppy={onApply}
      />
    );
  } else if (pageState === "dog-astor") {
    kennel = granheim;
    content = (
      <PublicDogPage
        dog={astorPublic}
        kennel={granheim}
        onBack={() => onChangePage("template-a")}
        onTapPedigree={onTapPedigree}
        onContact={onContact}
      />
    );
  } else if (pageState === "memorial-vidar") {
    kennel = granheim;
    content = (
      <PublicMemorialPage
        dog={vidarMemorial}
        kennel={granheim}
        onBack={() => onChangePage("template-a")}
      />
    );
  }

  // Decide which header/footer to show
  const isFullPage = pageState === "template-a" || pageState === "template-b";

  return (
    <div className={`kview ${editMode ? "is-edit" : ""}`}>
      {showOwnerBanner && (
        <OwnerBanner mode={viewMode === "edit" ? "edit" : "view"} onToggle={(v) => onChangeView(v === "edit" ? "edit" : "owner-view")} />
      )}
      <PubHeader
        kennel={kennel}
        page={pageState}
        onNav={onNav}
        onMenuOpen={() => setMenuOpen(true)}
        sticky={scrolled}
      />
      <main className="kview-main" onScroll={handleScroll}>
        {content}
        {isFullPage && <PubFooter kennel={kennel} />}
      </main>

      <MobileMenu open={menuOpen} items={navItems} onSelect={(i) => onToast(`Bla til: ${i.label}`)} onClose={() => setMenuOpen(false)} />
      <ApplicationModal
        open={applyOpen}
        kennel={kennel}
        onClose={() => setApplyOpen(false)}
        onSubmit={() => { setApplyOpen(false); onToast("Søknad sendt — Hanne ringer innen 3 dager."); }}
      />
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────
function ToastK({ message, onClose }) {
  useEffectKA(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div className="toast-host-k">
      <div className="toast-k">
        <span className="toast-dot-k"></span>
        <span>{message}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [pageState, setPageState] = useStateKA("template-a");
  const [viewMode, setViewMode] = useStateKA("public");
  const [toast, setToast] = useStateKA(null);
  const showToast = useCallbackKA((m) => setToast(m), []);

  const pageOptions = [
    { id: "template-a",     label: "A · Granheim (showcase)" },
    { id: "template-b",     label: "B · Lyngheia (commercial)" },
    { id: "dog-astor",      label: "C · Public dog page (Astor)" },
    { id: "memorial-vidar", label: "D · Memorial (Vidar)" },
  ];

  const viewOptions = [
    { id: "public", label: "Som besøkende" },
    { id: "owner-view", label: "Som eier — se" },
    { id: "edit",   label: "Som eier — rediger" },
  ];

  return (
    <div className="page-root-k">
      <header className="page-head-k">
        <div className="page-eyebrow">DogWorld · Prototype</div>
        <h1>Public Kennel Page</h1>
        <p className="page-sub">
          The other half of DogWorld. What puppy buyers and peer breeders see when they visit a kennel.
          Two templates — Showcase (lineage-proud) and Commercial (funnel) — plus public dog page,
          memorial page, and edit-mode preview.
        </p>

        <div className="ob-controls-k">
          <div className="ob-jump-row-k">
            <span className="ob-jump-label-k">Side:</span>
            {pageOptions.map((p) => (
              <button
                key={p.id}
                className={`ob-jump-btn-k ${pageState === p.id ? "is-active" : ""}`}
                onClick={() => setPageState(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="ob-jump-row-k ob-jump-row-sub-k">
            <span className="ob-jump-label-k">Visning:</span>
            {viewOptions.map((v) => (
              <button
                key={v.id}
                className={`ob-jump-btn-k ${viewMode === v.id ? "is-active" : ""}`}
                onClick={() => setViewMode(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="frames-k">
        <div className="frame-col-k">
          <div className="frame-meta-k">
            <span className="frame-label-k">Mobile · 375 × 812</span>
            <span className="frame-hint-k">Tap nav · Søk om valp · scroll</span>
          </div>
          <div className="device-mobile-k">
            <div className="device-mobile-screen-k">
              <KennelView
                pageState={pageState}
                onChangePage={setPageState}
                viewMode={viewMode}
                onChangeView={setViewMode}
                onToast={showToast}
              />
            </div>
          </div>
        </div>

        <div className="frame-col-k">
          <div className="frame-meta-k">
            <span className="frame-label-k">Desktop · 1280 × 800</span>
            <span className="frame-hint-k">Wider hero · 3-col dog grid · sticky nav</span>
          </div>
          <div className="device-desktop-k">
            <div className="device-desktop-chrome-k">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="device-url">
                {pageState === "template-a" && "granheim.dogworldtmp.no"}
                {pageState === "template-b" && "lyngheia.dogworldtmp.no"}
                {pageState === "dog-astor" && "granheim.dogworldtmp.no / hunder / astor"}
                {pageState === "memorial-vidar" && "granheim.dogworldtmp.no / minne / vidar"}
              </span>
            </div>
            <div className="device-desktop-screen-k">
              <KennelView
                pageState={pageState}
                onChangePage={setPageState}
                viewMode={viewMode}
                onChangeView={setViewMode}
                onToast={showToast}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastK message={toast} onClose={() => setToast(null)} />

      <footer className="page-foot-k">
        <div>DogWorld · Public Kennel · built on Design System v0.1</div>
        <div>Demo: Switch between A/B templates · tap Astor card → public dog page · tap memorial card → Vidar · "Som eier — rediger" → edit affordances</div>
      </footer>
    </div>
  );
}

const rootK = ReactDOM.createRoot(document.getElementById("root"));
rootK.render(<App />);
