"use client";

/**
 * InlineField — THE foundational interaction pattern of DogWorld(tmp).
 *
 * Per design handoff (canonical):
 *   "Tap any value → input replaces in place → blur auto-saves → toast 'Lagret'.
 *    NEVER save/cancel buttons. Apple Notes / Notion paradigm."
 *
 * Behavior:
 *   - Display state shows the value as text with subtle hover affordance
 *   - Click (or focus) → input/textarea appears in-place, autofocus, forest underline
 *   - Enter → commit + blur (multiline: Shift+Enter for newline)
 *   - Blur → commit (auto-save) + show "Lagret" feedback
 *   - Escape → revert and exit edit mode
 *   - Empty + no placeholder → shows muted "Legg til …" affordance
 *
 * The component is presentation-only. Persistence + toast are handled by
 * the parent via `onSave`. In Sprint 3 the parent handles the toast locally;
 * in production this routes through a global toast context.
 */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type InlineFieldProps = {
  /** Current value */
  value: string;
  /** Called with the new value when user commits */
  onSave?: (value: string) => void;
  /** Placeholder shown when value is empty */
  placeholder?: string;
  /** Render textarea instead of single-line input */
  multiline?: boolean;
  /** Use mono font (for credentials, dates, numbers) */
  mono?: boolean;
  /** Use larger text (for name fields) */
  size?: "sm" | "md" | "lg";
  /** Accessible label — describes what is being edited */
  ariaLabel: string;
  /** Override display rendering (e.g. show titles + name styled) */
  renderDisplay?: (value: string) => ReactNode;
  /** When true, field is locked (read-only display, no edit) */
  readOnly?: boolean;
};

const sizeClasses = {
  sm: "text-sm leading-snug",
  md: "text-base leading-snug",
  lg: "text-lg leading-snug font-medium",
} as const;

export function InlineField({
  value,
  onSave,
  placeholder,
  multiline = false,
  mono = false,
  size = "md",
  ariaLabel,
  renderDisplay,
  readOnly = false,
}: InlineFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const id = useId();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Sync external value changes (e.g. parent updates) when not editing
  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  // Autofocus + place cursor at end on edit-enter
  useEffect(() => {
    if (editing && inputRef.current) {
      const el = inputRef.current;
      el.focus();
      const end = el.value.length;
      el.setSelectionRange(end, end);
    }
  }, [editing]);

  function commit() {
    setEditing(false);
    if (draft !== value) onSave?.(draft);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKey(
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    } else if (e.key === "Enter" && !(multiline && e.shiftKey)) {
      e.preventDefault();
      commit();
    }
  }

  const baseFieldClass =
    "w-full bg-transparent outline-none border-0 border-b-2 border-forest-700 px-0 py-0.5 text-n-950 caret-forest-700 " +
    (mono ? "font-mono " : "") +
    sizeClasses[size];

  if (editing && !readOnly) {
    return multiline ? (
      <textarea
        ref={(el) => {
          inputRef.current = el;
        }}
        id={id}
        aria-label={ariaLabel}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKey}
        className={`${baseFieldClass} resize-none min-h-[3rem]`}
        rows={Math.max(2, draft.split("\n").length)}
      />
    ) : (
      <input
        ref={(el) => {
          inputRef.current = el;
        }}
        id={id}
        aria-label={ariaLabel}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKey}
        className={baseFieldClass}
      />
    );
  }

  // Display state
  const isEmpty = !value || value.length === 0;
  const displayContent = isEmpty
    ? placeholder ?? "Legg til …"
    : renderDisplay
      ? renderDisplay(value)
      : value;

  const displayClass =
    "block w-full text-left rounded-[2px] -mx-0.5 px-0.5 transition-colors " +
    (mono ? "font-mono " : "") +
    sizeClasses[size] +
    (readOnly
      ? " text-n-950 cursor-default"
      : isEmpty
        ? " text-n-500 italic cursor-text hover:bg-n-50"
        : " text-n-950 cursor-text hover:bg-n-50");

  if (readOnly) {
    return (
      <span aria-label={ariaLabel} className={displayClass}>
        {displayContent}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Rediger ${ariaLabel}`}
      onClick={() => setEditing(true)}
      onFocus={() => setEditing(true)}
      className={displayClass}
    >
      {displayContent}
    </button>
  );
}
