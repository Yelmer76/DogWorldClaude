// ─────────────────────────────────────────────────────────────────────────────
// LITTER DETAIL — shared components
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateL, useEffect: useEffectL, useRef: useRefL } = React;

// ── Icons ───────────────────────────────────────────────────────────────────
const Li = {
  back:    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="14 6 8 12 14 18"/></svg>,
  share:   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><line x1="8.2" y1="10.8" x2="15.8" y2="7.2"/><line x1="8.2" y1="13.2" x2="15.8" y2="16.8"/></svg>,
  more:    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  chev:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  chevD:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  arrow:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>,
  up:      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 14 12 8 18 14"/></svg>,
  send:    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  cam:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l2-3h4l2 3"/><circle cx="12" cy="13.5" r="3.5"/></svg>,
  scale:   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 10v2M12 10v3M16 10v2"/></svg>,
  msg:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v10H8l-4 4z"/></svg>,
  plus:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check:   <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 12 10 17 19 7"/></svg>,
  close:   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  paw:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="10" r="1.6"/><circle cx="15" cy="10" r="1.6"/><circle cx="6" cy="14" r="1.4"/><circle cx="18" cy="14" r="1.4"/><path d="M9 17.5c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z"/></svg>,
  cal:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>,
  home:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg>,
  doc:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/></svg>,
  link:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 11a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>,
  eye:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L9 21H3v-6z"/></svg>,
};

// ── Photo placeholder ──────────────────────────────────────────────────────
function Lp({ tone = "elkhound", muted = false, label = "", width = "100%", height = 120, radius = 8, style = {}, color = null }) {
  return (
    <div
      className={`lp-photo tone-${tone} ${muted ? "is-muted" : ""}`}
      style={{ width, height, borderRadius: radius, ...(color ? { boxShadow: `inset 0 0 0 3px ${color}` } : {}), ...style }}
    >
      <span>{label}</span>
    </div>
  );
}

// ── Puppy color → CSS color map ────────────────────────────────────────────
const PUPPY_COLORS = {
  red:    "#c45852",
  blue:   "#5a7a9a",
  green:  "#6b8541",
  purple: "#8a6ba0",
  yellow: "#d4a747",
};

// ── Sex pip ─────────────────────────────────────────────────────────────────
function Lsex({ sex, size = 16 }) {
  const isM = sex === "m";
  return (
    <span
      className={`l-sex ${isM ? "is-sire" : "is-dam"}`}
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.6) }}
    >
      {isM ? "♂" : "♀"}
    </span>
  );
}

// ── Status pill (for puppies) ──────────────────────────────────────────────
function PuppyStatusPill({ status, label, large = false }) {
  return (
    <span className={`pup-status pup-st-${status} ${large ? "is-lg" : ""}`}>
      <span className="pup-status-dot"></span>
      {label}
    </span>
  );
}

// ── Application status pill ────────────────────────────────────────────────
function AppStatusPill({ status, label }) {
  return (
    <span className={`app-status app-st-${status}`}>
      <span className="app-status-dot"></span>
      {label}
    </span>
  );
}

// ── Puppy card (used in grids) ─────────────────────────────────────────────
function PuppyCard({ pup, onTap, draggable = false, onDragStart, kind = "breeder" }) {
  const color = PUPPY_COLORS[pup.color];
  const isPublic = kind === "public";
  return (
    <button
      className={`pup-card pup-st-${pup.status} ${isPublic ? "is-public" : ""}`}
      onClick={() => onTap && onTap(pup)}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="pup-photo-wrap">
        <Lp tone={pup.tone} height={120} radius={6} label={pup.name.toUpperCase()} color={color} />
        <span className="pup-collar" style={{ background: color }}></span>
      </div>
      <div className="pup-body">
        <div className="pup-status-row">
          <PuppyStatusPill status={pup.status} label={pup.statusLabel} />
        </div>
        <div className="pup-id">
          {pup.colorLabel} {pup.sex === "m" ? "hannvalp" : "tispevalp"}
        </div>
        <div className="pup-name">«{pup.name}»</div>
        {!isPublic && (
          <div className="pup-meta">
            <span className="pup-weight">{pup.weight} kg</span>
            <span className="pup-trend">{Li.up} <span>{pup.delta}</span></span>
          </div>
        )}
        {isPublic && (
          <div className="pup-meta">
            <span className="pup-weight">{pup.weight} kg · {pup.weight > 3 ? "kraftig" : "normal vekt"}</span>
          </div>
        )}
        {pup.assignedTo && !isPublic && (
          <div className="pup-assigned">→ {pup.assignedTo}</div>
        )}
      </div>
    </button>
  );
}

// ── Application card (compact, in pipeline strip) ──────────────────────────
function AppCardCompact({ app, onTap }) {
  return (
    <button className="appc-card" onClick={() => onTap(app)}>
      <div className="appc-head">
        <Avatar tone={app.avatarTone} initials={app.who.split(/\s+/).slice(-1)[0].slice(0, 2)} size={32} />
        <div className="appc-headtext">
          <div className="appc-who">{app.who}</div>
          <div className="appc-city">{app.city}</div>
        </div>
        <AppStatusPill status={app.status} label={app.statusLabel} />
      </div>
      <div className="appc-summary">{app.summary}</div>
      <div className="appc-foot">{app.received}</div>
    </button>
  );
}

// ── Application card (full, in list view) ──────────────────────────────────
function AppCardFull({ app, onTap, onReject }) {
  return (
    <article className={`appf-card appf-st-${app.status}`}>
      <header className="appf-head">
        <Avatar tone={app.avatarTone} initials={app.who.split(/\s+/).slice(-1)[0].slice(0, 2)} size={40} />
        <div className="appf-head-text">
          <div className="appf-who">{app.who}</div>
          <div className="appf-meta">{app.city} · søkte {app.received}</div>
        </div>
        <AppStatusPill status={app.status} label={app.statusLabel} />
      </header>
      <p className="appf-summary">"{app.summary}"</p>
      <div className="appf-match">
        {app.match.map((m, i) => (
          <span key={i} className={`appf-match-row s-${m.state}`}>
            <span className={`appf-match-dot s-${m.state}`}></span>
            {m.k}
          </span>
        ))}
      </div>
      <footer className="appf-foot">
        <button className="l-btn l-btn-secondary l-btn-sm" onClick={() => onReject && onReject(app)}>Avvis</button>
        <button className="l-btn l-btn-primary l-btn-sm" onClick={() => onTap(app)}>Åpne samtale {Li.arrow}</button>
      </footer>
    </article>
  );
}

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ tone = "warm", initials = "", size = 32 }) {
  const colors = {
    warm: { bg: "#e8d8c0", fg: "#7a5a30" },
    info: { bg: "#dde4ec", fg: "#41617f" },
    ok:   { bg: "#dde5dc", fg: "#3d6b46" },
    muted:{ bg: "#e2dfd5", fg: "#7a766a" },
  };
  const c = colors[tone] || colors.warm;
  return (
    <span
      className="l-avatar"
      style={{
        width: size, height: size,
        background: c.bg, color: c.fg,
        fontSize: Math.max(11, size * 0.4),
      }}
    >
      {initials.toUpperCase()}
    </span>
  );
}

// ── Timeline strip (for litter stages) ──────────────────────────────────────
function TimelineStrip({ stages, current, sticky }) {
  const currentIdx = stages.findIndex(s => s.id === current);
  return (
    <div className={`l-timeline ${sticky ? "is-sticky" : ""}`}>
      <div className="l-timeline-track">
        {stages.map((s, i) => {
          const state = i < currentIdx ? "done" : i === currentIdx ? "current" : "future";
          return (
            <React.Fragment key={s.id}>
              <div className={`l-timeline-stage is-${state}`}>
                <span className="l-timeline-dot"></span>
                <span className="l-timeline-label">{s.short}</span>
                {i === currentIdx && <span className="l-timeline-current">Uke 4</span>}
              </div>
              {i < stages.length - 1 && <div className={`l-timeline-line ${i < currentIdx ? "is-done" : ""}`}></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── Chat bubble (conversation thread) ──────────────────────────────────────
function ChatBubble({ msg, applicantName }) {
  const isBreeder = msg.from === "breeder";
  return (
    <div className={`l-bubble-row ${isBreeder ? "is-breeder" : "is-applicant"}`}>
      {!isBreeder && <Avatar tone="warm" initials={applicantName.split(/\s+/).slice(-1)[0].slice(0, 2)} size={28} />}
      <div className={`l-bubble ${isBreeder ? "is-breeder" : "is-applicant"}`}>
        <p className="l-bubble-text">{msg.t}</p>
        {msg.attachment && (
          <div className="l-bubble-attach">
            <Lp tone="dam" height={120} radius={6} label={msg.attachment.label} />
          </div>
        )}
        <div className="l-bubble-time">{msg.at}</div>
      </div>
    </div>
  );
}

// ── Puppy assignment modal ─────────────────────────────────────────────────
function PuppyAssignModal({ open, app, availablePuppies, onClose, onConfirm }) {
  const [selected, setSelected] = useStateL(null);
  useEffectL(() => { if (open) setSelected(null); }, [open]);
  if (!open || !app) return null;

  const sel = availablePuppies.find(p => p.id === selected);
  return (
    <div className="l-modal-back" onClick={onClose}>
      <div className="l-modal" onClick={(e) => e.stopPropagation()}>
        <header className="l-modal-head">
          <div>
            <div className="l-modal-eyebrow">Tilby en valp</div>
            <h3>Tilby {app.who} en valp</h3>
            <p>Familien får 7 dager på å bestemme. Et depositum på <strong>5 000 kr</strong> reserverer valpen.</p>
          </div>
          <button className="l-modal-close" onClick={onClose}>{Li.close}</button>
        </header>

        {!sel ? (
          <>
            <div className="l-modal-body">
              <div className="l-assign-grid">
                {availablePuppies.map(p => (
                  <button key={p.id} className={`l-assign-card ${selected === p.id ? "is-picked" : ""}`} onClick={() => setSelected(p.id)}>
                    <Lp tone={p.tone} height={92} radius={6} label={p.name.toUpperCase()} color={PUPPY_COLORS[p.color]} />
                    <div className="l-assign-body">
                      <div className="l-assign-collar">
                        <span className="l-assign-collar-dot" style={{ background: PUPPY_COLORS[p.color] }}></span>
                        {p.colorLabel}
                      </div>
                      <div className="l-assign-id">«{p.name}»</div>
                      <div className="l-assign-meta">
                        <Lsex sex={p.sex} size={12} /> {p.weight} kg
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {availablePuppies.length === 0 && (
                <div className="l-assign-empty">Ingen tilgjengelige valper akkurat nå.</div>
              )}
            </div>
            <footer className="l-modal-foot">
              <button className="l-btn l-btn-secondary" onClick={onClose}>Avbryt</button>
            </footer>
          </>
        ) : (
          <>
            <div className="l-modal-body">
              <div className="l-assign-preview">
                <Lp tone={sel.tone} height={120} radius={8} label={sel.name.toUpperCase()} color={PUPPY_COLORS[sel.color]} />
                <div className="l-assign-preview-text">
                  <div className="l-assign-collar">
                    <span className="l-assign-collar-dot" style={{ background: PUPPY_COLORS[sel.color] }}></span>
                    {sel.colorLabel} {sel.sex === "m" ? "hannvalp" : "tispevalp"}
                  </div>
                  <h4>«{sel.name}»</h4>
                  <p>Du tilbyr <strong>{app.who}</strong> denne valpen. De får <strong>7 dager</strong> til å bestemme. Depositum 5 000 kr reserverer valpen frem til levering uke 28.</p>
                </div>
              </div>
            </div>
            <footer className="l-modal-foot">
              <button className="l-btn l-btn-secondary" onClick={() => setSelected(null)}>Velg en annen</button>
              <button className="l-btn l-btn-warm" onClick={() => onConfirm(sel)}>
                Tilby valpen {Li.arrow}
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

// ── Confirmation pulse (after action) ──────────────────────────────────────
function ActionPulse({ message, onDone }) {
  useEffectL(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div className="l-pulse-host">
      <div className="l-pulse">
        <span className="l-pulse-check">{Li.check}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}

// ── View toggle (top of prototype) ─────────────────────────────────────────
function ViewToggle({ value, options, onChange, label }) {
  return (
    <div className="l-toggle-row">
      <span className="l-toggle-label">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          className={`l-toggle-btn ${value === o.id ? "is-active" : ""}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, {
  Li, Lp, PUPPY_COLORS, Lsex,
  PuppyStatusPill, AppStatusPill, PuppyCard,
  AppCardCompact, AppCardFull, Avatar,
  TimelineStrip, ChatBubble, PuppyAssignModal,
  ActionPulse, ViewToggle,
});
