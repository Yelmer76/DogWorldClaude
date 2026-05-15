"use client";

/**
 * ToastProvider — minimal global toast state for the app.
 *
 * Per design handoff:
 *   - Bottom-center, dark #1a1a1a bg, white text
 *   - 2.2–2.4s auto-dismiss
 *   - Success-dot accent (or warning/error/info)
 *   - Used for inline-edit "Lagret" feedback and similar transient confirmations
 *
 * Usage:
 *   <ToastProvider>...page content...</ToastProvider>
 *   const showToast = useToast();
 *   showToast("Lagret");                   // success default
 *   showToast("Kunne ikke lagre", "error");
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Toast, type ToastTone } from "./Patterns";

type ShowToast = (message: ReactNode, tone?: ToastTone) => void;

const ToastContext = createContext<ShowToast | null>(null);

export function useToast(): ShowToast {
  const fn = useContext(ToastContext);
  if (!fn) {
    // No provider — silent no-op so InlineField etc. never crash if used standalone
    return () => {};
  }
  return fn;
}

type ActiveToast = { id: number; message: ReactNode; tone: ToastTone };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback<ShowToast>((message, tone = "success") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const id = ++idRef.current;
    setToast({ id, message, tone });
    timerRef.current = setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none px-4"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="pointer-events-auto animate-[dw-toast-in_180ms_ease-out]">
            <Toast tone={toast.tone}>{toast.message}</Toast>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
