/**
 * Choice primitives — Checkbox, Radio, Toggle.
 * All support a `state` prop for styleguide demos showing all visual states.
 * In production, control via `checked` / `onChange` like normal inputs.
 */
import type { ReactNode } from "react";

export type ChoiceState = "default" | "checked" | "focus" | "disabled";

type CheckboxProps = {
  state?: ChoiceState;
  children: ReactNode;
  className?: string;
};

export function Checkbox({ state = "default", children, className = "" }: CheckboxProps) {
  const isChecked = state === "checked";
  const isDisabled = state === "disabled";
  const isFocus = state === "focus";

  const boxBase =
    "w-[18px] h-[18px] rounded-[4px] border-[1.5px] grid place-items-center flex-shrink-0 transition-colors duration-75";
  const boxState = isChecked
    ? "bg-forest-700 border-forest-700"
    : isDisabled
      ? "bg-n-50 border-n-200"
      : "bg-bg-card border-n-300";
  const boxFocus = isFocus
    ? "[box-shadow:0_0_0_3px_rgba(63,90,85,0.18)]"
    : "";

  return (
    <label
      className={
        "flex items-center gap-2 text-sm select-none " +
        (isDisabled ? "text-n-500 cursor-not-allowed " : "text-n-950 cursor-pointer ") +
        className
      }
    >
      <span className={`${boxBase} ${boxState} ${boxFocus}`}>
        {isChecked && (
          <svg
            viewBox="0 0 12 8"
            width="10"
            height="6"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1,4 4,7 11,1" />
          </svg>
        )}
      </span>
      <span>{children}</span>
    </label>
  );
}

type RadioProps = CheckboxProps;

export function Radio({ state = "default", children, className = "" }: RadioProps) {
  const isChecked = state === "checked";
  const isDisabled = state === "disabled";
  const isFocus = state === "focus";

  const boxBase =
    "w-[18px] h-[18px] rounded-full border-[1.5px] grid place-items-center flex-shrink-0 transition-colors duration-75";
  const boxState = isChecked
    ? "bg-bg-card border-forest-700"
    : isDisabled
      ? "bg-n-50 border-n-200"
      : "bg-bg-card border-n-300";
  const boxFocus = isFocus ? "[box-shadow:0_0_0_3px_rgba(63,90,85,0.18)]" : "";

  return (
    <label
      className={
        "flex items-center gap-2 text-sm select-none " +
        (isDisabled ? "text-n-500 cursor-not-allowed " : "text-n-950 cursor-pointer ") +
        className
      }
    >
      <span className={`${boxBase} ${boxState} ${boxFocus}`}>
        {isChecked && (
          <span className="w-2.5 h-2.5 rounded-full bg-forest-700" />
        )}
      </span>
      <span>{children}</span>
    </label>
  );
}

type ToggleProps = {
  state?: "off" | "on" | "disabled";
  children?: ReactNode;
  className?: string;
};

export function Toggle({ state = "off", children, className = "" }: ToggleProps) {
  const isOn = state === "on";
  const isDisabled = state === "disabled";

  const trackBase =
    "w-9 h-5 rounded-full relative transition-colors duration-150 flex-shrink-0 inline-block";
  const trackColor = isOn ? "bg-forest-700" : "bg-n-200";
  const trackOpacity = isDisabled ? "opacity-50" : "";

  const knobBase =
    "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-[0_1px_2px_rgba(26,26,26,0.04),0_1px_1px_rgba(26,26,26,0.03)] transition-[left] duration-150";
  const knobPos = isOn ? "left-[18px]" : "left-0.5";

  return (
    <span
      className={
        "inline-flex items-center gap-3 text-sm " +
        (isDisabled ? "text-n-500 cursor-not-allowed " : "text-n-950 cursor-pointer ") +
        className
      }
    >
      <span className={`${trackBase} ${trackColor} ${trackOpacity}`} role="switch" aria-checked={isOn}>
        <span className={`${knobBase} ${knobPos}`} />
      </span>
      {children && <span>{children}</span>}
    </span>
  );
}
