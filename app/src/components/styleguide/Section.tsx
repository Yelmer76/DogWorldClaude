/**
 * Shared section wrapper for the design system reference page.
 * Renders a numbered label, h2, lead paragraph, and content slot.
 */
type Props = {
  id: string;
  /** Numbered prefix shown above title, e.g. "01 · Foundations" */
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  /** First section omits the top border */
  first?: boolean;
};

export function Section({ id, label, title, description, children, first }: Props) {
  return (
    <section
      id={id}
      className={
        "py-12 scroll-mt-6 " + (first ? "" : "border-t border-n-100")
      }
    >
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.08em] font-semibold text-ochre-700">
          {label}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] mt-2 mb-3 text-n-950">
          {title}
        </h2>
        <p className="text-base text-n-700 max-w-[64ch]">{description}</p>
      </header>
      {children}
    </section>
  );
}

/**
 * Smaller subhead used inside sections to label sub-groups
 * (e.g. "Brand", "State — muted Nordic")
 */
export function SubHead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={
        "text-xs uppercase tracking-[0.06em] font-medium text-n-500 mb-3 mt-8 first:mt-0 " +
        className
      }
    >
      {children}
    </p>
  );
}
