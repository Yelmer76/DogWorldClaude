"use client";

import { useCallback, useState } from "react";

export type NavDirection = "up" | "down" | "lateral" | "jump";

/**
 * usePedigreeNav — focal-navigation state for the Pedigree Explorer.
 *
 * Spatial model (matches design handoff):
 *   - up      = back in time (toward ancestors)
 *   - down    = forward in time (toward offspring)
 *   - lateral = same generation (siblings)
 *   - jump    = breadcrumb / share / direct seek
 *
 * History is a stack of dog ids; the last is the current focal.
 */
export function usePedigreeNav(initialId: string) {
  const [history, setHistory] = useState<string[]>([initialId]);
  const [direction, setDirection] = useState<NavDirection>("jump");
  const focalId = history[history.length - 1];

  const goTo = useCallback(
    (id: string | null | undefined, dir: NavDirection = "jump") => {
      if (!id || id === focalId) return;
      setDirection(dir);
      setHistory((h) => [...h, id]);
    },
    [focalId],
  );

  const goToBreadcrumb = useCallback((idx: number) => {
    setDirection("jump");
    setHistory((h) => h.slice(0, idx + 1));
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
    setDirection("jump");
  }, []);

  const reset = useCallback(() => {
    setDirection("jump");
    setHistory([initialId]);
  }, [initialId]);

  return {
    focalId,
    history,
    direction,
    goTo,
    goToBreadcrumb,
    goBack,
    reset,
  };
}
