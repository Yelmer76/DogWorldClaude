// ─────────────────────────────────────────────────────────────────────────────
// TODAY DASHBOARD — components
// All visual atoms used by mobile + desktop layouts.
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateT, useEffect: useEffectT, useRef: useRefT } = React;

// ── Icons ───────────────────────────────────────────────────────────────────
const Icon = {
  syringe: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="20" y2="4" />
      <line x1="16" y1="4" x2="20" y2="8" />
      <path d="M8.5 15.5L13 11l4 4-4.5 4.5a2 2 0 0 1-2.8 0L8 18a2 2 0 0 1 0-2.8z" />
      <line x1="13" y1="11" x2="17" y2="7" />
      <line x1="3.5" y1="20.5" x2="8" y2="16" />
    </svg>
  ),
  paw: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="9" r="1.6" />
      <circle cx="17" cy="9" r="1.6" />
      <circle cx="5" cy="14" r="1.4" />
      <circle cx="19" cy="14" r="1.4" />
      <path d="M9 17.5c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" />
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <polyline points="3 8 12 14 21 8" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5h8v4a4 4 0 0 1-8 0z" />
      <path d="M8 5H5v2a3 3 0 0 0 3 3" />
      <path d="M16 5h3v2a3 3 0 0 1-3 3" />
      <path d="M12 13v3" />
      <path d="M9 19h6" />
      <path d="M10 16h4" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  ),
  newspaper: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="14" height="14" rx="2" />
      <path d="M17 9h3v8a2 2 0 0 1-2 2" />
      <line x1="6" y1="9" x2="14" y2="9" />
      <line x1="6" y1="12" x2="14" y2="12" />
      <line x1="6" y1="15" x2="11" y2="15" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 1 1 12 0v5l1.5 3h-15L6 13z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l2-3h4l2 3" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V5a1 1 0 0 1 1-1h3" />
      <path d="M20 8V5a1 1 0 0 0-1-1h-3" />
      <path d="M4 16v3a1 1 0 0 0 1 1h3" />
      <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <polyline points="14 3 14 8 19 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 10v2M12 10v3M16 10v2" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l6 6L9 21H3v-6z" />
      <line x1="14" y1="4" x2="20" y2="10" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  weatherRain: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13a4 4 0 0 1 8-0.5A3 3 0 0 1 19 16H7a3 3 0 0 1-1-3z" />
      <line x1="9" y1="19" x2="8" y2="21" />
      <line x1="13" y1="19" x2="12" y2="21" />
      <line x1="17" y1="19" x2="16" y2="21" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M12 2l2.4 6.4L21 11l-6 4.6L17 22l-5-3.5L7 22l2-6.4-6-4.6 6.6-2.6z" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="16" y2="16" />
    </svg>
  ),
};

// ── Tab bar icons ───────────────────────────────────────────────────────────
const TabIcons = {
  hjem: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
    </svg>
  ),
  hunder: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="10" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M5 19c0-2.8 1.8-5 4-5s4 2.2 4 5" />
      <path d="M14 19c0-1.6 1.3-3.5 3-3.5s3 1.5 3 3.5" />
    </svg>
  ),
  kull: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="13" rx="2" />
      <path d="M9 6V4M15 6V4M4 10h16" />
    </svg>
  ),
  kjopere: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16v10H8l-4 4z" />
    </svg>
  ),
  mer: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="19" cy="12" r="1.4" />
    </svg>
  ),
};

// ── Photo placeholder ───────────────────────────────────────────────────────
function PhotoT({ size = 40, label = "", round = true, style = {} }) {
  return (
    <div
      className="photo-t"
      style={{
        width: size,
        height: size,
        borderRadius: round ? "50%" : 8,
        fontSize: Math.max(9, size * 0.18),
        ...style,
      }}
    >
      {label}
    </div>
  );
}

// ── Header ──────────────────────────────────────────────────────────────────
function MobileHeader({ kennel, onKennelTap, onBellTap, unread }) {
  return (
    <header className="m-head">
      <button className="m-kennel" onClick={onKennelTap}>
        <div className="m-kennel-mark">G</div>
        <div className="m-kennel-meta">
          <div className="m-kennel-name">{kennel.name}</div>
          <div className="m-kennel-karma">
            <span className="karma-chip"><span className="karma-dot"></span>{kennel.karma.tier}</span>
          </div>
        </div>
      </button>
      <div className="m-head-right">
        <button className="m-head-icon" onClick={onBellTap} aria-label="Varsler">
          {Icon.bell}
          {unread > 0 && <span className="m-head-badge">{unread}</span>}
        </button>
        <PhotoT size={32} label="O" />
      </div>
    </header>
  );
}

// ── Hero strip ──────────────────────────────────────────────────────────────
function HeroStrip({ greeting, dateLine, weather }) {
  return (
    <div className="m-hero">
      <div className="m-hero-text">
        <div className="m-hero-greeting">{greeting}</div>
        <div className="m-hero-date">{dateLine}</div>
      </div>
      <div className="m-hero-weather">
        <span className="m-weather-icon">{Icon.weatherRain}</span>
        <div className="m-weather-text">
          <div className="m-weather-temp">{weather.temp}</div>
          <div className="m-weather-note">{weather.note}</div>
        </div>
      </div>
    </div>
  );
}

// ── Karma strip ─────────────────────────────────────────────────────────────
function KarmaStrip({ delta, reason, onTap, celebration = false }) {
  return (
    <div className={`m-karma ${celebration ? "is-celebration" : ""}`} onClick={onTap} role="button">
      {celebration && <Confetti />}
      <span className="m-karma-icon">{Icon.spark}</span>
      <span className="m-karma-text">
        <strong>+{delta} karma</strong> — du fullførte {reason} 🎉
      </span>
      <span className="m-karma-chev">{Icon.chevron}</span>
    </div>
  );
}

// ── Karma celebration full panel ────────────────────────────────────────────
function KarmaCelebration({ onTap }) {
  return (
    <div className="m-karma-big" onClick={onTap}>
      <Confetti />
      <div className="m-karma-big-badge">
        <div className="m-karma-tier-pill"><span className="karma-dot"></span>Sølv-tier</div>
      </div>
      <h3 className="m-karma-big-title">Velkommen til Sølv-tier</h3>
      <p className="m-karma-big-sub">Synligheten din i søk øker nå. Du ligger an til Gull innen mars 2027.</p>
      <div className="m-karma-progress">
        <div className="m-karma-progress-bar" style={{ width: "64%" }}></div>
      </div>
      <div className="m-karma-progress-meta">
        <span>Sølv</span>
        <span>64 % til Gull</span>
      </div>
    </div>
  );
}

// ── Confetti — small CSS-only burst ─────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 14 });
  const colors = ["#3F5A55", "#1C3245", "#c98a27", "#a8504a", "#5a7a9a", "#c0789a"];
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 7 + 5) % 95}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i * 73) % 800}ms`,
            transform: `rotate(${(i * 47) % 360}deg)`,
          }}
        ></span>
      ))}
    </div>
  );
}

// ── Feed card — generic ─────────────────────────────────────────────────────
function FeedCard({ card, expanded, onToggleExpand, onSnooze, onDone, onPrimary }) {
  const stripeClass = `stripe-${card.kind}`;
  const iconBgClass = `feed-icon ${card.kind}`;
  return (
    <article className={`feed-card ${stripeClass} ${expanded ? "is-expanded" : ""}`}>
      <div className="feed-stripe"></div>
      <button className="feed-main" onClick={onToggleExpand}>
        <div className={iconBgClass}>{Icon[card.icon]}</div>
        <div className="feed-body">
          <h3 className="feed-headline">{card.headline}</h3>
          <p className="feed-sub">{card.sub}</p>
        </div>
        <span className="feed-chev" data-expanded={expanded}>{Icon.chevron}</span>
      </button>

      {expanded && (
        <div className="feed-expand">
          <p className="feed-expand-summary">{card.expand?.summary}</p>
          {card.expand?.detail && (
            <dl className="feed-expand-kv">
              {card.expand.detail.map(([k, v], i) => (
                <React.Fragment key={i}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
          )}
        </div>
      )}

      <div className="feed-actions">
        {(card.actions || [card.action]).filter(Boolean).map((a, i) => (
          <button
            key={i}
            className={`btn ${a.primary ? "btn--primary" : "btn--secondary"}`}
            onClick={(e) => { e.stopPropagation(); onPrimary && onPrimary(a); }}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="feed-swipe">
        <button className="swipe-btn snooze" onClick={onSnooze}>Slumre</button>
        <button className="swipe-btn done" onClick={onDone}>Ferdig</button>
      </div>
    </article>
  );
}

// ── Litter hero card — special variant with puppy strip + sparkline ─────────
function LitterHeroCard({ card, expanded, onToggleExpand, onPrimary }) {
  return (
    <article className={`feed-card stripe-hero-litter litter-hero ${expanded ? "is-expanded" : ""}`}>
      <div className="feed-stripe"></div>
      <button className="feed-main litter-main" onClick={onToggleExpand}>
        <div className="feed-icon hero-litter">{Icon.paw}</div>
        <div className="feed-body">
          <h3 className="feed-headline">{card.headline}</h3>
          <p className="feed-sub">{card.sub}</p>
          <div className="litter-pup-strip">
            {card.puppies.map((p, i) => (
              <div key={i} className={`litter-pup ${p.sex === "m" ? "is-sire" : "is-dam"}`} title={p.name}>
                <PhotoT size={32} label={p.name.slice(0, 1)} round style={{ borderRadius: "50%" }} />
                <span className="litter-pup-weight">{p.weight}</span>
              </div>
            ))}
          </div>
        </div>
        <span className="feed-chev" data-expanded={expanded}>{Icon.chevron}</span>
      </button>

      {expanded && (
        <div className="feed-expand">
          <p className="feed-expand-summary">{card.expand?.summary}</p>
          <div className="litter-chart-wrap">
            <div className="litter-chart-head">
              <span>Vektutvikling · siste 7 dager (kg)</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--n-500)" }}>0.4 → 3.1</span>
            </div>
            <LitterChart puppies={card.puppies} />
          </div>
          <div className="litter-tasks">
            <div className="litter-tasks-head">I dag</div>
            {card.expand?.tasksToday?.map((t, i) => (
              <div key={i} className="litter-task">
                <span className={`task-pip ${i === 1 ? "is-done" : ""}`}></span>
                <span className={i === 1 ? "task-done" : ""}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="feed-actions">
        <button className="btn btn--primary" onClick={(e) => { e.stopPropagation(); onPrimary && onPrimary(card.action); }}>
          {card.action.label}
        </button>
      </div>
    </article>
  );
}

// ── Litter chart — 5 sparklines ─────────────────────────────────────────────
function LitterChart({ puppies }) {
  const W = 280, H = 80, PAD = 8;
  const maxV = Math.max(...puppies.flatMap((p) => p.trend));
  const len = puppies[0].trend.length;
  const x = (i) => PAD + (i / (len - 1)) * (W - PAD * 2);
  const y = (v) => H - PAD - (v / maxV) * (H - PAD * 2);

  return (
    <svg className="litter-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {/* grid */}
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--n-200)" strokeWidth="1" />
      <line x1={PAD} y1={PAD} x2={W - PAD} y2={PAD} stroke="var(--n-100)" strokeWidth="1" strokeDasharray="2 3" />
      {puppies.map((p, pi) => {
        const path = p.trend.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(v)}`).join(" ");
        const color = p.sex === "m" ? "#5a7a9a" : "#c0789a";
        const opacity = 0.55 + 0.1 * (pi % 3);
        return (
          <g key={pi}>
            <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity={opacity} />
            <circle cx={x(len - 1)} cy={y(p.trend[len - 1])} r="2.5" fill={color} opacity={opacity} />
          </g>
        );
      })}
    </svg>
  );
}

// ── Stats strip ─────────────────────────────────────────────────────────────
function StatStrip({ stats, onTap }) {
  return (
    <div className="m-stats">
      {stats.map((s) => (
        <button key={s.id} className="m-stat" onClick={() => onTap(s.id)}>
          <div className="m-stat-value">{s.value}</div>
          <div className="m-stat-label">{s.label}</div>
        </button>
      ))}
    </div>
  );
}

// ── FAB ─────────────────────────────────────────────────────────────────────
function CameraFAB({ onTap, pulse }) {
  return (
    <button className={`fab-camera ${pulse ? "is-pulse" : ""}`} onClick={onTap} aria-label="Skann eller logg">
      {Icon.camera}
    </button>
  );
}

// ── Bottom sheet (FAB options) ──────────────────────────────────────────────
function BottomSheet({ open, actions, onSelect, onClose }) {
  if (!open) return null;
  return (
    <div className="sheet-back" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab"></div>
        <h4 className="sheet-title">Legg til</h4>
        <div className="sheet-list">
          {actions.map((a) => (
            <button key={a.id} className="sheet-opt" onClick={() => onSelect(a)}>
              <span className="sheet-opt-icon">{Icon[a.icon]}</span>
              <span className="sheet-opt-label">{a.label}</span>
              <span className="sheet-opt-chev">{Icon.chevron}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bottom tab bar ──────────────────────────────────────────────────────────
function TabBar({ active = "hjem", onTap }) {
  const tabs = [
    { id: "hjem",    label: "Hjem",    icon: TabIcons.hjem },
    { id: "hunder",  label: "Hunder",  icon: TabIcons.hunder },
    { id: "kull",    label: "Kull",    icon: TabIcons.kull },
    { id: "kjopere", label: "Kjøpere", icon: TabIcons.kjopere, badge: 4 },
    { id: "mer",     label: "Mer",     icon: TabIcons.mer },
  ];
  return (
    <nav className="m-tabbar" aria-label="Hovedmeny">
      {tabs.map((t) => (
        <button key={t.id} className={`m-tab ${t.id === active ? "is-active" : ""}`} onClick={() => onTap(t.id)}>
          <span className="m-tab-icon">{t.icon}</span>
          {t.badge && <span className="m-tab-badge">{t.badge}</span>}
          <span className="m-tab-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ── Notification overlay ────────────────────────────────────────────────────
function NotificationOverlay({ open, items, onClose }) {
  if (!open) return null;
  return (
    <div className="notif-back" onClick={onClose}>
      <div className="notif-panel" onClick={(e) => e.stopPropagation()}>
        <header className="notif-head">
          <h4>Varsler</h4>
          <button className="notif-clear" onClick={onClose}>Lukk</button>
        </header>
        <div className="notif-list">
          {items.map((n) => (
            <div key={n.id} className="notif-item">
              <span className="notif-dot"></span>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-sub">{n.sub}</div>
              </div>
              <div className="notif-time">{n.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty state ─────────────────────────────────────────────────────────────
function EmptyToday() {
  return (
    <div className="m-empty">
      <div className="m-empty-art">
        <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--forest-500)" }}>
          <circle cx="40" cy="40" r="32" strokeDasharray="2 4" opacity="0.4" />
          <circle cx="28" cy="34" r="2.2" />
          <circle cx="52" cy="34" r="2.2" />
          <path d="M30 48 Q40 56 50 48" />
        </svg>
      </div>
      <h3 className="m-empty-title">Ingen hendelser i dag</h3>
      <p className="m-empty-sub">Kennelen din har ro. Alle vaksiner, prøver og frister er innenfor — godt jobbet.</p>

      <div className="m-empty-suggest">
        <div className="m-empty-suggest-head">Vil du gjøre noe nyttig?</div>
        <div className="m-empty-suggest-actions">
          <button className="btn btn--primary">Legg til hund</button>
          <button className="btn btn--secondary">Registrer kull</button>
        </div>
      </div>
    </div>
  );
}

// ── Toast (after action) ────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffectT(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div className="toast-host">
      <div className="toast">
        <span className="toast-dot"></span>
        <span>{message}</span>
      </div>
    </div>
  );
}

// Expose
Object.assign(window, {
  Icon, TabIcons, PhotoT,
  MobileHeader, HeroStrip,
  KarmaStrip, KarmaCelebration, Confetti,
  FeedCard, LitterHeroCard, LitterChart,
  StatStrip, CameraFAB, BottomSheet, TabBar,
  NotificationOverlay, EmptyToday, Toast,
});
