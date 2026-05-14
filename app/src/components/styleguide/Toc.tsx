/**
 * Sidebar table of contents for the design system reference page.
 * Sticky on desktop, hidden on mobile (use scroll on small screens).
 */
type TocGroup = {
  group: string;
  items: { href: string; label: string }[];
};

const groups: TocGroup[] = [
  {
    group: "Foundations",
    items: [
      { href: "#color", label: "Color" },
      { href: "#typography", label: "Typography" },
      { href: "#spacing", label: "Spacing & layout" },
      { href: "#radius", label: "Radius" },
      { href: "#shadow", label: "Elevation" },
    ],
  },
  {
    group: "Components",
    items: [
      { href: "#buttons", label: "Buttons" },
      { href: "#forms", label: "Form inputs" },
      { href: "#cards", label: "Cards" },
      { href: "#tags", label: "Tags & badges" },
    ],
  },
  {
    group: "Navigation",
    items: [
      { href: "#nav-mobile", label: "Mobile bars" },
      { href: "#nav-desktop", label: "Desktop side nav" },
    ],
  },
  {
    group: "Patterns",
    items: [
      { href: "#empty", label: "Empty & loading" },
      { href: "#toast", label: "Toast & dialog" },
      { href: "#sheet", label: "Bottom sheet" },
    ],
  },
  {
    group: "Dog-specific",
    items: [
      { href: "#pedigree", label: "Pedigree node" },
      { href: "#health", label: "Health results" },
      { href: "#photogrid", label: "Photo grid" },
      { href: "#timeline", label: "Litter timeline" },
    ],
  },
];

export function Toc() {
  return (
    <aside
      className="hidden lg:block sticky top-0 self-start h-screen overflow-y-auto border-r border-n-100 pr-4 py-8"
      aria-label="Sections"
    >
      <div className="flex items-center gap-3 font-semibold text-base mb-2">
        <div className="w-7 h-7 rounded-lg bg-forest-700 grid place-items-center text-white font-bold text-sm tracking-[-0.02em]">
          D
        </div>
        DogWorld(tmp)
      </div>
      <p className="text-xs text-n-500 mb-6 font-mono">Design System · v0.1</p>
      <nav className="flex flex-col gap-0.5">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="text-[11px] text-n-500 font-medium uppercase tracking-[0.06em] px-2.5 pt-2.5 pb-1">
              {g.group}
            </p>
            {g.items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="text-sm text-n-700 px-2.5 py-1.5 rounded-btn hover:bg-n-50 hover:text-n-950 transition-colors"
              >
                {it.label}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
