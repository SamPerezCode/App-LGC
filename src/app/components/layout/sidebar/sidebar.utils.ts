import type { Dispatch, MutableRefObject, SetStateAction } from "react";

export type CollapseTimeoutRef = MutableRefObject<number | null>;

/** Cuando el mouse entra, cancelamos el colapso y expandimos. */
export function handleSidebarMouseEnter(
  collapseTimeoutRef: CollapseTimeoutRef,
  setExpanded: Dispatch<SetStateAction<boolean>>
) {
  if (collapseTimeoutRef.current) {
    window.clearTimeout(collapseTimeoutRef.current);
    collapseTimeoutRef.current = null;
  }
  setExpanded(true);
}

/** Cuando el mouse sale, programamos el colapso con un pequeño delay. */
export function handleSidebarMouseLeave(
  collapseTimeoutRef: CollapseTimeoutRef,
  setExpanded: Dispatch<SetStateAction<boolean>>,
  delayMs = 300
) {
  collapseTimeoutRef.current = window.setTimeout(() => {
    setExpanded(false);
    collapseTimeoutRef.current = null;
  }, delayMs);
}
