// ─────────────────────────────────────────────────────────────────────────────
// DOG DETAIL — components
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateD, useEffect: useEffectD, useRef: useRefD, useCallback: useCallbackD, useLayoutEffect: useLayoutEffectD } = React;

// ── Icons ───────────────────────────────────────────────────────────────────
const IconD = {
  back: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14 6 8 12 14 18" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" />
      <line x1="8.2" y1="10.8" x2="15.8" y2="7.2" />
      <line x1="8.2" y1="13.2" x2="15.8" y2="16.8" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
    </svg>
  ),
  eyeOn: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7c2.4 0 4.4 1 6 2.2" />
      <path d="M22 12s-3.5 7-10 7c-2.4 0-4.4-1-6-2.2" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  ),
  chev: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l6 6L9 21H3v-6z" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <polyline points="15 4 20 4 20 9" />
      <polyline points="9 20 4 20 4 15" />
      <line x1="20" y1="4" x2="14" y2="10" />
      <line x1="4" y1="20" x2="10" y2="14" />
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
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 10v2M12 10v3M16 10v2" />
    </svg>
  ),
  editPen: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l6 6L9 21H3v-6z" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="20" height="20" rx="2" />
      <polyline points="9 12 14 7 19 12" />
      <line x1="14" y1="7" x2="14" y2="18" />
    </svg>
  ),
  wreath: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7" />
      <path d="M5 12c1-3 4-4 7-3" /><path d="M19 12c-1-3-4-4-7-3" />
      <path d="M12 4v4" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><circle cx="12" cy="8.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </svg>
  ),
};

// ── Photo placeholder (Astor-themed) ────────────────────────────────────────
function PhotoBox({ tone = "default", muted = false, label, width = "100%", height = 280, radius = 0, style = {} }) {
  return (
    <div
      className={`photo-box tone-${tone} ${muted ? "is-muted" : ""}`}
      style={{ width, height, borderRadius: radius, ...style }}
    >
      <span className="photo-box-label">{label}</span>
    </div>
  );
}

// ── Sex chip ────────────────────────────────────────────────────────────────
function SexPip({ sex, size = 14 }) {
  const is_m = sex === "m";
  return (
    <span
      className={`sex-pip ${is_m ? "is-sire" : "is-dam"}`}
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.6) }}
    >
      {is_m ? "♂" : "♀"}
    </span>
  );
}

// ── Status pill ─────────────────────────────────────────────────────────────
function StatusPill({ status, label, onTap, readOnly = false }) {
  const cls = `status-pill status-${status} ${readOnly ? "is-readonly" : ""}`;
  const isMem = status === "memorial";
  return (
    <button className={cls} onClick={readOnly ? undefined : onTap} disabled={readOnly}>
      {isMem ? IconD.wreath : <span className={`status-dot s-${status}`}></span>}
      <span>{label}</span>
      {!readOnly && <span className="status-chev">{IconD.chev}</span>}
    </button>
  );
}

// ── Nav bar (mobile) ────────────────────────────────────────────────────────
function NavBar({ scrolled, title, onBack, onShare, onMore }) {
  return (
    <header className={`nav-bar ${scrolled ? "is-scrolled" : ""}`}>
      <button className="nav-icon" onClick={onBack} aria-label="Tilbake">{IconD.back}</button>
      <div className="nav-title" style={{ opacity: scrolled ? 1 : 0 }}>{title}</div>
      <div className="nav-right">
        <button className="nav-icon" onClick={onShare} aria-label="Del">{IconD.share}</button>
        <button className="nav-icon" onClick={onMore} aria-label="Mer">{IconD.more}</button>
      </div>
    </header>
  );
}

// ── Hero photo block ────────────────────────────────────────────────────────
function HeroBlock({ dog, parallaxY = 0, onTapPhoto, onStatusTap, sparse, memorial }) {
  if (sparse) {
    return (
      <button className="hero-upload" onClick={onTapPhoto}>
        <div className="hero-upload-inner">
          <span className="hero-upload-icon">{IconD.upload}</span>
          <span className="hero-upload-text">Last opp første bilde</span>
          <span className="hero-upload-sub">eller dra og slipp her</span>
        </div>
      </button>
    );
  }
  return (
    <div className={`hero-photo ${memorial ? "is-memorial" : ""}`}>
      <button className="hero-photo-btn" onClick={onTapPhoto} aria-label="Åpne galleri">
        <PhotoBox tone="elkhound" muted={memorial} label="ASTOR · COVER" height="100%" />
      </button>
      <div className="hero-gradient" aria-hidden="true"></div>
      <div className="hero-overlay">
        <StatusPill
          status={dog.status}
          label={dog.statusLabel}
          onTap={memorial ? undefined : onStatusTap}
          readOnly={memorial}
        />
        <span className="photo-count">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <circle cx="12" cy="13" r="3" />
            <path d="M8 6l2-3h4l2 3" />
          </svg>
          {dog.hero.photoCount} bilder
        </span>
      </div>
    </div>
  );
}

// ── Name block ──────────────────────────────────────────────────────────────
function NameBlock({ dog, sparse }) {
  const id = dog.identity;
  return (
    <section className="name-block">
      <div className="name-row">
        <h1 className="name-full">
          {id.fullName || <span className="placeholder-name">Astor</span>}
        </h1>
        <button className="visibility-pill" aria-label="Synlighet">
          {dog.publicProfile ? IconD.eyeOn : IconD.eyeOff}
          <span>{dog.publicProfile ? "Offentlig" : "Privat"}</span>
        </button>
      </div>
      <div className="name-meta">
        <span>{id.callName || "Astor"}</span>
        <span className="dot-sep">·</span>
        <SexPip sex="m" size={14} />
        <span>{id.sex.toLowerCase()}</span>
        <span className="dot-sep">·</span>
        <span>{id.age}</span>
        <span className="dot-sep">·</span>
        <span>{id.breed}</span>
      </div>
      {id.died && (
        <div className="name-died">
          {id.born} – {id.died}
        </div>
      )}
      {id.titles.length > 0 && (
        <div className="title-row">
          {id.titles.map((t) => (
            <span key={t} className="title-chip">{t}</span>
          ))}
        </div>
      )}
      {sparse && (
        <div className="sparse-banner">
          <span className="sparse-banner-text">Fyll inn flere detaljer for å aktivere stamtavle- og helsefunksjoner</span>
        </div>
      )}
    </section>
  );
}

// ── Tab bar ─────────────────────────────────────────────────────────────────
function TabBarD({ active, tabs, onTap }) {
  return (
    <div className="tab-bar-d" role="tablist">
      <div className="tab-bar-d-track">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            className={`tab-d ${t.id === active ? "is-active" : ""}`}
            onClick={() => onTap(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Inline edit field ──────────────────────────────────────────────────────
function InlineField({ row, onSave }) {
  const [editing, setEditing] = useStateD(false);
  const [draft, setDraft] = useStateD(row.value);
  const inputRef = useRefD(null);

  useEffectD(() => { setDraft(row.value); }, [row.value]);
  useEffectD(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== row.value) onSave && onSave(row.key, draft);
  };

  const isEmpty = !row.value && !editing;

  return (
    <div className={`field-row ${editing ? "is-editing" : ""} ${isEmpty ? "is-empty" : ""}`}>
      <div className="field-label">{row.label}</div>
      <div className="field-value">
        {editing ? (
          <input
            ref={inputRef}
            className="field-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(row.value); setEditing(false); } }}
          />
        ) : (
          <button
            className={`field-tap ${row.mono ? "is-mono" : ""}`}
            onClick={() => !row.readOnly && setEditing(true)}
            disabled={row.readOnly}
          >
            {isEmpty ? (
              <span className="field-placeholder">{row.placeholder || "Legg til"}</span>
            ) : (
              <>
                <span>{row.value}</span>
                {row.reg && <span className="field-reg">{row.reg}</span>}
              </>
            )}
            {!row.readOnly && <span className="field-edit-affordance">{IconD.edit}</span>}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Parents card (sire / dam) ──────────────────────────────────────────────
function ParentsBlock({ parents, onTapParent, onOpenPedigree, sparse }) {
  if (sparse || (!parents.sire && !parents.dam)) {
    return (
      <div className="parents-empty">
        <p>Foreldre ikke registrert.</p>
        <button className="btn btn--secondary" style={{ fontSize: 13, padding: "8px 12px" }}>Legg til foreldre</button>
      </div>
    );
  }
  return (
    <div className="parents-block">
      <div className="parent-grid">
        {[parents.sire, parents.dam].map((p, i) => (
          <button
            key={p.id}
            className={`parent-card ${p.sex === "m" ? "is-sire" : "is-dam"}`}
            onClick={() => onTapParent(p.id)}
          >
            <PhotoBox tone={p.sex === "m" ? "sire" : "dam"} label={p.sex === "m" ? "SIRE" : "DAM"} width={56} height={56} radius={8} />
            <div className="parent-meta">
              <div className="parent-role">{p.sex === "m" ? "Far · sire" : "Mor · dam"}</div>
              <div className="parent-titles">{p.titles.join(" ")}</div>
              <div className="parent-name">{p.name}</div>
            </div>
            <span className="parent-chev">{IconD.chev}</span>
          </button>
        ))}
      </div>
      <button className="pedigree-link" onClick={onOpenPedigree}>
        Se hele stamtavlen
        <span>{IconD.chev}</span>
      </button>
    </div>
  );
}

// ── Attribution rows (breeder, owner, chip) ────────────────────────────────
function AttributionBlock({ rows }) {
  return (
    <div className="attr-block">
      {rows.map((r, i) => (
        <div key={i} className="attr-row">
          <span className="attr-label">{r.label}</span>
          {r.value ? (
            <span className={`attr-value ${r.link ? "is-link" : ""}`}>{r.value}</span>
          ) : (
            <span className="attr-placeholder">{r.placeholder}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Personality text block ─────────────────────────────────────────────────
function PersonalityBlock({ value, onSave, sparse }) {
  const [editing, setEditing] = useStateD(false);
  const [draft, setDraft] = useStateD(value);
  const ref = useRefD(null);

  useEffectD(() => { setDraft(value); }, [value]);
  useEffectD(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onSave && onSave(draft);
  };

  if (editing) {
    return (
      <textarea
        ref={ref}
        className="personality-edit"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        placeholder="Skriv noen ord om Astor — temperament, hva han er flink til, særpreg…"
      />
    );
  }

  return (
    <button className="personality-view" onClick={() => setEditing(true)}>
      {value ? <p>{value}</p> : (
        <p className="personality-placeholder">
          Skriv noen ord om Astor — temperament, hva han er flink til, særpreg.
        </p>
      )}
      <span className="personality-edit-aff">{IconD.edit}</span>
    </button>
  );
}

// ── Status & visibility block ──────────────────────────────────────────────
function VisibilityBlock({ dog, onStatusTap, onToggle, memorial }) {
  return (
    <div className="vis-block">
      <div className="vis-row">
        <div>
          <div className="vis-label">Status</div>
          <div className="vis-sub">Synlighet i søk og stamtavler</div>
        </div>
        <StatusPill status={dog.status} label={dog.statusLabel} onTap={onStatusTap} readOnly={memorial} />
      </div>
      <div className="vis-row">
        <div>
          <div className="vis-label">Offentlig profil</div>
          <div className="vis-sub">Vises på kennel-siden og i offentlig søk</div>
        </div>
        <Toggle on={dog.publicProfile} onTap={() => onToggle("publicProfile")} />
      </div>
      <div className="vis-row">
        <div>
          <div className="vis-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Inkludert i delt genealogi
            <span className="info-icon" title="Lar andre breeders linke Astor i sine pedigreer.">{IconD.info}</span>
          </div>
          <div className="vis-sub">Andre breeders kan referere Astor i sine stamtavler</div>
        </div>
        <Toggle on={dog.sharedGenealogy} onTap={() => onToggle("sharedGenealogy")} />
      </div>
    </div>
  );
}

// ── Toggle ─────────────────────────────────────────────────────────────────
function Toggle({ on, onTap, disabled }) {
  return (
    <button
      className={`toggle ${on ? "is-on" : ""} ${disabled ? "is-disabled" : ""}`}
      onClick={disabled ? undefined : onTap}
      disabled={disabled}
      role="switch"
      aria-checked={on}
    >
      <span className="toggle-knob"></span>
    </button>
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SectionHead({ children, action }) {
  return (
    <header className="section-head">
      <h3>{children}</h3>
      {action}
    </header>
  );
}

// ── Memorial block (replaces status & visibility) ─────────────────────────
function MemorialBlock({ dog }) {
  return (
    <div className="memorial-block">
      <div className="memorial-art">
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="20" r="13" />
          <path d="M8 20c2-5 7-7 12-5" />
          <path d="M32 20c-2-5-7-7-12-5" />
          <path d="M20 7v6" />
        </svg>
      </div>
      <h4>{dog.identity.fullName}</h4>
      <p className="memorial-dates">{dog.identity.born} – {dog.identity.died}</p>
      <p className="memorial-note">Astor er savnet av Kennel Granheim og av alle som har eid en av valpene hans.</p>
      <div className="memorial-actions">
        <button className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>Se minneside</button>
        <button className="btn btn--secondary" style={{ fontSize: 13, padding: "9px 14px" }}>Send minneord</button>
      </div>
    </div>
  );
}

// ── Sparse suggestion card ─────────────────────────────────────────────────
function SparseSuggestion({ onScan }) {
  return (
    <button className="sparse-suggest" onClick={onScan}>
      <div className="sparse-suggest-icon">{IconD.scan}</div>
      <div className="sparse-suggest-body">
        <div className="sparse-suggest-title">Skann en papirstamtavle</div>
        <div className="sparse-suggest-sub">Vi fyller inn registreringsnummer, foreldre og helsetester automatisk.</div>
      </div>
      <span className="sparse-suggest-chev">{IconD.chev}</span>
    </button>
  );
}

// ── Status bottom sheet ────────────────────────────────────────────────────
function StatusSheet({ open, options, current, onSelect, onClose }) {
  if (!open) return null;
  return (
    <div className="sheet-back-d" onClick={onClose}>
      <div className="sheet-d" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab"></div>
        <h4 className="sheet-title">Endre status</h4>
        <div className="status-list">
          {options.map((o) => (
            <button
              key={o.id}
              className={`status-opt ${o.id === current ? "is-current" : ""}`}
              onClick={() => onSelect(o)}
            >
              <span className={`status-dot s-${o.id}`}></span>
              <div className="status-opt-body">
                <div className="status-opt-label">{o.label}</div>
                <div className="status-opt-desc">{o.desc}</div>
              </div>
              {o.id === current && <span className="status-opt-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FAB sheet ──────────────────────────────────────────────────────────────
function FabSheet({ open, actions, onSelect, onClose }) {
  if (!open) return null;
  return (
    <div className="sheet-back-d" onClick={onClose}>
      <div className="sheet-d" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab"></div>
        <h4 className="sheet-title">Legg til</h4>
        <div className="sheet-list-d">
          {actions.map((a) => (
            <button key={a.id} className="sheet-opt-d" onClick={() => onSelect(a)}>
              <span className="sheet-opt-d-icon">{IconD[a.icon] || IconD.camera}</span>
              <span className="sheet-opt-d-label">{a.label}</span>
              <span className="sheet-opt-d-chev">{IconD.chev}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── More menu sheet ────────────────────────────────────────────────────────
function MoreSheet({ open, actions, onSelect, onClose }) {
  if (!open) return null;
  return (
    <div className="sheet-back-d" onClick={onClose}>
      <div className="sheet-d" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab"></div>
        <div className="sheet-list-d">
          {actions.map((a) => (
            <button
              key={a.id}
              className={`sheet-opt-d ${a.destructive ? "is-destructive" : ""}`}
              onClick={() => onSelect(a)}
            >
              <span className="sheet-opt-d-label">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Share sheet ────────────────────────────────────────────────────────────
function ShareSheet({ open, dog, onClose }) {
  const [copied, setCopied] = useStateD(false);
  if (!open) return null;
  const slug = (dog.identity.callName || "astor").toLowerCase();
  const url = `https://dogworld.app/kennel-granheim/${slug}-av-granheim`;
  return (
    <div className="sheet-back-d" onClick={onClose}>
      <div className="sheet-d" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grab"></div>
        <h4 className="sheet-title">Del Astors profil</h4>
        <p className="share-sub">Kjøpere og andre breeders ser kun det du har gjort offentlig.</p>
        <div className="url-row">
          <span className="url">{url}</span>
          <button
            className="btn btn--primary"
            style={{ fontSize: 13, padding: "8px 12px" }}
            onClick={() => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
          >
            {IconD.copy}
            {copied ? "Kopiert" : "Kopier"}
          </button>
        </div>
        <div className="share-row-actions">
          <button className="btn btn--secondary" style={{ fontSize: 13, padding: "8px 12px" }}>Åpne i ny fane</button>
          <button className="btn btn--secondary" style={{ fontSize: 13, padding: "8px 12px" }}>Eksporter PDF</button>
          <button className="btn btn--secondary" style={{ fontSize: 13, padding: "8px 12px" }}>QR-kode</button>
        </div>
      </div>
    </div>
  );
}

// ── Gallery modal (hero tap) ───────────────────────────────────────────────
function GalleryModalD({ open, dog, onClose }) {
  if (!open) return null;
  return (
    <div className="gallery-back" onClick={onClose}>
      <div className="gallery-d" onClick={(e) => e.stopPropagation()}>
        <header className="gallery-head-d">
          <div>
            <div className="gallery-eyebrow">Galleri · {dog.hero.photoCount} bilder</div>
            <div className="gallery-name">{dog.identity.fullName}</div>
          </div>
          <button className="nav-icon" style={{ background: "rgba(255,255,255,0.1)", color: "white" }} onClick={onClose}>{IconD.close}</button>
        </header>
        <div className="gallery-main-d">
          <PhotoBox tone="elkhound" label="ASTOR · 1/47" height={420} radius={8} />
        </div>
        <div className="gallery-thumbs-d">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`gallery-thumb-d ${i === 0 ? "is-active" : ""}`}>
              <PhotoBox tone="elkhound" label={`${i + 1}`} width={64} height={64} radius={6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skeleton for other tabs ────────────────────────────────────────────────
function TabSkeleton({ title, blurb }) {
  return (
    <div className="tab-skel">
      <div className="tab-skel-art">
        <div className="skel-line w-60"></div>
        <div className="skel-line w-40"></div>
        <div className="skel-block"></div>
        <div className="skel-line w-80"></div>
      </div>
      <h3>{title}</h3>
      <p>{blurb}</p>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────
function ToastD({ message, onClose }) {
  useEffectD(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div className="toast-host-d">
      <div className="toast-d">
        <span className="toast-dot-d"></span>
        <span>{message}</span>
      </div>
    </div>
  );
}

// Expose
Object.assign(window, {
  IconD, PhotoBox, SexPip, StatusPill,
  NavBar, HeroBlock, NameBlock, TabBarD,
  InlineField, ParentsBlock, AttributionBlock, PersonalityBlock,
  VisibilityBlock, Toggle, SectionHead,
  MemorialBlock, SparseSuggestion,
  StatusSheet, FabSheet, MoreSheet, ShareSheet, GalleryModalD,
  TabSkeleton, ToastD,
});
