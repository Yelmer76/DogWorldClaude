/**
 * Public Kennel — Granheim "show" template fixtures.
 * Lifted from docs/design-handoff/project/kennel-data.jsx and translated
 * into typed structures (Norwegian copy preserved).
 */

export type PublicDog = {
  id: string;
  name: string;
  titles: string[];
  sex: "m" | "f";
  born: string;
  health: string;
  tone: "sire" | "dam";
  note: string;
};

export type ResultRow = {
  d: string;
  text: string;
  judge?: string;
  kind: "show" | "health" | "title";
};

export type Memorial = { id: string; name: string; years: string };

export const granheimPublic = {
  id: "granheim",
  name: "Kennel Granheim",
  prefix: "av Granheim",
  breed: "Norsk Elghund",
  owners: "Ole og Marit",
  since: 1998,
  location: "Lillehammer",
  nkkReg: "NO-Reg. 0341-1998",
  affiliations: ["NKK", "Norsk Elghund Klubb"],
  karmaTier: "Sølv" as const,
  tagline:
    "Norsk Elghund — siden 1998. Linjeavl med fokus på helse, jaktevne og temperament.",
  about:
    "Vi har drevet Kennel Granheim fra gården vår utenfor Lillehammer siden 1998. Tre generasjoner hunder har vokst opp her — alle med samme grunnlag: A-hofter, klart sinn, og et arbeidsinstinkt vi har valgt og valgt om igjen. Vi er små, vi gjør ett kull i året, og hver valp drar hjem etter en lang prat ved kjøkkenbordet.",
  philosophy:
    "Vi avler for det vi selv vil ha i en elghund: rolig under stress, rask på jakt, mild med barn. Vi tester HD, ED, øyne, DM og prcd-PRA på alle avlsdyr. Vi rekrutterer ikke utenfra et nytt blod hvert år — vi har bygd en linje gjennom 26 år og passer på den. Linjeavl, ikke innavl. Vi bruker NKK-databasen og en egen pedigree-app for å holde oversikt.",
  contact: {
    email: "ole@granheim.no",
    phone: "+47 906 12 345",
    postal: "Lillehammergata 14, 2615 Lillehammer",
  },
  dogs: [
    {
      id: "astor",
      name: "Astor av Granheim",
      titles: ["NUCH", "NORDUCH"],
      sex: "m",
      born: "14. mars 2022",
      health: "HD A · ED 0 · DM N/N",
      tone: "sire",
      note: "Aktiv i avl",
    },
    {
      id: "saga",
      name: "Saga vom Nordwald",
      titles: ["NUCH"],
      sex: "f",
      born: "11. august 2019",
      health: "HD A · Eyes klar 2025",
      tone: "dam",
      note: "Mor til Kull C",
    },
    {
      id: "bobby",
      name: "Bobby av Skogen",
      titles: ["NUCH", "SE UCH"],
      sex: "m",
      born: "2. juni 2018",
      health: "HD A · ED 0",
      tone: "sire",
      note: "Far til Astor",
    },
    {
      id: "mira",
      name: "Mira av Granheim",
      titles: ["NUCH"],
      sex: "f",
      born: "22. april 2024",
      health: "Helsetester pågår",
      tone: "dam",
      note: "Solgt — i avlsbruk hos Kennel Lia",
    },
  ] satisfies PublicDog[],
  litter: {
    name: "Kull C — «Stars of the Fjord»",
    born: "14. april 2026",
    parents: "Astor × Bella",
    age: "4 uker",
    total: 5,
    available: 2,
  },
  results: [
    {
      d: "04. mai 2026",
      text: "BIS-1 NKK Bergen — Astor",
      judge: "A. Wenger (NO)",
      kind: "show",
    },
    {
      d: "12. apr 2026",
      text: "HD-resultat A (FCI) for Astor",
      kind: "health",
    },
    {
      d: "11. okt 2025",
      text: "BOS Stockholm Int. — Astor",
      judge: "M. Lindgren (SE)",
      kind: "show",
    },
    {
      d: "23. mar 2025",
      text: "CACIB NKK Oslo — Astor",
      judge: "H. Karlsson (FI)",
      kind: "show",
    },
    {
      d: "12. jul 2025",
      text: "NORDUCH bekreftet — Astor",
      kind: "title",
    },
  ] satisfies ResultRow[],
  memorials: [
    { id: "vidar", name: "Vidar av Granheim", years: "2008 – 2022" },
    { id: "linnea", name: "Linnea av Granheim", years: "2003 – 2017" },
    { id: "charmant", name: "Charmant Bobby", years: "2014 – 2023" },
  ] satisfies Memorial[],
};

export const kennelNavItems = [
  { id: "om", label: "Om oss" },
  { id: "hunder", label: "Hundene våre" },
  { id: "valper", label: "Valper" },
  { id: "resultater", label: "Resultater" },
  { id: "minne", label: "Minneside" },
  { id: "kontakt", label: "Kontakt" },
];
