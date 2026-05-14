// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC KENNEL — Template A (Granheim · showcase) + Template B (Lyngheia · commercial)
// + Public dog page (Astor) + Public memorial page (Vidar)
// ─────────────────────────────────────────────────────────────────────────────

// ═════════════════════════════════════════════════════════════════════════════
// TEMPLATE A — KENNEL GRANHEIM (showcase / lineage-proud)
// ═════════════════════════════════════════════════════════════════════════════
function TemplateA({ kennel, editMode, onTapDog, onTapMemorial, onTapPedigree, onApplyPuppy }) {
  return (
    <div className="ktpl ktpl-show">
      {/* Hero */}
      <section className="ktpl-hero">
        <Pk tone="elkhound" height="100%" radius={0} label="ASTOR · COVER" />
        <div className="ktpl-hero-gradient" aria-hidden="true"></div>
        <div className="ktpl-hero-overlay">
          <div className="ktpl-hero-text">
            {editMode && <EditAff label="Bytt heltefoto" />}
            <div className="ktpl-hero-eyebrow">{kennel.location} · siden {kennel.since}</div>
            <h1 className="ktpl-hero-name">{kennel.name}</h1>
            <p className="ktpl-hero-tagline">{kennel.tagline}</p>
            <TrustBadges kennel={kennel} tone="dark" />
          </div>
          <div className="ktpl-hero-cta">
            <button className="pk-btn pk-btn-primary pk-btn-lg" onClick={() => onTapDog("astor")}>
              Se hundene våre {Ki.arrow}
            </button>
          </div>
        </div>
      </section>

      {/* Aktuelle hunder */}
      <section className="ktpl-sec" id="hunder">
        <SectionHead
          eyebrow="Linjen vår"
          title="Aktuelle hunder"
          sub="Tre generasjoner Norsk Elghund fra Granheim. Klikk for å se stamtavle og helse."
        />
        <div className="ktpl-dogs">
          {kennel.dogs.map((d) => (
            <PubDogCard key={d.id} dog={d} onTap={() => onTapDog(d.id)} kind="show" />
          ))}
        </div>
      </section>

      {/* Avlsfilosofi */}
      <section className="ktpl-sec ktpl-philosophy" id="om">
        <div className="ktpl-philosophy-grid">
          <div className="ktpl-philosophy-text">
            <div className="sec-eyebrow">Vår avlsfilosofi</div>
            <h2 className="sec-title sec-title-display">Linjeavl gjennom 26 år — &eacute;n linje, ikke et katalog.</h2>
            <p>{kennel.philosophy}</p>
            <div className="ktpl-philosophy-stats">
              <div><strong>26</strong><span>år drift</span></div>
              <div><strong>14</strong><span>kull</span></div>
              <div><strong>5</strong><span>Champion-titler</span></div>
            </div>
          </div>
          <div className="ktpl-philosophy-photo">
            <Pk tone="dam" height={360} radius={8} label="MARIT &amp; OLE" />
          </div>
        </div>
      </section>

      {/* Nyeste titler og resultater */}
      <section className="ktpl-sec ktpl-results" id="kull">
        <SectionHead eyebrow="Tidslinje" title="Nyeste titler og resultater" />
        <div className="ktpl-results-list">
          {kennel.results.map((r, i) => (
            <div key={i} className={`ktpl-result-item kind-${r.kind}`}>
              <span className="ktpl-result-pip">
                {r.kind === "show" ? Ki.trophy : r.kind === "health" ? Ki.health : Ki.title}
              </span>
              <div className="ktpl-result-body">
                <div className="ktpl-result-text">{r.text}</div>
                {r.judge && <div className="ktpl-result-judge">Dommer: {r.judge}</div>}
              </div>
              <span className="ktpl-result-date">{r.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Aktuelle kull */}
      <section className="ktpl-sec ktpl-litter" id="valper">
        <SectionHead eyebrow="Aktuelt" title="Kull C — på vei ut i verden" />
        <article className="ktpl-litter-card">
          <Pk tone="elkhound" height={220} radius={8} label="KULL C · UKE 4" />
          <div className="ktpl-litter-body">
            <h3>{kennel.litter.name}</h3>
            <p className="ktpl-litter-sub">{kennel.litter.parents} · Født {kennel.litter.born}</p>
            <div className="ktpl-litter-stats">
              <div><strong>{kennel.litter.total}</strong> valper</div>
              <div><strong>{kennel.litter.age}</strong> alder</div>
              <div><strong>{kennel.litter.available}</strong> ledige</div>
            </div>
            <p className="ktpl-litter-note">
              Vi tar imot søknader frem til 6. juni. Forventet levering uke 24.
            </p>
            <div className="ktpl-litter-actions">
              <button className="pk-btn pk-btn-primary" onClick={() => onApplyPuppy()}>Søk om valp</button>
              <button className="pk-btn pk-btn-secondary" onClick={() => onTapDog("astor")}>Se foreldrene</button>
            </div>
          </div>
        </article>
      </section>

      {/* Minneside teaser */}
      <section className="ktpl-sec ktpl-memorial" id="minne">
        <SectionHead
          eyebrow="Minne"
          title="Hundene som er borte fra oss"
          sub="Tre hunder som har formet linjen. Aldri glemt."
        />
        <div className="ktpl-memorial-row">
          {kennel.memorials.map((m) => (
            <button key={m.id} className="ktpl-memorial-card" onClick={() => onTapMemorial(m.id)}>
              <Pk tone="elkhound" muted={true} height={140} radius={6} label={m.name.split(" ")[0].toUpperCase()} />
              <div className="ktpl-memorial-name">{m.name}</div>
              <div className="ktpl-memorial-years">{m.years}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Om oss */}
      <section className="ktpl-sec ktpl-about">
        <div className="ktpl-about-grid">
          <div className="ktpl-about-photo">
            <Pk tone="sire" height={300} radius={8} label="GÅRDEN · LILLEHAMMER" />
          </div>
          <div className="ktpl-about-text">
            <div className="sec-eyebrow">Om {kennel.owners}</div>
            <h2 className="sec-title">{kennel.owners}, oppdrettere siden {kennel.since}</h2>
            <p>{kennel.about}</p>
            <p>
              Vi er små med mening. Ett kull i året, hver valp drar hjem etter en lang prat ved kjøkkenbordet,
              og hver familie får kontakten vår de neste 12 årene.
            </p>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="ktpl-sec ktpl-contact" id="kontakt">
        <SectionHead eyebrow="Få tak i oss" title="Kontakt" sub="Vi svarer alle innen 3 dager. Spør om hva som helst — det er ingen dumme spørsmål når det gjelder en valp." />
        <div className="ktpl-contact-grid">
          <div className="ktpl-contact-card">
            <div className="ktpl-contact-lbl">{Ki.mail} E-post</div>
            <div className="ktpl-contact-val">{kennel.contact.email}</div>
          </div>
          <div className="ktpl-contact-card">
            <div className="ktpl-contact-lbl">{Ki.phone} Telefon</div>
            <div className="ktpl-contact-val">{kennel.contact.phone}</div>
          </div>
          <div className="ktpl-contact-card">
            <div className="ktpl-contact-lbl">{Ki.pin} Adresse</div>
            <div className="ktpl-contact-val">{kennel.contact.postal}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TEMPLATE B — KENNEL LYNGHEIA (commercial / funnel)
// ═════════════════════════════════════════════════════════════════════════════
function TemplateB({ kennel, editMode, onTapDog, onApplyPuppy }) {
  const [openFaq, setOpenFaq] = useStateK(0);
  const [tIdx, setTIdx] = useStateK(0);

  const av = kennel.availablePuppies;
  return (
    <div className="ktpl ktpl-com">
      {/* Hero */}
      <section className="ktpl-hero ktpl-hero-com">
        <Pk tone="dam" height="100%" radius={0} label="PUPS · LYNGHEIA" />
        <div className="ktpl-hero-gradient" aria-hidden="true"></div>
        <div className="ktpl-hero-overlay">
          <div className="ktpl-hero-text">
            <div className="ktpl-hero-eyebrow">{kennel.location} · siden {kennel.since}</div>
            <h1 className="ktpl-hero-name">{kennel.name}</h1>
            <p className="ktpl-hero-tagline">{kennel.tagline}</p>
            <TrustBadges kennel={kennel} tone="dark" />
          </div>
          <div className="ktpl-hero-cta">
            <button className="pk-btn pk-btn-warm pk-btn-lg" onClick={onApplyPuppy}>
              Se ledige valper {Ki.arrow}
            </button>
          </div>
        </div>
      </section>

      {/* Tilgjengelige valper — HERO section */}
      <section className="ktpl-sec ktpl-puppies-hero" id="valper">
        <header className="ktpl-puppies-head">
          <div>
            <div className="sec-eyebrow">Aktuelt kull</div>
            <h2 className="sec-title">{av.available} ledige valper · født {av.born}</h2>
            <p className="ktpl-puppies-sub">{av.note}</p>
          </div>
          <div className="ktpl-puppies-cta">
            <button className="pk-btn pk-btn-warm pk-btn-lg" onClick={onApplyPuppy}>Søk om valp {Ki.arrow}</button>
          </div>
        </header>

        <div className="ktpl-puppies-photo">
          <Pk tone="dam" height={320} radius={8} label="8 VALPER · 2 DAGER" />
          <div className="ktpl-puppies-overlay">
            <div className="ktpl-puppies-overlay-stat">
              <strong>{av.total}</strong>
              <span>født</span>
            </div>
            <div className="ktpl-puppies-overlay-stat is-warm">
              <strong>{av.available}</strong>
              <span>ledige</span>
            </div>
            <div className="ktpl-puppies-overlay-stat">
              <strong>{av.reservedDeposit}</strong>
              <span>reservert</span>
            </div>
          </div>
        </div>

        <div className="ktpl-puppies-meta">
          <div><strong>Far:</strong> {av.sire}</div>
          <div><strong>Mor:</strong> {av.dam}</div>
          <div><strong>Levering:</strong> uke 28 (~7. juli 2026)</div>
        </div>
      </section>

      {/* Slik får du valp fra oss */}
      <section className="ktpl-sec ktpl-process">
        <SectionHead eyebrow="Slik fungerer det" title="Slik får du valp fra oss" sub="Tre steg fra første spørsmål til hjemkomst. Vi tar oss god tid." />
        <div className="ktpl-process-steps">
          {kennel.process.map((p) => (
            <div key={p.n} className="ktpl-process-step">
              <div className="ktpl-process-num">{p.n}</div>
              <h4>{p.t}</h4>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Helsegaranti */}
      <section className="ktpl-sec ktpl-warranty">
        <SectionHead eyebrow="Trygghet" title="Helsegaranti og kontrakt" />
        <div className="ktpl-warranty-grid">
          <ul className="ktpl-warranty-list">
            {kennel.guarantees.map((g, i) => (
              <li key={i}>
                <span className="ktpl-warranty-check">{Ki.check}</span>
                {g}
              </li>
            ))}
          </ul>
          <div className="ktpl-warranty-card">
            <div className="sec-eyebrow">Standard-kontrakt</div>
            <h4>NKK-mal med våre tillegg</h4>
            <p>Du får kontrakten på e-post før betaling. Den er åpen og leselig — ingen overraskelser.</p>
            <button className="pk-btn pk-btn-secondary">Last ned eksempel</button>
          </div>
        </div>
      </section>

      {/* Anmeldelser */}
      <section className="ktpl-sec ktpl-reviews">
        <SectionHead
          eyebrow="Anmeldelser"
          title="Hva tidligere valpekjøpere sier"
          action={
            <div className="ktpl-reviews-dots">
              {kennel.testimonials.map((_, i) => (
                <button key={i} className={`ktpl-rev-dot ${i === tIdx ? "is-on" : ""}`} onClick={() => setTIdx(i)} aria-label={`Vis anmeldelse ${i + 1}`}></button>
              ))}
            </div>
          }
        />
        <div className="ktpl-reviews-stack">
          {kennel.testimonials.map((t, i) => (
            <article key={i} className={`ktpl-rev-card ${i === tIdx ? "is-active" : ""}`}>
              <div className="ktpl-rev-stars">
                {[1,2,3,4,5].map(s => <span key={s} className="ktpl-rev-star">{Ki.star}</span>)}
              </div>
              <blockquote className="ktpl-rev-quote">“{t.t}”</blockquote>
              <footer className="ktpl-rev-foot">
                <div>
                  <div className="ktpl-rev-who">{t.who}</div>
                  <div className="ktpl-rev-sub">{t.who_sub} · {t.year}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Foreldre i kullet */}
      <section className="ktpl-sec ktpl-parents" id="hunder">
        <SectionHead eyebrow="Foreldre i kullet" title="Hvem er valpene etter?" />
        <div className="ktpl-parents-grid">
          {kennel.parents.map((p) => (
            <PubDogCard key={p.id} dog={p} onTap={() => onTapDog(p.id)} kind="commercial" />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="ktpl-sec ktpl-faq">
        <SectionHead eyebrow="Spørsmål" title="Ofte stilte spørsmål" />
        <div className="ktpl-faq-list">
          {kennel.faq.map((f, i) => (
            <div key={i} className={`ktpl-faq-item ${openFaq === i ? "is-open" : ""}`}>
              <button className="ktpl-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="ktpl-faq-chev">{openFaq === i ? Ki.chevD : Ki.chev}</span>
              </button>
              {openFaq === i && <div className="ktpl-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Om oss */}
      <section className="ktpl-sec ktpl-about-com" id="om">
        <div className="ktpl-about-grid">
          <div className="ktpl-about-photo">
            <Pk tone="sire" height={260} radius={8} label="HANNE · STAVANGER" />
          </div>
          <div className="ktpl-about-text">
            <div className="sec-eyebrow">Om Hanne</div>
            <h2 className="sec-title">Hanne Lyng, oppdretter siden {kennel.since}</h2>
            <p>{kennel.about}</p>
            <div className="ktpl-planned">
              <div className="sec-eyebrow">Planlagt kull</div>
              <div className="ktpl-planned-name">{kennel.plannedLitter.label}</div>
              <div className="ktpl-planned-meta">{kennel.plannedLitter.parents} · {kennel.plannedLitter.when}</div>
              <button className="pk-btn pk-btn-secondary">Forhåndspåmelding</button>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="ktpl-sec ktpl-contact-com" id="kontakt">
        <div className="ktpl-contact-com-grid">
          <div>
            <div className="sec-eyebrow">Kontakt</div>
            <h2 className="sec-title">Klar for å snakke om en valp?</h2>
            <p>Send oss en e-post eller ring. Vi svarer alle.</p>
            <ul className="ktpl-contact-lines">
              <li>{Ki.mail} {kennel.contact.email}</li>
              <li>{Ki.phone} {kennel.contact.phone}</li>
              <li>{Ki.pin} {kennel.contact.postal}</li>
            </ul>
          </div>
          <button className="pk-btn pk-btn-warm pk-btn-lg" onClick={onApplyPuppy}>
            Send valpesøknad {Ki.arrow}
          </button>
        </div>
      </section>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PUBLIC DOG PAGE (Astor)
// ═════════════════════════════════════════════════════════════════════════════
function PublicDogPage({ dog, kennel, onBack, onTapPedigree, onContact }) {
  return (
    <div className="public-dog">
      <header className="public-dog-nav">
        <button className="pdog-back" onClick={onBack}>{Ki.back} {kennel.name}</button>
        <div className="public-dog-crumb">Hundene våre · {dog.callName}</div>
      </header>

      <section className="public-dog-hero">
        <Pk tone="elkhound" height="100%" radius={0} label="ASTOR · OFFICIAL" />
        <div className="public-dog-hero-overlay">
          <div className="title-row">
            {dog.titles.map(t => <span key={t} className="title-chip-pk">{t}</span>)}
          </div>
          <h1 className="public-dog-name">{dog.fullName}</h1>
          <div className="public-dog-meta">
            <span>{dog.breed}</span>
            <span className="dot-sep">·</span>
            <span>{dog.sex}</span>
            <span className="dot-sep">·</span>
            <span>Født {dog.born}</span>
            <span className="dot-sep">·</span>
            <span>{dog.color}</span>
          </div>
        </div>
      </section>

      <section className="public-dog-sec">
        <SectionHead eyebrow="Helse" title="Verifiserte helseresultater" sub="Alle sertifikater er gjennomgått av NKK eller akkreditert laboratorium." />
        <div className="public-health-grid">
          {dog.health.map((h, i) => (
            <div key={i} className={`pub-health-card s-${h.state}`}>
              <div className="pub-health-k">{h.k}</div>
              <div className="pub-health-v">{h.v}</div>
              <div className="pub-health-d">{h.d}</div>
              <span className="pub-health-tick">{Ki.check}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="public-dog-sec">
        <SectionHead
          eyebrow="Stamtavle"
          title="3 generasjoner"
          action={<button className="pk-btn pk-btn-link" onClick={onTapPedigree}>Se hele stamtavlen {Ki.arrow}</button>}
        />
        <div className="public-pedigree-tree">
          <div className="ppt-col">
            <div className="ppt-col-label">Focal</div>
            <div className="ppt-node is-focal">
              <div className="ppt-titles">{dog.pedigree.focal === dog.callName + " av Granheim" ? "FOCAL" : ""}</div>
              <div className="ppt-name">{dog.pedigree.focal}</div>
            </div>
          </div>
          <div className="ppt-col">
            <div className="ppt-col-label">Foreldre</div>
            <div className="ppt-node is-sire">
              <div className="ppt-titles">{dog.pedigree.sire.titles}</div>
              <div className="ppt-name">{dog.pedigree.sire.name}</div>
            </div>
            <div className="ppt-node is-dam">
              <div className="ppt-titles">{dog.pedigree.dam.titles}</div>
              <div className="ppt-name">{dog.pedigree.dam.name}</div>
            </div>
          </div>
          <div className="ppt-col">
            <div className="ppt-col-label">Besteforeldre</div>
            {dog.pedigree.gp.map((g, i) => (
              <div key={i} className={`ppt-node ${g.sex === "m" ? "is-sire" : "is-dam"}`}>
                <div className="ppt-titles">{g.titles}</div>
                <div className="ppt-name">{g.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="public-dog-sec">
        <SectionHead eyebrow="Resultater" title="Utstilling og titler" />
        <div className="public-results">
          {dog.results.map((r, i) => (
            <div key={i} className="public-result-row">
              <span className="public-result-y">{r.y}</span>
              <span className="public-result-t">{r.t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="public-dog-sec">
        <SectionHead eyebrow="Galleri" title="Bilder av Astor" sub="12 av 47 bilder vist offentlig." />
        <div className="public-gallery">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="public-gallery-cell">
              <Pk tone="elkhound" width="100%" height="100%" radius={4} label={`${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="public-dog-sec public-dog-contact">
        <h3>Kontakt {kennel.owners} om Astor</h3>
        <p>Spørsmål om avlsbruk, valpekull eller besøk?</p>
        <button className="pk-btn pk-btn-primary pk-btn-lg" onClick={onContact}>Kontakt oppdretter {Ki.arrow}</button>
      </section>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PUBLIC MEMORIAL PAGE (Vidar)
// ═════════════════════════════════════════════════════════════════════════════
function PublicMemorialPage({ dog, kennel, onBack }) {
  const [draft, setDraft] = useStateK("");
  const [messages, setMessages] = useStateK(dog.messages);

  const submit = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const d = `${now.getDate()}. ${["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des"][now.getMonth()]} ${now.getFullYear()}`;
    setMessages([{ who: "Du", role: "Besøkende", d, t: draft }, ...messages]);
    setDraft("");
  };

  return (
    <div className="public-memorial">
      <header className="public-dog-nav">
        <button className="pdog-back" onClick={onBack}>{Ki.back} {kennel.name}</button>
        <div className="public-dog-crumb">Minneside · {dog.fullName.split(" ")[1]}</div>
      </header>

      <div className="mem-wreath" aria-hidden="true"></div>

      <section className="mem-hero">
        <div className="mem-hero-frame">
          <Pk tone="elkhound" muted={true} height={320} radius={8} label="VIDAR · 2008–2022" />
        </div>
        <div className="mem-hero-text">
          <span className="mem-wreath-icon">{Ki.wreath}</span>
          <h1 className="mem-name">{dog.fullName}</h1>
          <div className="mem-dates">{dog.born} — {dog.died}</div>
          <div className="mem-age">{dog.ageAtDeath} år · {dog.breed} · {dog.sex}</div>
        </div>
      </section>

      <section className="mem-tribute">
        <div className="sec-eyebrow">Tribute fra Granheim</div>
        <p className="mem-tribute-text">{dog.tribute}</p>
        <p className="mem-signoff">— {kennel.owners}</p>
      </section>

      <section className="mem-gallery-sec">
        <h3>Bilder fra Vidars liv</h3>
        <div className="mem-gallery">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mem-gallery-cell">
              <Pk tone="elkhound" muted={true} width="100%" height="100%" radius={4} label={`${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="mem-messages">
        <h3>Minneord</h3>
        <div className="mem-msg-list">
          {messages.map((m, i) => (
            <article key={i} className="mem-msg">
              <header className="mem-msg-head">
                <div>
                  <div className="mem-msg-who">{m.who}</div>
                  <div className="mem-msg-role">{m.role}</div>
                </div>
                <div className="mem-msg-date">{m.d}</div>
              </header>
              <p className="mem-msg-body">"{m.t}"</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mem-compose">
        <div className="sec-eyebrow">Send et minneord</div>
        <h3>Skriv noen ord til Vidar</h3>
        <textarea
          className="mem-input"
          placeholder="Skriv noen ord — kort eller langt. Familien Granheim leser alle."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
        />
        <button className="pk-btn pk-btn-primary" onClick={submit} disabled={!draft.trim()}>
          Send minneord {Ki.arrow}
        </button>
      </section>
    </div>
  );
}

Object.assign(window, {
  TemplateA, TemplateB, PublicDogPage, PublicMemorialPage,
});
