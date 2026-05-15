/**
 * Extra litter fixtures not in universe.ts — daily log + stage list.
 * The universe has Litter, puppies, and applications; this file fills
 * in the journal entries and the lifecycle steps shown on the page.
 */

export type LitterStageId =
  | "planned"
  | "mated"
  | "pregnant"
  | "whelped"
  | "rearing"
  | "delivery"
  | "done";

export const litterStages: { id: LitterStageId; label: string }[] = [
  { id: "planned", label: "Planlagt" },
  { id: "mated", label: "Paret" },
  { id: "pregnant", label: "Drektig" },
  { id: "whelped", label: "Født" },
  { id: "rearing", label: "Oppfostring" },
  { id: "delivery", label: "Levering" },
  { id: "done", label: "Avsluttet" },
];

export type LogEntry = {
  d: string;
  week: number;
  day: number;
  summary: string;
};

export const dailyLog: LogEntry[] = [
  {
    d: "27. apr 2026",
    week: 4,
    day: 13,
    summary:
      "Alle veier mer enn 2,8 kg. Loke er den største (3,3 kg). ENS dag 5 fullført.",
  },
  {
    d: "26. apr 2026",
    week: 4,
    day: 12,
    summary:
      "Første solid-food forsøk — soaked kibble. Mira spiste mest.",
  },
  {
    d: "25. apr 2026",
    week: 4,
    day: 11,
    summary:
      "Eyes fully open. Hørselen er på vei. Idun reagerte på navn første gang.",
  },
  {
    d: "23. apr 2026",
    week: 3,
    day: 9,
    summary:
      "ENS dag 1 startet. Veiing kl. 09:00 og 21:00. Alle pluss-utvikling.",
  },
  {
    d: "20. apr 2026",
    week: 3,
    day: 6,
    summary:
      "Avføring normal hos alle. Sagas mage er igjen i god form etter valping.",
  },
];
