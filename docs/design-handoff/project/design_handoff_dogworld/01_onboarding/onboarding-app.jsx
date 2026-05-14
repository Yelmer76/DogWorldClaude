// ─────────────────────────────────────────────────────────────────────────────
// ONBOARDING — App: flow state, mobile + desktop layouts, state switcher
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateOA, useEffect: useEffectOA, useCallback: useCallbackOA } = React;

function useFlow(initial = "welcome") {
  const [screen, setScreen] = useStateOA(initial);
  const idx = flowScreens.findIndex(s => s.id === screen);
  const next = () => {
    const i = flowScreens.findIndex(s => s.id === screen);
    if (i < flowScreens.length - 1) setScreen(flowScreens[i + 1].id);
  };
  const back = () => {
    const i = flowScreens.findIndex(s => s.id === screen);
    if (i > 0) setScreen(flowScreens[i - 1].id);
  };
  const goto = (id) => setScreen(id);
  return { screen, idx, next, back, goto };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED SCREEN ROUTER
// ─────────────────────────────────────────────────────────────────────────────
function ScreenContent({ screen, goto, reviewVariant }) {
  switch (screen) {
    case "welcome":
      return <WelcomeScreen onNext={() => goto("email")} onLogin={() => goto("email")} />;
    case "email":
      return <EmailScreen onNext={() => goto("basics")} onBack={() => goto("welcome")} />;
    case "basics":
      return <BasicsScreen onNext={() => goto("wedge")} onBack={() => goto("email")} />;
    case "wedge":
      return <WedgeScreen
        onMigrate={() => goto("url")}
        onScratch={() => goto("template")}
        onBack={() => goto("basics")}
      />;
    case "url":
      return <UrlScreen onNext={() => goto("crawl")} onBack={() => goto("wedge")} />;
    case "crawl":
      return <CrawlScreen onDone={() => goto("review")} onBack={() => goto("url")} />;
    case "review":
      return <ReviewScreen
        onNext={() => goto("template")}
        onBack={() => goto("crawl")}
        variant={reviewVariant}
      />;
    case "template":
      return <TemplateScreen onNext={() => goto("domain")} onBack={() => goto("review")} />;
    case "domain":
      return <DomainScreen onNext={() => goto("published")} onBack={() => goto("template")} />;
    case "published":
      return <PublishedScreen
        onDashboard={() => window.parent.postMessage({ navigate: "Today Dashboard.html" }, "*")}
        onBack={() => goto("domain")}
      />;
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE
// ─────────────────────────────────────────────────────────────────────────────
function MobileOnboarding({ screen, goto, reviewVariant }) {
  return (
    <div className="mob-shell-o">
      <ProgressDots active={screen} onJump={goto} />
      <div className="mob-screen-host" key={screen}>
        <ScreenContent screen={screen} goto={goto} reviewVariant={reviewVariant} />
      </div>
    </div>
  );
}

function ProgressDots({ active, onJump }) {
  const activeIdx = flowScreens.findIndex(s => s.id === active);
  return (
    <div className="progress-dots" role="navigation" aria-label="Fremgang">
      {flowScreens.map((s, i) => (
        <button
          key={s.id}
          className={`pdot ${i === activeIdx ? "is-active" : ""} ${i < activeIdx ? "is-done" : ""}`}
          onClick={() => onJump(s.id)}
          aria-label={s.label}
          title={s.label}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — sidebar stepper + screen pane
// ─────────────────────────────────────────────────────────────────────────────
function DesktopOnboarding({ screen, goto, reviewVariant }) {
  return (
    <div className="dsk-shell-o">
      <aside className="dsk-side-o">
        <div className="dsk-brand-o">
          <div className="dsk-brand-mark">D</div>
          <div>
            <div className="dsk-brand-name">DogWorld<sup>(tmp)</sup></div>
            <div className="dsk-brand-sub">Førstegangs oppsett</div>
          </div>
        </div>
        <ol className="dsk-stepper">
          {flowScreens.map((s, i) => {
            const activeIdx = flowScreens.findIndex(x => x.id === screen);
            const state = i < activeIdx ? "done" : i === activeIdx ? "current" : "future";
            return (
              <li key={s.id} className={`dsk-step is-${state}`}>
                <button onClick={() => goto(s.id)} className="dsk-step-btn">
                  <span className="dsk-step-num">{state === "done" ? I.check : i + 1}</span>
                  <span className="dsk-step-label">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="dsk-side-foot">
          <div className="dsk-help">
            Trenger du hjelp? &nbsp;
            <a href="#" onClick={(e) => e.preventDefault()}>support@dogworldtmp.no</a>
          </div>
          <div className="dsk-est">Estimert tid igjen: 6 min</div>
        </div>
      </aside>

      <main className="dsk-main-o" key={screen}>
        <ScreenContent screen={screen} goto={goto} reviewVariant={reviewVariant} />
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const mobileFlow = useFlow("welcome");
  const desktopFlow = useFlow("welcome");
  const [reviewVariant, setReviewVariant] = useStateOA("default");

  // Jump shortcut — both viewports together
  const jumpBoth = (id) => {
    mobileFlow.goto(id);
    desktopFlow.goto(id);
  };

  return (
    <div className="page-root-o">
      <header className="page-head-o">
        <div className="page-eyebrow">DogWorld · Prototype</div>
        <h1>Onboarding &amp; Migration</h1>
        <p className="page-sub">
          The first 10 minutes. Marit pastes her old Wix URL, watches the AI extract her 12 dogs,
          confirms each one, picks a template, and goes live. The wedge moment that converts skeptics.
        </p>

        <div className="ob-controls">
          <div className="ob-jump-row">
            <span className="ob-jump-label">Hopp til:</span>
            {flowScreens.map((s, i) => {
              const active = mobileFlow.screen === s.id || desktopFlow.screen === s.id;
              return (
                <button
                  key={s.id}
                  className={`ob-jump-btn ${active ? "is-active" : ""}`}
                  onClick={() => jumpBoth(s.id)}
                >
                  <span className="ob-jump-num">{i + 1}</span>
                  {s.short}
                </button>
              );
            })}
          </div>

          {(mobileFlow.screen === "review" || desktopFlow.screen === "review") && (
            <div className="ob-jump-row ob-jump-row-sub">
              <span className="ob-jump-label">Review state:</span>
              {[
                { id: "default",       label: "A · Default (mix of confidence)" },
                { id: "all-confirmed", label: "B · Alle bekreftet" },
                { id: "expanded",      label: "C · Kort utvidet (Bobby)" },
                { id: "empty",         label: "D · Tom uthenting" },
              ].map((v) => (
                <button
                  key={v.id}
                  className={`ob-jump-btn ${reviewVariant === v.id ? "is-active" : ""}`}
                  onClick={() => setReviewVariant(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="frames-o">
        {/* MOBILE */}
        <div className="frame-col-o">
          <div className="frame-meta-o">
            <span className="frame-label-o">Mobile · 375 × 812</span>
            <span className="frame-hint-o">{flowScreens.find(s => s.id === mobileFlow.screen)?.label}</span>
          </div>
          <div className="device-mobile-o">
            <div className="device-mobile-screen-o">
              <MobileOnboarding
                screen={mobileFlow.screen}
                goto={mobileFlow.goto}
                reviewVariant={reviewVariant}
              />
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="frame-col-o">
          <div className="frame-meta-o">
            <span className="frame-label-o">Desktop · 1280 × 800</span>
            <span className="frame-hint-o">{flowScreens.find(s => s.id === desktopFlow.screen)?.label}</span>
          </div>
          <div className="device-desktop-o">
            <div className="device-desktop-chrome-o">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="device-url">dogworldtmp.no / kom-i-gang</span>
            </div>
            <div className="device-desktop-screen-o">
              <DesktopOnboarding
                screen={desktopFlow.screen}
                goto={desktopFlow.goto}
                reviewVariant={reviewVariant}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="page-foot-o">
        <div>DogWorld · Onboarding · built on Design System v0.1</div>
        <div>Demo: 1 Welcome → 2 Email (sent state) → 3 Basics → 4 Wedge (Ja) → 5 URL → 6 Crawl → 7 Review → 8 Template → 9 Domain → 10 Live</div>
      </footer>
    </div>
  );
}

const rootO = ReactDOM.createRoot(document.getElementById("root"));
rootO.render(<App />);
