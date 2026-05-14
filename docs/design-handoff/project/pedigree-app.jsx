// ─────────────────────────────────────────────────────────────────────────────
// PEDIGREE APP — focal navigation state, mobile + desktop layouts.
// Spatial model:
//   up    = back in time (toward ancestors)   → translate from above
//   down  = forward in time (toward offspring) → translate from below
//   lateral = same generation (siblings)        → translate sideways
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp, useCallback: useCallbackApp } = React;

const DIR = {
  UP: "up",       // tapped a parent / grandparent
  DOWN: "down",   // tapped an offspring
  LATERAL: "lateral", // tapped a sibling
  JUMP: "jump",   // breadcrumb / share
};

function usePedigreeState(initialId = "astor") {
  const [history, setHistory] = useStateApp([initialId]);
  const [dir, setDir] = useStateApp(DIR.JUMP);
  const focalId = history[history.length - 1];

  const goTo = useCallbackApp((id, direction = DIR.JUMP) => {
    if (!id || id === focalId) return;
    setDir(direction);
    setHistory((h) => [...h, id]);
  }, [focalId]);

  const goToBreadcrumb = useCallbackApp((idx) => {
    setDir(DIR.JUMP);
    setHistory((h) => h.slice(0, idx + 1));
  }, []);

  const reset = useCallbackApp(() => {
    setDir(DIR.JUMP);
    setHistory([initialId]);
  }, [initialId]);

  return { focalId, history, dir, goTo, goToBreadcrumb, reset };
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT (375 × 812)
// ─────────────────────────────────────────────────────────────────────────────
function MobilePedigree({ onShare }) {
  const { focalId, history, dir, goTo, goToBreadcrumb, reset } = usePedigreeState("astor");
  const [gallery, setGallery] = useStateApp(null);
  const focal = getDog(focalId);
  if (!focal) return null;

  const sire = focal.sireId ? getDog(focal.sireId) : null;
  const dam = focal.damId ? getDog(focal.damId) : null;
  const paternalGS = sire ? getDog(sire.sireId) : null;
  const paternalGD = sire ? getDog(sire.damId) : null;
  const maternalGS = dam ? getDog(dam.sireId) : null;
  const maternalGD = dam ? getDog(dam.damId) : null;

  return (
    <div className="mobile-shell">
      <header className="m-topbar">
        <button className="btn btn--icon" style={{ width: 32, height: 32 }} onClick={reset} aria-label="Home">
          <svg className="i" viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg>
        </button>
        <div className="title">Pedigree</div>
        <div style={{ display: "flex", gap: 4 }}>
          <button className="btn btn--icon" style={{ width: 32, height: 32 }} aria-label="Search">
            <svg className="i" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><line x1="20" y1="20" x2="16" y2="16"/></svg>
          </button>
          <button className="btn btn--icon" style={{ width: 32, height: 32 }} aria-label="More">
            <svg className="i" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>
          </button>
        </div>
      </header>

      <Breadcrumb history={history} onJump={goToBreadcrumb} />

      <div className={`anim-stage anim-${dir}`} key={focalId + dir}>
        {/* Grandparents · furthest back in time — top */}
        <div className="grandparents-row">
          {[paternalGS, paternalGD, maternalGS, maternalGD].map((gp, i) => {
            const id = [sire?.sireId, sire?.damId, dam?.sireId, dam?.damId][i];
            return (
              <NodeCard
                key={i}
                dogId={id || null}
                size="sm"
                onTap={(tid) => tid && goTo(tid, DIR.UP)}
                generation="grandparent"
              />
            );
          })}
        </div>

        {/* Connector · visual cue between grandparents and parents */}
        <div className="tree-spacer" aria-hidden="true"></div>

        {/* Parents */}
        <div className="parents-row">
          {sire ? (
            <NodeCard dogId={sire.id} size="md" onTap={(id) => goTo(id, DIR.UP)} generation="parent" />
          ) : (
            <NodeCard dogId={null} size="md" onTap={() => {}} />
          )}
          {dam ? (
            <NodeCard dogId={dam.id} size="md" onTap={(id) => goTo(id, DIR.UP)} generation="parent" />
          ) : (
            <NodeCard dogId={null} size="md" onTap={() => {}} />
          )}
        </div>

        {/* Connector */}
        <div className="tree-spacer" aria-hidden="true"></div>

        {/* Focal */}
        <div className="focal-anchor">
          <div className="focal-badge">FOCAL</div>
          <FocalCard dog={focal} onPhotoTap={() => setGallery(focal)} />
        </div>

        {/* Offspring — carousel header carries its own label */}
        <DogCarousel
          ids={focal.offspringIds}
          label="Offspring"
          onTap={(id) => goTo(id, DIR.DOWN)}
          generation="offspring"
          emptyText="No registered offspring yet."
        />

        {/* Siblings */}
        <DogCarousel
          ids={focal.siblingIds}
          label="Same litter"
          onTap={(id) => goTo(id, DIR.LATERAL)}
          generation="sibling"
          emptyText="No littermates recorded."
        />
      </div>

      <button className="fab" onClick={() => onShare(focal)} aria-label="Share pedigree">
        <svg className="i" viewBox="0 0 24 24" width="20" height="20">
          <circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/>
          <line x1="8.2" y1="10.8" x2="15.8" y2="7.2"/>
          <line x1="8.2" y1="13.2" x2="15.8" y2="16.8"/>
        </svg>
      </button>

      {gallery && <GalleryModal dog={gallery} onClose={() => setGallery(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP LAYOUT (1280 × 800)
// ─────────────────────────────────────────────────────────────────────────────
function DesktopPedigree({ onShare }) {
  const { focalId, history, dir, goTo, goToBreadcrumb, reset } = usePedigreeState("astor");
  const [gallery, setGallery] = useStateApp(null);
  const [hint, setHint] = useStateApp(true);
  const focal = getDog(focalId);
  if (!focal) return null;

  const sire = focal.sireId ? getDog(focal.sireId) : null;
  const dam = focal.damId ? getDog(focal.damId) : null;
  const grandparents = [
    { id: sire?.sireId, dog: sire ? getDog(sire.sireId) : null, side: "paternal", role: "grandsire" },
    { id: sire?.damId, dog: sire ? getDog(sire.damId) : null, side: "paternal", role: "granddam" },
    { id: dam?.sireId, dog: dam ? getDog(dam.sireId) : null, side: "maternal", role: "grandsire" },
    { id: dam?.damId, dog: dam ? getDog(dam.damId) : null, side: "maternal", role: "granddam" },
  ];

  // Keyboard navigation
  useEffectApp(() => {
    const handleKey = (e) => {
      // Only activate when desktop is focused (e.g. mouse moved over it)
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (sire) goTo(sire.id, DIR.UP);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const first = focal.offspringIds?.[0];
        if (first) goTo(first, DIR.DOWN);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const first = focal.siblingIds?.[0];
        if (first) goTo(first, DIR.LATERAL);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (dam) goTo(dam.id, DIR.UP);
      } else if (e.key === "Escape") {
        if (history.length > 1) goToBreadcrumb(history.length - 2);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focal, sire, dam, history, goTo, goToBreadcrumb]);

  return (
    <div className="desktop-shell">
      {/* Top bar */}
      <header className="d-topbar">
        <div className="d-brand">
          <div className="mark">D</div>
          <span>DogWorld</span>
          <span className="d-context">/ Pedigree explorer</span>
        </div>
        <button className="btn btn--secondary" style={{ padding: "8px 12px", fontSize: 13 }} onClick={() => onShare(focal)}>
          <svg className="i" viewBox="0 0 24 24" width="14" height="14">
            <circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/>
            <line x1="8.2" y1="10.8" x2="15.8" y2="7.2"/><line x1="8.2" y1="13.2" x2="15.8" y2="16.8"/>
          </svg>
          Share
        </button>
      </header>

      <div className="d-body">
        {/* Left rail */}
        <aside className="d-left">
          <div className="search">
            <svg className="i" viewBox="0 0 24 24" width="14" height="14"><circle cx="11" cy="11" r="6"/><line x1="20" y1="20" x2="16" y2="16"/></svg>
            <input placeholder="Search dogs, kennels…" className="search-input" />
            <kbd>⌘K</kbd>
          </div>

          <div className="rail-section">
            <div className="rail-label">History</div>
            {history.slice().reverse().map((id, ri) => {
              const idx = history.length - 1 - ri;
              const d = getDog(id);
              const isCurrent = idx === history.length - 1;
              return (
                <button
                  key={ri + "-" + id}
                  className={`rail-history-item ${isCurrent ? "is-current" : ""}`}
                  onClick={() => !isCurrent && goToBreadcrumb(idx)}
                  disabled={isCurrent}
                >
                  <span className="rail-dot"></span>
                  <div className="rail-history-body">
                    <div className="rail-history-name">{d ? shortName(d) : "?"}</div>
                    {d && d.titles?.length > 0 && (
                      <div className="rail-history-titles">{d.titles.join(" ")}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rail-section">
            <div className="rail-label">Saved searches</div>
            <button className="rail-saved">Granheim — active sires</button>
            <button className="rail-saved">HD-A breeding pool</button>
            <button className="rail-saved">2024 litters</button>
          </div>

          {hint && (
            <div className="kb-hints">
              <div className="kb-hints-head">
                <span>Keyboard</span>
                <button className="btn btn--icon" style={{ width: 22, height: 22, border: 0, background: "transparent" }} onClick={() => setHint(false)} aria-label="Hide">
                  <svg className="i" viewBox="0 0 24 24" width="12" height="12"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
              </div>
              <div className="kb-row"><kbd>↑</kbd><span>Sire</span></div>
              <div className="kb-row"><kbd>←</kbd><span>Dam</span></div>
              <div className="kb-row"><kbd>↓</kbd><span>First offspring</span></div>
              <div className="kb-row"><kbd>→</kbd><span>First sibling</span></div>
              <div className="kb-row"><kbd>Esc</kbd><span>Back one step</span></div>
            </div>
          )}
        </aside>

        {/* Center — tree */}
        <main className="d-center">
          <div className="d-crumb-row">
            <Breadcrumb history={history} onJump={goToBreadcrumb} />
          </div>

          <div className={`d-tree anim-stage anim-${dir}`} key={focalId + "-d-" + dir}>
            <div className="d-gen-label">Gen 2 · Grandparents</div>
            <div className="d-grandparents">
              {grandparents.map((gp, i) => (
                <NodeCard
                  key={i}
                  dogId={gp.id || null}
                  size="md"
                  onTap={(tid) => tid && goTo(tid, DIR.UP)}
                  generation="grandparent"
                />
              ))}
            </div>

            {/* Connector lines */}
            <svg className="d-connectors" viewBox="0 0 4 1" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0.5 0 L0.5 0.4 L1.5 0.4 L1.5 1" />
              <path d="M2.5 1 L2.5 0.4 L3.5 0.4 L3.5 0" />
            </svg>

            <div className="d-gen-label">Gen 1 · Parents</div>
            <div className="d-parents">
              {sire ? (
                <NodeCard dogId={sire.id} size="lg" onTap={(id) => goTo(id, DIR.UP)} generation="parent" />
              ) : (
                <NodeCard dogId={null} size="lg" onTap={() => {}} />
              )}
              {dam ? (
                <NodeCard dogId={dam.id} size="lg" onTap={(id) => goTo(id, DIR.UP)} generation="parent" />
              ) : (
                <NodeCard dogId={null} size="lg" onTap={() => {}} />
              )}
            </div>

            <svg className="d-connectors d-connectors--down" viewBox="0 0 2 1" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0.5 0 L0.5 0.5 L1 0.5 L1 1" />
              <path d="M1.5 0 L1.5 0.5 L1 0.5" />
            </svg>

            <div className="d-gen-label is-focal">Focal</div>
            <div className="d-focal">
              <FocalCard dog={focal} onPhotoTap={() => setGallery(focal)} />
            </div>

            {/* Below focal — offspring + siblings */}
            <div className="d-bottom">
              <DogCarousel
                ids={focal.offspringIds}
                label="Offspring"
                onTap={(id) => goTo(id, DIR.DOWN)}
                generation="offspring"
                emptyText="No registered offspring."
              />
              <DogCarousel
                ids={focal.siblingIds}
                label="Same litter — siblings"
                onTap={(id) => goTo(id, DIR.LATERAL)}
                generation="sibling"
                emptyText="No littermates recorded."
              />
            </div>
          </div>
        </main>

        {/* Right rail — detail */}
        <aside className="d-right">
          <div className="rail-section">
            <div className="rail-label">Full credentials</div>
            <div className="cred-list">
              {focal.titles?.length > 0 ? focal.titles.map((t, i) => (
                <span key={i} className="badge-title" style={{ margin: 0 }}>{t}</span>
              )) : <span style={{ fontSize: 12, color: "var(--n-500)" }}>No titles yet.</span>}
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-label">Health detail</div>
            <div className="health-list">
              {Object.entries(focal.health || {}).map(([k, h]) => (
                <div key={k} className="health-line">
                  <span className="health-k">{k}</span>
                  <span className="health-v" style={{
                    color: h.status === "ok" ? "var(--success-fg)" :
                           h.status === "warn" ? "var(--warning-fg)" :
                           h.status === "err" ? "var(--error-fg)" : "var(--n-500)"
                  }}>{h.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-label">Latest results</div>
            <div className="results-list">
              {focal.achievements?.length > 0 ? focal.achievements.slice(0, 4).map((a, i) => (
                <div key={i} className="result-item">
                  <span className="result-y">{a.y}</span>
                  <span className="result-t">{a.t}</span>
                </div>
              )) : <span style={{ fontSize: 12, color: "var(--n-500)" }}>No show records.</span>}
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-label">Origin</div>
            <div className="origin-row">
              <span style={{ fontSize: 12, color: "var(--n-500)" }}>Breeder</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{focal.breeder}</span>
            </div>
            <div className="origin-row">
              <span style={{ fontSize: 12, color: "var(--n-500)" }}>Country</span>
              <span style={{ fontSize: 13 }}>{flagFor(focal.country)} {focal.country}</span>
            </div>
            <div className="origin-row">
              <span style={{ fontSize: 12, color: "var(--n-500)" }}>Born</span>
              <span style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}>{focal.born || "—"}</span>
            </div>
          </div>
        </aside>
      </div>

      {gallery && <GalleryModal dog={gallery} onClose={() => setGallery(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDGE CASES PANEL — shown beside live prototype
// ─────────────────────────────────────────────────────────────────────────────
function EdgeCasesPanel() {
  return (
    <div className="edge-panel">
      <div className="edge-head">
        <span className="edge-eyebrow">State C</span>
        <h3>Edge cases</h3>
        <p>Cards adapt when an ancestor record is missing, hidden, or the dog has died.</p>
      </div>

      <div className="edge-grid">
        <div className="edge-item">
          <div className="edge-label">Unknown ancestor</div>
          <NodeCard dogId={null} size="md" onTap={() => {}} />
          <p className="edge-desc">Dashed border, plus-icon CTA. Tap to add the record from a registry import or manual entry.</p>
        </div>
        <div className="edge-item">
          <div className="edge-label">Hidden by owner</div>
          <NodeCard dogId="hidden-1" size="md" onTap={() => {}} />
          <p className="edge-desc">Owner has opted the dog out of public display. Lock glyph, name redacted, no further drill-down.</p>
        </div>
        <div className="edge-item">
          <div className="edge-label">Deceased</div>
          <NodeCard dogId="charmant" size="md" onTap={() => {}} />
          <p className="edge-desc">Small ◌ glyph beside the year-of-birth indicates the dog has died. Year of death appears in the dot.</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP — both viewports side-by-side + edge case panel
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [shareDog, setShareDog] = useStateApp(null);

  return (
    <div className="page-root">
      <header className="page-head">
        <div className="page-eyebrow">DogWorld · Prototype</div>
        <h1>Pedigree Explorer</h1>
        <p className="page-sub">
          Focal navigation. One dog at the center, parents above, grandparents one level higher;
          offspring and siblings reachable below. Tap any card to re-center.
          <strong> Up</strong> means generation back in time,
          <strong> down</strong> means forward,
          <strong> sideways</strong> means same litter.
        </p>
      </header>

      <div className="frames">
        {/* MOBILE */}
        <div className="frame-col">
          <div className="frame-meta">
            <span className="frame-label">Mobile · 375 × 812</span>
            <span className="frame-hint">Tap any card · breadcrumb to walk back</span>
          </div>
          <div className="device-mobile">
            <div className="device-mobile-screen">
              <MobilePedigree onShare={setShareDog} />
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="frame-col">
          <div className="frame-meta">
            <span className="frame-label">Desktop · 1280 × 800</span>
            <span className="frame-hint">↑ ← ↓ → keyboard nav · Esc to go back</span>
          </div>
          <div className="device-desktop">
            <div className="device-desktop-chrome">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="device-url">dogworld.app / pedigree / astor-av-granheim</span>
            </div>
            <div className="device-desktop-screen">
              <DesktopPedigree onShare={setShareDog} />
            </div>
          </div>
        </div>
      </div>

      <EdgeCasesPanel />

      {shareDog && <ShareModal dog={shareDog} onClose={() => setShareDog(null)} />}

      <footer className="page-foot">
        <div>DogWorld · Pedigree Explorer prototype · built on Design System v0.1</div>
        <div>Demo path → Astor → tap Sire → tap "Astor" in breadcrumb → tap offspring (Mira) → tap Share → explore edge cases below</div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
