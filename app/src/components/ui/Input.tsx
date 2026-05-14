import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

export type InputState = "default" | "filled" | "focus" | "error" | "disabled";

const baseInput =
  "font-[inherit] text-sm py-2.5 px-3 border rounded-btn bg-bg-card text-n-950 w-full transition-colors duration-75 placeholder:text-n-500";

function inputStateClasses(state: InputState): string {
  switch (state) {
    case "filled":
      return "border-n-200";
    case "focus":
      return "border-forest-700 outline-none [box-shadow:0_0_0_3px_rgba(63,90,85,0.18)]";
    case "error":
      return "border-error-dot [box-shadow:0_0_0_3px_rgba(168,80,74,0.10)]";
    case "disabled":
      return "border-n-200 bg-n-50 text-n-500 cursor-not-allowed";
    default:
      return "border-n-200 focus:border-forest-700 focus:outline-none focus:[box-shadow:0_0_0_3px_rgba(63,90,85,0.18)]";
  }
}

export type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, hint, error, children, className = "" }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-n-950">{label}</label>
      {children}
      {error ? (
        <div className="text-xs text-error-fg">{error}</div>
      ) : hint ? (
        <div className="text-xs text-n-500">{hint}</div>
      ) : null}
    </div>
  );
}

// ── Text input ───────────────────────────────────────────────────────────────
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  state?: InputState;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ state = "default", className = "", ...rest }, ref) {
    return (
      <input
        ref={ref}
        disabled={state === "disabled" || rest.disabled}
        className={`${baseInput} ${inputStateClasses(state)} ${className}`.trim()}
        {...rest}
      />
    );
  },
);

// ── Textarea ─────────────────────────────────────────────────────────────────
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  state?: InputState;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ state = "default", className = "", ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        disabled={state === "disabled" || rest.disabled}
        className={`${baseInput} ${inputStateClasses(state)} min-h-[88px] resize-y leading-snug ${className}`.trim()}
        {...rest}
      />
    );
  },
);

// ── Select ───────────────────────────────────────────────────────────────────
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  state?: InputState;
};

const chevron =
  "background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%235d5d5d' stroke-width='1.5' stroke-linecap='round'><polyline points='3,5 6,8 9,5'/></svg>\");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px;appearance:none";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ state = "default", className = "", style, children, ...rest }, ref) {
    // Inline style needed for the data: url chevron because Tailwind has
    // limited support for raw url() with reserved chars.
    const inlineStyle = style ?? {};
    return (
      <select
        ref={ref}
        disabled={state === "disabled" || rest.disabled}
        className={`${baseInput} ${inputStateClasses(state)} ${className}`.trim()}
        style={{ ...inlineStyle, ...parseInline(chevron) }}
        {...rest}
      >
        {children}
      </select>
    );
  },
);

function parseInline(s: string): React.CSSProperties {
  const out: Record<string, string> = {};
  s.split(";").forEach((pair) => {
    const [k, v] = pair.split(":");
    if (k && v) out[toCamel(k.trim())] = v.trim();
  });
  return out as React.CSSProperties;
}
function toCamel(k: string): string {
  return k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// ── Date input (text input with calendar icon) ───────────────────────────────
export type DateInputProps = InputHTMLAttributes<HTMLInputElement> & {
  state?: InputState;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput({ state = "default", className = "", ...rest }, ref) {
    return (
      <div className="relative">
        <input
          ref={ref}
          disabled={state === "disabled" || rest.disabled}
          className={`${baseInput} ${inputStateClasses(state)} pr-9 ${className}`.trim()}
          {...rest}
        />
        <span
          aria-hidden
          className="absolute right-3 top-1/2 -translate-y-1/2 text-n-500 pointer-events-none"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M8 3v4M16 3v4M3.5 10h17" />
          </svg>
        </span>
      </div>
    );
  },
);
