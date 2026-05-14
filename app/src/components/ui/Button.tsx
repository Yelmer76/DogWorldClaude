import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "ghost"
  | "icon";

export type ButtonState = "default" | "hover" | "active" | "disabled" | "loading";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Force a visual state (used by styleguide demos).
   * In production, leave undefined and let CSS hover/active rules drive it.
   */
  state?: ButtonState;
  children?: ReactNode;
  /** Trailing icon to show on right of label */
  trailingIcon?: ReactNode;
  /** Leading icon to show on left of label */
  leadingIcon?: ReactNode;
};

const baseClasses =
  "font-medium leading-none rounded-btn border inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-75 focus-visible:outline-2 focus-visible:outline-forest-500 focus-visible:outline-offset-2";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-[13px] px-3 py-2",
  md: "text-sm px-3.5 py-2.5",
  lg: "text-[15px] px-[18px] py-3",
};

// Each variant has tiered state styling
function variantClasses(variant: ButtonVariant, state: ButtonState): string {
  switch (variant) {
    case "primary": {
      if (state === "disabled")
        return "bg-ochre-200 border-ochre-200 text-[#6f7e8f] cursor-not-allowed";
      if (state === "active")
        return "bg-ochre-700 border-ochre-700 text-white";
      if (state === "hover")
        return "bg-[#25415a] border-[#25415a] text-white";
      // default + loading
      return "bg-ochre-600 border-ochre-600 text-white hover:bg-[#25415a] hover:border-[#25415a] active:bg-ochre-700 active:border-ochre-700";
    }
    case "secondary": {
      if (state === "disabled")
        return "bg-bg-card text-n-500 border-n-100 cursor-not-allowed";
      if (state === "active") return "bg-n-100 border-n-200 text-n-950";
      if (state === "hover") return "bg-n-50 border-n-300 text-n-950";
      return "bg-bg-card border-n-200 text-n-950 hover:bg-n-50 hover:border-n-300 active:bg-n-100";
    }
    case "destructive": {
      if (state === "disabled")
        return "bg-[#e8c8c5] border-[#e8c8c5] text-[#b88c89] cursor-not-allowed";
      if (state === "active")
        return "bg-[#8a3f3a] border-[#8a3f3a] text-white";
      if (state === "hover")
        return "bg-[#a4504a] border-[#a4504a] text-white";
      return "bg-[#b25a54] border-[#b25a54] text-white hover:bg-[#a4504a] hover:border-[#a4504a] active:bg-[#8a3f3a] active:border-[#8a3f3a]";
    }
    case "ghost": {
      if (state === "disabled")
        return "bg-transparent border-transparent text-n-500 cursor-not-allowed";
      if (state === "active")
        return "bg-forest-100 border-transparent text-forest-700";
      if (state === "hover")
        return "bg-forest-50 border-transparent text-forest-700";
      return "bg-transparent border-transparent text-forest-700 hover:bg-forest-50 active:bg-forest-100";
    }
    case "icon": {
      // size + padding overridden below
      if (state === "disabled")
        return "bg-bg-card border-n-100 text-n-500 cursor-not-allowed";
      if (state === "active") return "bg-n-100 border-n-200 text-n-950";
      if (state === "hover") return "bg-n-50 border-n-200 text-n-950";
      return "bg-bg-card border-n-200 text-n-700 hover:bg-n-50 hover:text-n-950 active:bg-n-100";
    }
  }
}

export const Spinner = ({ className = "" }: { className?: string }) => (
  <span
    className={
      "inline-block w-3.5 h-3.5 rounded-full border-2 border-current border-r-transparent animate-spin " +
      className
    }
    aria-hidden
  />
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      state = "default",
      children,
      leadingIcon,
      trailingIcon,
      className = "",
      disabled,
      ...rest
    },
    ref,
  ) {
    const isDisabled = state === "disabled" || disabled;
    const isLoading = state === "loading";

    // Icon variant overrides padding/size
    const sizeCls =
      variant === "icon"
        ? "w-9 h-9 p-0 justify-center"
        : sizeClasses[size];

    return (
      <button
        ref={ref}
        type={rest.type ?? "button"}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={`${baseClasses} ${sizeCls} ${variantClasses(variant, state)} ${className}`.trim()}
        {...rest}
      >
        {isLoading ? <Spinner /> : leadingIcon}
        {children}
        {!isLoading && trailingIcon}
      </button>
    );
  },
);
