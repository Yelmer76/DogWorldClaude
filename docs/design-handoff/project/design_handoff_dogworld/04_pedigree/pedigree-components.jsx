// ─────────────────────────────────────────────────────────────────────────────
// PEDIGREE COMPONENTS — shared atoms used by both mobile + desktop layouts.
// All consume `getDog`, `shortName`, `birthYear`, `flagFor` from window.
// ─────────────────────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useCallback } = React;

// ── Photo placeholder ───────────────────────────────────────────────────────
function Photo({ size = 96, label = "DOG", round = false, dog, className = "" }) {
  const initials = dog && dog.name && !dog.hidden
    ? dog.name.split(/\s+/)[0].slice(0, 2).toUpperCase()
    : label;
  return (
    <div
      className={`photo ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: round ? "50%" : "var(--r-card)",
        fontSize: Math.max(9, size * 0.13),
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── Title strip ─────────────────────────────────────────────────────────────
function Titles({ titles, size = 11 }) {
  if (!titles || titles.length === 0) return null;
  return (
    <div
      className="titles-strip"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: size,
        color: "var(--ochre-700)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontWeight: 500,
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {titles.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}

// ── Sex chip ────────────────────────────────────────────────────────────────
function SexChip({ sex, size = 18 }) {
  const is_m = sex === "m";
  return (
    <span
      className={`sex-chip ${is_m ? "is-sire" : "is-dam"}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "inline-grid",
        placeItems: "center",
        fontSize: Math.max(10, size * 0.6),
        fontWeight: 600,
        background: is_m ? "#e8eef4" : "#f4dde6",
        color: is_m ? "#3e5a76" : "#8a4870",
        flexShrink: 0,
      }}
    >
      {is_m ? "♂" : "♀"}
    </span>
  );
}

// ── Health emblem strip ─────────────────────────────────────────────────────
function HealthEmblems({ health, compact = false }) {
  if (!health) return null;
  const keys = ["HD", "ED", "Eyes", "DM"];
  return (
    <div
      style={{
        display: "flex",
        gap: compact ? 4 : 6,
        flexWrap: "wrap",
      }}
    >
      {keys.map((k) => {
        const h = health[k];
        if (!h) return null;
        const cls =
          h.status === "ok"
            ? "tag tag--success"
            : h.status === "warn"
            ? "tag tag--warning"
            : h.status === "err"
            ? "tag tag--error"
            : "tag";
        return (
          <span
            key={k}
            className={cls}
            style={{ fontSize: compact ? 10 : 11, padding: compact ? "2px 6px" : "3px 7px" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>{k}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>{h.value}</span>
          </span>
        );
      })}
    </div>
  );
}

// ── Node card (small) — used in parents row, grandparents row, peek targets ─
function NodeCard({ dogId, size = "md", onTap, generation = "parent", showHealth = false }) {
  const dog = getDog(dogId);

  // Edge cases
  if (!dog) {
    return (
      <button className="node-card node-empty" onClick={() => onTap && onTap(null, "unknown")}>
        <div className="node-empty-inner">
          <svg className="i" viewBox="0 0 24 24" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Unknown — add</span>
        </div>
      </button>
    );
  }
  if (dog.hidden) {
    return (
      <div className="node-card node-hidden">
        <svg className="i" viewBox="0 0 24 24" width="14" height="14" style={{ color: "var(--n-500)" }}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span className="node-hidden-name">Hidden</span>
        <span className="node-hidden-meta">privacy</span>
      </div>
    );
  }

  const isSire = dog.sex === "m";
  const sizeClass = size === "sm" ? "is-sm" : size === "lg" ? "is-lg" : "";
  const photoSize = size === "sm" ? 36 : size === "lg" ? 56 : 44;

  // Overall health status — single pip indicator
  const healthStatus = (() => {
    if (!dog.health) return null;
    const states = Object.values(dog.health).map((h) => h.status);
    if (states.includes("err")) return "err";
    if (states.includes("warn")) return "warn";
    if (states.every((s) => s === "ok")) return "ok";
    return null;
  })();

  return (
    <button
      className={`node-card ${sizeClass} ${isSire ? "is-sire" : "is-dam"} ${dog.deceased ? "is-deceased" : ""}`}
      onClick={() => onTap && onTap(dogId, generation)}
    >
      <Photo dog={dog} size={photoSize} round={false} label={isSire ? "♂" : "♀"} />
      <div className="node-body">
        {dog.titles && dog.titles.length > 0 && size !== "sm" && (
          <div className="node-titles">{dog.titles.join(" ")}</div>
        )}
        <div className="node-name">{shortName(dog)}{size === "lg" && dog.name.replace(shortName(dog), "") ? <span className="kennel-suffix">{dog.name.slice(shortName(dog).length)}</span> : null}</div>
        <div className="node-meta">
          <SexChip sex={dog.sex} size={14} />
          <span>{birthYear(dog)}</span>
          {dog.country && <span className="flag">{flagFor(dog.country)}</span>}
          {dog.deceased && (
            <span className="deceased" title={`Died ${dog.deceased.slice(0, 4)}`}>
              <svg className="i" viewBox="0 0 24 24" width="11" height="11">
                <circle cx="12" cy="12" r="6" />
                <path d="M12 6V3M12 21v-3M6 12H3M21 12h-3" />
              </svg>
              <span>{dog.deceased.slice(0, 4)}</span>
            </span>
          )}
        </div>
        {showHealth && size !== "sm" && (
          <div style={{ marginTop: 6 }}>
            <HealthEmblems health={dog.health} compact />
          </div>
        )}
      </div>
      {healthStatus && !showHealth && (
        <span
          className="health-pip"
          title={
            healthStatus === "ok" ? "All health tests clear" :
            healthStatus === "warn" ? "One or more flags — tap to view" :
            "Test expired or failed — tap to view"
          }
          style={{
            background:
              healthStatus === "ok" ? "var(--success-dot)" :
              healthStatus === "warn" ? "var(--warning-dot)" :
              "var(--error-dot)",
          }}
        />
      )}
      <span className="tap-affordance">
        <svg className="i" viewBox="0 0 24 24" width="14" height="14">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </span>
    </button>
  );
}

// ── Focal card (large) — center of attention ────────────────────────────────
function FocalCard({ dog, onPhotoTap }) {
  if (!dog) return null;
  const isSire = dog.sex === "m";
  return (
    <div className={`focal-card ${isSire ? "is-sire" : "is-dam"}`}>
      <button className="focal-photo-btn" onClick={onPhotoTap} aria-label="Open photo gallery">
        <Photo dog={dog} size={96} label={isSire ? "♂" : "♀"} />
        <span className="photo-expand">
          <svg className="i" viewBox="0 0 24 24" width="12" height="12">
            <polyline points="15 4 20 4 20 9" />
            <polyline points="9 20 4 20 4 15" />
            <line x1="20" y1="4" x2="14" y2="10" />
            <line x1="4" y1="20" x2="10" y2="14" />
          </svg>
        </span>
      </button>
      <div className="focal-body">
        <Titles titles={dog.titles} />
        <h2 className="focal-name">{dog.name}</h2>
        <div className="focal-meta">
          <SexChip sex={dog.sex} size={16} />
          <span>{birthYear(dog)}</span>
          <span className="flag">{flagFor(dog.country)}</span>
          <span className="dot-sep">·</span>
          <span>{dog.breed}</span>
        </div>
        <div className="kennel-line">{dog.breeder}</div>
        <div style={{ marginTop: 10 }}>
          <HealthEmblems health={dog.health} />
        </div>
      </div>
    </div>
  );
}

// ── Breadcrumb strip ────────────────────────────────────────────────────────
function Breadcrumb({ history, onJump }) {
  return (
    <div className="crumb-strip" role="navigation" aria-label="Pedigree history">
      <span className="crumb-label">Path</span>
      {history.map((id, idx) => {
        const d = getDog(id);
        const isLast = idx === history.length - 1;
        return (
          <React.Fragment key={idx + "-" + id}>
            {idx > 0 && (
              <svg className="crumb-sep" viewBox="0 0 24 24" width="10" height="10">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            )}
            <button
              className={`crumb-item ${isLast ? "is-current" : ""}`}
              onClick={() => !isLast && onJump(idx)}
              disabled={isLast}
            >
              {d ? shortName(d) : "?"}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Carousel of dogs (offspring / siblings) ─────────────────────────────────
function DogCarousel({ ids, label, count, onTap, generation, emptyText }) {
  if (!ids || ids.length === 0) {
    return (
      <section className="carousel">
        <header className="carousel-head">
          <span className="carousel-label">{label}</span>
          <span className="carousel-count">0</span>
        </header>
        <div className="carousel-empty">{emptyText || "No records yet."}</div>
      </section>
    );
  }
  return (
    <section className="carousel">
      <header className="carousel-head">
        <span className="carousel-label">{label}</span>
        <span className="carousel-count">{count != null ? count : ids.length}</span>
      </header>
      <div className="carousel-track">
        {ids.map((id) => {
          const d = getDog(id);
          if (!d) return null;
          return (
            <button
              key={id}
              className={`carousel-card ${d.sex === "m" ? "is-sire" : "is-dam"}`}
              onClick={() => onTap(id, generation)}
            >
              <Photo dog={d} size={48} />
              <div className="carousel-card-body">
                {d.titles && d.titles.length > 0 && (
                  <div className="carousel-titles">{d.titles.join(" ")}</div>
                )}
                <div className="carousel-name">{shortName(d)}</div>
                <div className="carousel-meta">
                  <SexChip sex={d.sex} size={12} />
                  <span>{birthYear(d)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── Share modal ─────────────────────────────────────────────────────────────
function ShareModal({ dog, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!dog) return null;
  const slug = dog.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const url = `https://dogworld.app/${dog.breeder ? dog.breeder.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "dog"}/${slug}`;
  const handleCopy = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h3>Share pedigree</h3>
            <p>Public link to {dog.name}'s page. Buyers and other breeders see only what you've made public.</p>
          </div>
          <button className="btn btn--icon" onClick={onClose} aria-label="Close" style={{ border: 0 }}>
            <svg className="i" viewBox="0 0 24 24" width="16" height="16">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className="modal-body">
          <div className="url-box">
            <span className="url">{url}</span>
            <button className="btn btn--primary" onClick={handleCopy} style={{ padding: "8px 14px", fontSize: 13 }}>
              {copied ? "Copied ✓" : "Copy link"}
            </button>
          </div>
          <div className="share-actions">
            <button className="btn btn--secondary" style={{ padding: "8px 12px", fontSize: 13 }}>
              <svg className="i" viewBox="0 0 24 24" width="14" height="14">
                <path d="M15 3h6v6" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
              </svg>
              Open in new tab
            </button>
            <button className="btn btn--secondary" style={{ padding: "8px 12px", fontSize: 13 }}>
              <svg className="i" viewBox="0 0 24 24" width="14" height="14">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M4 9h16M9 4v16" />
              </svg>
              Generate PDF
            </button>
            <button className="btn btn--secondary" style={{ padding: "8px 12px", fontSize: 13 }}>
              <svg className="i" viewBox="0 0 24 24" width="14" height="14">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 4v4M16 4v4M4 12h16" />
              </svg>
              QR for show catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Gallery modal (photo expand) ────────────────────────────────────────────
function GalleryModal({ dog, onClose }) {
  if (!dog) return null;
  return (
    <div className="modal-back is-dark" onClick={onClose}>
      <div className="gallery" onClick={(e) => e.stopPropagation()}>
        <header className="gallery-head">
          <div>
            <Titles titles={dog.titles} size={10} />
            <div className="gallery-name">{dog.name}</div>
          </div>
          <button className="btn btn--icon" onClick={onClose} aria-label="Close" style={{ background: "rgba(255,255,255,0.1)", border: 0, color: "white" }}>
            <svg className="i" viewBox="0 0 24 24" width="16" height="16">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className="gallery-main">
          <Photo dog={dog} size={520} />
        </div>
        <div className="gallery-thumbs">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="gallery-thumb">
              <Photo dog={dog} size={64} label={`${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Expose components
Object.assign(window, {
  Photo, Titles, SexChip, HealthEmblems,
  NodeCard, FocalCard, Breadcrumb, DogCarousel,
  ShareModal, GalleryModal,
});
