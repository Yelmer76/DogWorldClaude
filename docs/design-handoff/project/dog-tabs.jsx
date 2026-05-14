// ─────────────────────────────────────────────────────────────────────────────
// DOG DETAIL — Tab content panes (Helse, Titler, Stamtavle, Bilder, Notater)
// All copy Norwegian. Sparse + memorial variants handled per tab.
// ─────────────────────────────────────────────────────────────────────────────

const { useState: useStateTabs } = React;

// ── Astor's tab data ────────────────────────────────────────────────────────
const astorHealth = {
  summary: { status: "ok", text: "Klar for avl — alle prøver oppdaterte" },
  tests: [
    { scheme: "HD",       schemeFull: "Hofteleddsdysplasi (FCI)",   value: "A",   state: "ok",   date: "28. apr 2026", evaluator: "M. Bergerud · NKK", cert: true },
    { scheme: "ED",       schemeFull: "Albueleddsdysplasi (FCI)",   value: "0 / 0", state: "ok", date: "28. apr 2026", evaluator: "M. Bergerud · NKK", cert: true },
    { scheme: "Øyne",     schemeFull: "Øyenlysning ECVO",           value: "Klar",  state: "ok", date: "12. mar 2026", evaluator: "Dr. Brevik · Voss Dyreklinikk", cert: true, expires: "12. mar 2027" },
    { scheme: "DM",       schemeFull: "Degenerativ myelopati (DNA)", value: "N / N", state: "ok", date: "21. aug 2023", evaluator: "Laboklin", cert: true },
    { scheme: "prcd-PRA", schemeFull: "Progressiv retinaatrofi (DNA)", value: "N / N", state: "ok", date: "21. aug 2023", evaluator: "Laboklin", cert: true },
  ],
  vaccines: [
    { name: "DHPPi", last: "12. apr 2026", next: "12. apr 2027", state: "ok" },
    { name: "Rabies", last: "15. mar 2025", next: "15. mar 2028", state: "ok" },
    { name: "Lepto",  last: "12. apr 2026", next: "12. apr 2027", state: "ok" },
    { name: "Bordetella", last: null, next: null, state: "muted" },
  ],
  weights: [
    { m: "Mai '25", v: 21.8 }, { m: "Jul '25", v: 22.1 }, { m: "Sep '25", v: 22.4 },
    { m: "Nov '25", v: 22.6 }, { m: "Jan '26", v: 22.3 }, { m: "Mar '26", v: 22.5 },
    { m: "Mai '26", v: 22.4 },
  ],
};

const astorTitles = [
  { y: 2025, items: [
    { kind: "champion",   title: "NORDUCH",  event: "Nordisk Champion bekreftet", venue: "FCI · Norden", date: "12. jul 2025", judge: null },
    { kind: "show",       title: "BIS-1",    event: "Best in Show",                venue: "NKK Bergen International", date: "04. mai 2025", judge: "A. Wenger (NO)" },
    { kind: "show",       title: "BOS",      event: "Best of Opposite Sex",        venue: "SKK Stockholm Int.", date: "11. okt 2024", judge: "M. Lindgren (SE)" },
  ]},
  { y: 2024, items: [
    { kind: "champion",   title: "NUCH",     event: "Norsk Champion bekreftet",    venue: "NKK", date: "18. apr 2024", judge: null },
    { kind: "show",       title: "CACIB",    event: "Certifikat for Internasjonal Skjønnhetschampion", venue: "NKK Oslo", date: "23. mar 2024", judge: "H. Karlsson (FI)" },
    { kind: "show",       title: "BOB",      event: "Best of Breed",               venue: "NKK Hamar", date: "08. jun 2024", judge: "P. Olsen (NO)" },
  ]},
  { y: 2023, items: [
    { kind: "show",       title: "2× CAC",   event: "Nasjonalt sertifikat",        venue: "NKK Hamar · NKK Trondheim", date: "jun + okt 2023", judge: null },
    { kind: "show",       title: "Excellent", event: "Utstillingsvurdering",       venue: "NKK Trondheim", date: "15. apr 2023", judge: "Å. Bremnes (NO)" },
  ]},
];

// ── Helse tab ───────────────────────────────────────────────────────────────
function HelseTab({ dog, mode, onToast }) {
  if (mode === "sparse") {
    return <TabEmpty
      title="Ingen helseprøver registrert"
      sub="Skann eller fotografer et helse-sertifikat for å starte. Vi leser ut skjema, verdi og dato automatisk."
      cta="Skann sertifikat"
      onCta={() => onToast("→ Skann helse-sertifikat")}
    />;
  }
  const h = astorHealth;
  return (
    <div className="tab-pane">
      <section className="profil-section">
        <div className="health-summary">
          <span className={`status-dot s-active`}></span>
          <div>
            <div className="health-summary-text">{h.summary.text}</div>
            <div className="health-summary-sub">Sist oppdatert 28. apr 2026 · neste øyenlysning innen 12. mar 2027</div>
          </div>
        </div>
      </section>

      <section className="profil-section">
        <SectionHead>
          Helseprøver
          <button className="btn btn--ghost" style={{ padding: "4px 8px", fontSize: 12, color: "var(--forest-700)" }} onClick={() => onToast("→ Logg ny prøve")}>
            + Ny
          </button>
        </SectionHead>
        <div className="health-rows">
          {h.tests.map((t, i) => (
            <div key={i} className="health-row-m">
              <div className="health-row-top">
                <div className="health-scheme">
                  <div className="health-scheme-name">{t.scheme}</div>
                  <div className="health-scheme-full">{t.schemeFull}</div>
                </div>
                <span className={`tag-h s-${t.state}`}>{t.value}</span>
              </div>
              <div className="health-row-bot">
                <span className="health-row-date">{t.date}</span>
                <span className="health-row-evaluator">{t.evaluator}</span>
                {t.cert && (
                  <button className="health-row-cert" onClick={() => onToast(`PDF: ${t.scheme}`)}>
                    PDF →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="profil-section">
        <SectionHead>Vaksiner</SectionHead>
        <div className="vax-grid">
          {h.vaccines.map((v) => (
            <div key={v.name} className={`vax-card s-${v.state}`}>
              <div className="vax-name">{v.name}</div>
              {v.last ? (
                <>
                  <div className="vax-last">Sist <strong>{v.last}</strong></div>
                  <div className="vax-next">Neste {v.next}</div>
                </>
              ) : (
                <div className="vax-empty">Ikke registrert</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="profil-section">
        <SectionHead>
          Vektlogg
          <span className="section-meta">12 mnd · siste 22,4 kg</span>
        </SectionHead>
        <WeightChart data={h.weights} />
      </section>
    </div>
  );
}

// ── Weight chart (simple sparkline + month axis) ───────────────────────────
function WeightChart({ data }) {
  const W = 340, H = 120;
  const padX = 20, padTop = 16, padBot = 26;
  const min = Math.min(...data.map((d) => d.v)) - 0.5;
  const max = Math.max(...data.map((d) => d.v)) + 0.5;
  const x = (i) => padX + (i / (data.length - 1)) * (W - padX * 2);
  const y = (v) => padTop + (1 - (v - min) / (max - min)) * (H - padTop - padBot);
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(d.v)}`).join(" ");
  const fill = `${path} L${x(data.length - 1)} ${H - padBot} L${x(0)} ${H - padBot} Z`;
  return (
    <div className="weight-chart-wrap">
      <svg className="weight-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <line x1={padX} y1={H - padBot} x2={W - padX} y2={H - padBot} stroke="var(--n-200)" strokeWidth="1" />
        <path d={fill} fill="var(--forest-700)" opacity="0.10" />
        <path d={path} fill="none" stroke="var(--forest-700)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.v)} r="3" fill="var(--forest-700)" />
            <text x={x(i)} y={H - 8} fontSize="9" fill="var(--n-500)" textAnchor="middle" fontFamily="var(--font-mono)">{d.m}</text>
            {(i === 0 || i === data.length - 1) && (
              <text x={x(i)} y={y(d.v) - 8} fontSize="9" fill="var(--n-950)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500">{d.v}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Titler tab ──────────────────────────────────────────────────────────────
function TitlerTab({ dog, mode, onToast }) {
  if (mode === "sparse") {
    return <TabEmpty
      title="Ingen titler registrert"
      sub="Skann en utstillingskritikk så fyller vi inn dommer, dato og sted automatisk."
      cta="Skann kritikk"
      onCta={() => onToast("→ Skann utstillingskritikk")}
    />;
  }
  return (
    <div className="tab-pane">
      <section className="profil-section">
        <div className="titles-summary">
          <div className="titles-stat">
            <div className="titles-stat-v">2</div>
            <div className="titles-stat-l">Champion-titler</div>
          </div>
          <div className="titles-stat">
            <div className="titles-stat-v">8</div>
            <div className="titles-stat-l">Utstillinger</div>
          </div>
          <div className="titles-stat">
            <div className="titles-stat-v">3</div>
            <div className="titles-stat-l">År aktiv</div>
          </div>
        </div>
      </section>

      {astorTitles.map((group) => (
        <section key={group.y} className="profil-section">
          <SectionHead>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--n-700)", fontSize: 14, fontWeight: 600 }}>{group.y}</span>
          </SectionHead>
          <div className="title-timeline">
            {group.items.map((it, i) => (
              <div key={i} className={`title-item kind-${it.kind}`}>
                <span className={`title-pip kind-${it.kind}`}></span>
                <div className="title-body">
                  <div className="title-line">
                    <span className={`title-badge kind-${it.kind}`}>{it.title}</span>
                    <span className="title-event">{it.event}</span>
                  </div>
                  <div className="title-sub">
                    <span>{it.venue}</span>
                    {it.judge && <><span className="dot-sep">·</span><span>Dommer: {it.judge}</span></>}
                  </div>
                  <div className="title-date">{it.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="profil-section">
        <button className="btn btn--secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onToast("→ Eksporter titler som PDF")}>
          Eksporter alle titler som PDF
        </button>
      </section>
    </div>
  );
}

// ── Stamtavle tab ───────────────────────────────────────────────────────────
function StamtavleTab({ dog, mode, onToast }) {
  if (mode === "sparse") {
    return <TabEmpty
      title="Stamtavle mangler"
      sub="Skann papirstamtavle eller importer fra registeret. Vi fyller inn foreldre og besteforeldre."
      cta="Skann stamtavle"
      onCta={() => onToast("→ Skann papirstamtavle")}
    />;
  }
  // Mini 3-gen tree, focal-on-left
  const focal = { name: "Astor", titles: "NUCH NORDUCH", sex: "m", born: "2022" };
  const sire = { name: "Bobby av Skogen", titles: "NUCH SE UCH", sex: "m", born: "2018", hd: "HD A · ED 0" };
  const dam  = { name: "Saga vom Nordwald", titles: "NUCH", sex: "f", born: "2019", hd: "HD A · DM N/N" };
  const gp = [
    { name: "Skagen av Fjordlund", titles: "NUCH", sex: "m", born: "2017", hd: "HD A" },
    { name: "Linnea av Granheim",  titles: "NORDUCH", sex: "f", born: "2016", hd: "HD A" },
    { name: "Kaiser vom Hochwald", titles: "DE VDH-CH", sex: "m", born: "2015", hd: "HD A" },
    { name: "Greta vom Schwarzwald", titles: "SE UCH", sex: "f", born: "2016", hd: "HD B" },
  ];

  return (
    <div className="tab-pane">
      <section className="profil-section">
        <SectionHead>
          3 generasjoner
          <span className="section-meta">Astor er focal</span>
        </SectionHead>

        <div className="mini-tree">
          {/* Focal */}
          <div className="mt-col">
            <div className="mt-col-label">Focal</div>
            <div className="mt-node is-focal">
              <div className="mt-titles">{focal.titles}</div>
              <div className="mt-name">{focal.name}</div>
              <div className="mt-meta"><SexPip sex="m" size={12} /> {focal.born}</div>
            </div>
          </div>

          {/* Parents */}
          <div className="mt-col">
            <div className="mt-col-label">Foreldre</div>
            <div className="mt-node is-sire" onClick={() => onToast("→ Bobby av Skogen")}>
              <div className="mt-titles">{sire.titles}</div>
              <div className="mt-name">{sire.name}</div>
              <div className="mt-meta"><SexPip sex="m" size={12} /> {sire.born} · <span style={{ fontFamily: "var(--font-mono)" }}>{sire.hd}</span></div>
            </div>
            <div className="mt-node is-dam" onClick={() => onToast("→ Saga vom Nordwald")}>
              <div className="mt-titles">{dam.titles}</div>
              <div className="mt-name">{dam.name}</div>
              <div className="mt-meta"><SexPip sex="f" size={12} /> {dam.born} · <span style={{ fontFamily: "var(--font-mono)" }}>{dam.hd}</span></div>
            </div>
          </div>

          {/* Grandparents */}
          <div className="mt-col">
            <div className="mt-col-label">Besteforeldre</div>
            {gp.map((g, i) => (
              <div key={i} className={`mt-node mt-node-sm ${g.sex === "m" ? "is-sire" : "is-dam"}`} onClick={() => onToast(`→ ${g.name}`)}>
                <div className="mt-titles">{g.titles}</div>
                <div className="mt-name">{g.name}</div>
                <div className="mt-meta"><SexPip sex={g.sex} size={11} /> {g.born}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="profil-section">
        <button className="pedigree-link" style={{ width: "100%" }} onClick={() => onToast("→ Pedigree explorer · full visning")}>
          Åpne full stamtavle — focal navigation
          <span>{IconD.chev}</span>
        </button>
      </section>

      <section className="profil-section">
        <SectionHead>
          Avkom
          <span className="section-meta">1 kull · 3 valper</span>
        </SectionHead>
        <div className="offspring-list">
          {[
            { name: "Mira av Granheim", titles: "NUCH", sex: "f", born: "Apr 2024" },
            { name: "Loke av Granheim", titles: "", sex: "m", born: "Apr 2024" },
            { name: "Idun av Granheim", titles: "", sex: "f", born: "Apr 2024" },
          ].map((p, i) => (
            <button key={i} className={`offspring-row ${p.sex === "m" ? "is-sire" : "is-dam"}`} onClick={() => onToast(`→ ${p.name}`)}>
              <PhotoBox tone={p.sex === "m" ? "sire" : "dam"} label={p.sex === "m" ? "♂" : "♀"} width={36} height={36} radius={6} />
              <div style={{ flex: 1, minWidth: 0 }}>
                {p.titles && <div className="mt-titles">{p.titles}</div>}
                <div className="mt-name">{p.name}</div>
                <div className="mt-meta"><SexPip sex={p.sex} size={11} /> {p.born}</div>
              </div>
              <span className="parent-chev">{IconD.chev}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Bilder tab ──────────────────────────────────────────────────────────────
function BilderTab({ dog, mode, onToast }) {
  if (mode === "sparse" || dog.hero.photoCount === 0) {
    return <TabEmpty
      title="Ingen bilder ennå"
      sub="Last opp Astors første bilde — fra galleriet eller direkte med kamera."
      cta="Last opp bilde"
      onCta={() => onToast("→ Last opp bilde")}
    />;
  }
  const albums = [
    { name: "Alle", count: 47, active: true },
    { name: "Utstillinger", count: 14 },
    { name: "Hverdag", count: 21 },
    { name: "Valpekull", count: 12 },
  ];
  return (
    <div className="tab-pane">
      <section className="profil-section">
        <div className="album-row">
          {albums.map((a) => (
            <button key={a.name} className={`album-chip ${a.active ? "is-active" : ""}`} onClick={() => onToast(`Album: ${a.name}`)}>
              {a.name}
              <span className="album-count">{a.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="profil-section">
        <div className="photo-grid">
          {Array.from({ length: 16 }).map((_, i) => (
            <button key={i} className="photo-grid-cell" onClick={() => onToast(`Bilde ${i + 1}/47`)}>
              <PhotoBox tone={i % 3 === 0 ? "elkhound" : i % 3 === 1 ? "sire" : "dam"} label={`${i + 1}`} width="100%" height="100%" radius={4} />
            </button>
          ))}
        </div>
        <button className="btn btn--secondary" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => onToast("Last flere")}>
          Vis flere · 31 bilder igjen
        </button>
      </section>
    </div>
  );
}

// ── Notater tab ─────────────────────────────────────────────────────────────
const astorNotes = [
  { date: "12. mai 2026", time: "09:42", body: "Veiing: 22,4 kg. Stabilt etter parring med Bella. Spiser normalt, energinivå normalt." },
  { date: "08. mai 2026", time: "07:10", body: "Klart for NKK Bergen. Behold dietten — har fungert godt frem til nå. Pels i god stand." },
  { date: "28. apr 2026", time: "11:30", body: "HD-røntgen tatt hos Solheim. Han var rolig — ingen sedasjon nødvendig. Resultat ventes innen 14 dager." },
  { date: "12. mar 2026", time: "10:15", body: "Øyenlysning hos Brevik (Voss). Klar. Neste innen 12. mar 2027." },
  { date: "14. feb 2026", time: "22:50", body: "Bella har gått inn i løpetid. Planlegger parring siste uke av februar. Astor er fokusert." },
];

function NotaterTab({ dog, mode, onToast }) {
  const [notes, setNotes] = useStateTabs(astorNotes);
  const [draft, setDraft] = useStateTabs("");

  const submit = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const ddmm = `${now.getDate().toString().padStart(2, "0")}. ${["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des"][now.getMonth()]} ${now.getFullYear()}`;
    const hhmm = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setNotes((n) => [{ date: ddmm, time: hhmm, body: draft }, ...n]);
    setDraft("");
    onToast("Notat lagret");
  };

  if (mode === "sparse" && notes === astorNotes) {
    return <TabEmpty
      title="Ingen notater ennå"
      sub="Privat tidsstemplet logg — bare du ser dette."
      cta="Skriv første notat"
      onCta={() => onToast("→ Skriv notat")}
    />;
  }

  return (
    <div className="tab-pane">
      <section className="profil-section">
        <div className="note-composer">
          <textarea
            className="note-input"
            placeholder="Notat om Astor — vekt, atferd, kommende avtaler…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
          />
          <div className="note-composer-foot">
            <span className="note-private">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              Privat
            </span>
            <button className="btn btn--primary" style={{ padding: "7px 14px", fontSize: 13 }} onClick={submit} disabled={!draft.trim()}>
              Lagre notat
            </button>
          </div>
        </div>
      </section>

      <section className="profil-section">
        <SectionHead>Tidslinje</SectionHead>
        <div className="note-list">
          {notes.map((n, i) => (
            <article key={i} className="note-card">
              <div className="note-head">
                <span className="note-date">{n.date}</span>
                <span className="note-time">{n.time}</span>
              </div>
              <p className="note-body">{n.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Empty-state helper for tabs ─────────────────────────────────────────────
function TabEmpty({ title, sub, cta, onCta }) {
  return (
    <div className="tab-empty">
      <div className="tab-empty-art">
        <svg viewBox="0 0 56 56" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--forest-500)" }}>
          <circle cx="28" cy="28" r="22" strokeDasharray="2 4" opacity="0.5" />
          <path d="M22 26h12M22 30h8" />
        </svg>
      </div>
      <h4 className="tab-empty-title">{title}</h4>
      <p className="tab-empty-sub">{sub}</p>
      {cta && (
        <button className="btn btn--primary" style={{ padding: "10px 16px", fontSize: 14 }} onClick={onCta}>
          {cta}
        </button>
      )}
    </div>
  );
}

// Expose
Object.assign(window, {
  HelseTab, TitlerTab, StamtavleTab, BilderTab, NotaterTab, TabEmpty, WeightChart,
});
