import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page's content so route changes animate. It has to sit in each page, not the layout,
 * because layouts persist and never enter or exit.
 *
 * Plain navigations get a soft crossfade with a small rise. Links tagged `nav-forward` (into a
 * case study) or `nav-back` (back to all work) slide sideways instead. CSS is in globals.css.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-enter" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-exit" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
