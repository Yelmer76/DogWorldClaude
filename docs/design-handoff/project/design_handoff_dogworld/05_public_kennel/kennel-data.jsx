// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC KENNEL — data for Granheim (showcase) + Lyngheia (commercial)
//   + Astor public dog page + Vidar memorial
// ─────────────────────────────────────────────────────────────────────────────

const granheim = {
  id: "granheim",
  template: "show",
  name: "Kennel Granheim",
  prefix: "av Granheim",
  breed: "Norsk Elghund",
  owners: "Ole og Marit",
  since: 1998,
  location: "Lillehammer",
  nkkReg: "NO-Reg. 0341-1998",
  affiliations: ["NKK", "Norsk Elghund Klubb"],
  karmaTier: "Sølv",
  tagline: "Norsk Elghund — siden 1998. Linjeavl med fokus på helse, jaktevne og temperament.",
  about: "Vi har drevet Kennel Granheim fra gården vår utenfor Lillehammer siden 1998. Tre generasjoner hunder har vokst opp her — alle med samme grunnlag: A-hofter, klart sinn, og et arbeidsinstinkt vi har valgt og valgt om igjen. Vi er små, vi gjør ett kull i året, og hver valp drar hjem etter en lang prat ved kjøkkenbordet.",
  philosophy: "Vi avler for det vi selv vil ha i en elghund: rolig under stress, rask på jakt, mild med barn. Vi tester HD, ED, øyne, DM og prcd-PRA på alle avlsdyr. Vi rekrutterer ikke utenfra et nytt blod hvert år — vi har bygd en linje gjennom 26 år og passer på den. Linjeavl, ikke innavl. Vi bruker NKK-databasen og en egen pedigree-app for å holde oversikt.",
  contact: { email: "ole@granheim.no", phone: "+47 906 12 345", postal: "Lillehammergata 14, 2615 Lillehammer" },
  dogs: [
    { id: "astor", name: "Astor av Granheim", titles: ["NUCH", "NORDUCH"], sex: "m", born: "14. mars 2022", health: "HD A · ED 0 · DM N/N", tone: "sire", note: "Aktiv i avl" },
    { id: "saga",  name: "Saga vom Nordwald", titles: ["NUCH"], sex: "f", born: "11. august 2019", health: "HD A · Eyes klar 2025", tone: "dam", note: "Mor til Kull C" },
    { id: "bobby", name: "Bobby av Skogen",   titles: ["NUCH", "SE UCH"], sex: "m", born: "2. juni 2018", health: "HD A · ED 0", tone: "sire", note: "Far til Astor" },
    { id: "mira",  name: "Mira av Granheim",  titles: ["NUCH"], sex: "f", born: "22. april 2024", health: "Helsetester pågår", tone: "dam", note: "Solgt — i avlsbruk hos Kennel Lia" },
  ],
  litter: {
    name: "Kull C — «Stars of the Fjord»",
    born: "14. april 2026",
    parents: "Astor × Bella",
    age: "4 uker",
    total: 5,
    available: 2,
    photo: "litter-c",
  },
  results: [
    { d: "04. mai 2026", text: "BIS-1 NKK Bergen — Astor", judge: "A. Wenger (NO)", kind: "show" },
    { d: "12. apr 2026", text: "HD-resultat A (FCI) for Astor", kind: "health" },
    { d: "11. okt 2025", text: "BOS Stockholm Int. — Astor", judge: "M. Lindgren (SE)", kind: "show" },
    { d: "23. mar 2025", text: "CACIB NKK Oslo — Astor", judge: "H. Karlsson (FI)", kind: "show" },
    { d: "12. jul 2025", text: "NORDUCH bekreftet — Astor", kind: "title" },
  ],
  memorials: [
    { id: "vidar",    name: "Vidar av Granheim", years: "2008 – 2022" },
    { id: "linnea",   name: "Linnea av Granheim", years: "2003 – 2017" },
    { id: "charmant", name: "Charmant Bobby",     years: "2014 – 2023" },
  ],
};

// ── Lyngheia (commercial Labrador kennel) ───────────────────────────────────
const lyngheia = {
  id: "lyngheia",
  template: "commercial",
  name: "Kennel Lyngheia",
  prefix: "av Lyngheia",
  breed: "Labrador Retriever",
  owners: "Hanne Lyng",
  since: 2015,
  location: "Stavanger",
  nkkReg: "NO-Reg. 1103-2015",
  affiliations: ["NKK", "Norsk Retrieverklubb"],
  karmaTier: "Gull",
  tagline: "Labrador Retriever — gule og sorte. Familiehunder med mykt sinn og tydelig avlsstrategi.",
  about: "Hanne driver Kennel Lyngheia på Jæren — der det er åpne enger, kort til havet, og plass nok for et stort kull å løpe. Vi leverer 2–3 kull i året, alle med samme verdier: mykt sinn, sterk apport, og tilstrekkelig drive til både jakt og familieliv.",
  philosophy: "En valp fra Lyngheia skal kunne være familiehund og jakthund samtidig. Vi avler for mykt sinn, tydelig apport-instinkt, og helse som varer hele hunden gjennom. Alle avlsdyr testes for HD, ED, øyne, EIC, CNM og prcd-PRA. Vi avliver aldri på vekt — bare på temperament og helse.",
  contact: { email: "hanne@lyngheia.no", phone: "+47 901 23 456", postal: "Jærveien 88, 4070 Randaberg" },
  availablePuppies: {
    born: "12. mai 2026",
    age: "2 dager",
    total: 8,
    available: 4,
    reservedDeposit: 4,
    sire: "Lyngheia's Otis Black",
    dam: "Mira av Granheim",
    photo: "puppy-pile",
    note: "Alle 8 valper født friske. 4 fortsatt ledige, 4 har deposit-reservasjon.",
  },
  parents: [
    { id: "otis", name: "Lyngheia's Otis Black", titles: ["NUCH"], sex: "m", born: "2020", health: "HD A · ED 0 · prcd-PRA N/N · EIC N/N", tone: "sire" },
    { id: "mira", name: "Mira av Lyngheia",      titles: ["NUCH"], sex: "f", born: "2021", health: "HD A · ED 0 · EIC N/N · CNM N/N", tone: "dam" },
  ],
  plannedLitter: {
    label: "Q-kullet",
    when: "august 2026",
    parents: "Otis × Stella",
    notes: "Forhåndspåmelding åpen.",
  },
  process: [
    { n: "1", t: "Søk om valp", d: "Fyll ut søknadsskjemaet. Vi ringer alle innen 3 dager." },
    { n: "2", t: "Møt oss", d: "Du kommer på besøk når valpene er 5–6 uker — vi tar oss god tid." },
    { n: "3", t: "Hjem med valpen", d: "Levering ved 8 uker. Vi følger opp i flere år." },
  ],
  guarantees: [
    "2-års helsegaranti på HD og ED",
    "Levert med microchip, vaksinering og pass",
    "Tilbakekjøpsrett — vi tar valpen tilbake hvis du ikke kan ha den",
    "Livslang rådgivning",
    "Skriftlig kjøpskontrakt etter NKK-mal",
  ],
  testimonials: [
    { who: "Marie og Lars, Bergen", year: "2024", who_sub: "Eiere av «Pluto»", t: "Vi fikk en helt rolig og trygg labrador. Etter to år er han fortsatt den vi får mest komplimenter for av alle hundene i nabolaget." },
    { who: "Karin, Oslo", year: "2023", who_sub: "Eier av «Bella»", t: "Hanne tok seg tid til oss som førstegangs-eiere. Vi ringte henne mange ganger første året, og hun har alltid svart." },
    { who: "Familien Aas, Trondheim", year: "2024", who_sub: "Eiere av «Maja»", t: "Sykt sosial hund med barna. Vi har anbefalt Lyngheia til seks bekjente nå." },
    { who: "Jon, Kristiansand", year: "2022", who_sub: "Jeger og eier av «Tor»", t: "Tor apporterer alt — fra mygg til rev. Best i kullet på prøve. Stor takk til Hanne for et godt utvalg." },
  ],
  faq: [
    { q: "Hvor mye koster en valp?", a: "Pris i 2026 er 28 000 kr inkludert microchip, vaksinering, helseattest og pass. Vi tar 5 000 kr i depositum ved reservasjon." },
    { q: "Kan vi velge valp selv?", a: "Vi gjør valg sammen — vi kjenner valpene best ved 6 uker og parer dem med riktig familie. Du har vetorett." },
    { q: "Hva med levering?", a: "Vi leverer i Stavanger-området. Lengre reise: vi avtaler nærmere — typisk møter vi midt på Vestlandet." },
    { q: "Holder vi kontakt etterpå?", a: "Ja, alltid. Du er invitert i Lyngheia-facebookgruppa med alle valpene våre." },
    { q: "Hva hvis det ikke fungerer?", a: "Vi tar valpen tilbake. Alltid. Det står i kontrakten." },
  ],
};

// ── Astor public dog page ──────────────────────────────────────────────────
const astorPublic = {
  id: "astor",
  fullName: "NUCH NORDUCH Astor av Granheim",
  callName: "Astor",
  titles: ["NUCH", "NORDUCH"],
  breed: "Norsk Elghund",
  sex: "Hann",
  born: "14. mars 2022",
  color: "Grå (gråsvart)",
  breeder: "Kennel Granheim",
  owner: "Kennel Granheim",
  microchip: "578077000123456",
  regNo: "NO12345/22",
  health: [
    { k: "HD", v: "A (FCI)", state: "ok", d: "28. apr 2026" },
    { k: "ED", v: "0 / 0",   state: "ok", d: "28. apr 2026" },
    { k: "Øyne", v: "Klar",  state: "ok", d: "12. mar 2026" },
    { k: "DM", v: "N / N",   state: "ok", d: "21. aug 2023" },
    { k: "prcd-PRA", v: "N / N", state: "ok", d: "21. aug 2023" },
  ],
  pedigree: {
    focal: "Astor av Granheim",
    sire: { name: "Bobby av Skogen", titles: "NUCH SE UCH", sex: "m" },
    dam:  { name: "Saga vom Nordwald", titles: "NUCH",       sex: "f" },
    gp: [
      { name: "Skagen av Fjordlund",    titles: "NUCH",       sex: "m" },
      { name: "Linnea av Granheim",     titles: "NORDUCH",    sex: "f" },
      { name: "Kaiser vom Hochwald",    titles: "DE VDH-CH",  sex: "m" },
      { name: "Greta vom Schwarzwald",  titles: "SE UCH",     sex: "f" },
    ],
  },
  results: [
    { y: "2026", t: "BIS-1 · NKK Bergen — A. Wenger" },
    { y: "2025", t: "NORDUCH bekreftet" },
    { y: "2025", t: "BOS · Stockholm Int. — M. Lindgren" },
    { y: "2024", t: "NUCH bekreftet" },
    { y: "2024", t: "CACIB · NKK Oslo — H. Karlsson" },
  ],
};

// ── Vidar memorial ──────────────────────────────────────────────────────────
const vidarMemorial = {
  id: "vidar",
  fullName: "NUCH Vidar av Granheim",
  born: "5. juni 2008",
  died: "23. november 2022",
  ageAtDeath: "14 år",
  breed: "Norsk Elghund",
  sex: "Hann",
  tribute:
    "Vidar kom til oss en stille junidag i 2008. Han var den minste i kullet — vi husker fortsatt hvordan han trasket etter Ole rundt i hagen den første sommeren, alltid noen meter bak. Vidar ble hjørnesteinen vår: rolig på utstilling, eksellent på jakt, og han elsket barna våre over alt annet. Det er 24 valper i Norge med Vidar som far. Han ble 14 år — to år lenger enn vi hadde turt å håpe. Vi savner ham hver dag.",
  messages: [
    { who: "Marit Granheim", role: "Eier",     d: "23. nov 2022", t: "Sov stille, gutten min. Du var den beste vennen jeg har hatt." },
    { who: "Aud og Per",     role: "Eiere av «Saga» (Vidars datter)", d: "25. nov 2022", t: "Saga har Vidars rolige sinn — vi tenker på ham hver gang hun ser oss inn i øynene. Tusen takk, Granheim." },
    { who: "Trond, Hamar",   role: "Jaktkamerat",  d: "27. nov 2022", t: "Den beste elghunden jeg har hatt på laget. Vidar fant sporet hver gang. Hviler i fred." },
    { who: "Eva, NKK",       role: "Dommer",       d: "30. nov 2022", t: "Jeg dømte Vidar tre ganger. Han hadde alt — type, gemytt, og noe ekstra som ikke står i standarden." },
    { who: "Ingrid, Bergen", role: "Eier av «Astor» (barnebarn)", d: "1. des 2022", t: "Astor minner oss om Vidar daglig. Linjen lever videre." },
  ],
};

// ── Application form (modal) ────────────────────────────────────────────────
const applicationFormDefaults = {
  household: "Familie med to barn (8, 11)",
  experience: "Vi har hatt Labrador før (16 år, 2008–2024)",
  housing: "Enebolig med inngjerdet hage",
  activity: "Tur, jakt, hverdag",
  motivation: "",
};

const navItems = [
  { id: "om",       label: "Om oss" },
  { id: "hunder",   label: "Hundene våre" },
  { id: "valper",   label: "Valper" },
  { id: "kull",     label: "Kull" },
  { id: "galleri",  label: "Galleri" },
  { id: "minne",    label: "Minneside" },
  { id: "kontakt",  label: "Kontakt" },
];

Object.assign(window, {
  granheim, lyngheia, astorPublic, vidarMemorial,
  applicationFormDefaults, navItems,
});
