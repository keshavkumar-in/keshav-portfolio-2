import { useEffect, useState } from "react";

/**
 * Highlights the nav entry for the section currently under the top of the
 * viewport.
 *
 * Uses IntersectionObserver rather than a scroll handler: the previous version
 * recomputed every section's position on every scroll event, and took its
 * section list as a fresh array each render, so it tore down and re-attached its
 * listener continuously.
 *
 * @param enabled Pass false on routes that have no sections to spy on — the
 * case-study pages — so the observer is never created there.
 */
export function useScrollSpy(sectionIds: readonly string[], enabled = true) {
  const [activeSection, setActiveSection] = useState("");

  // Stable dependency: the array identity changes each render, the contents don't.
  const key = sectionIds.join("|");

  useEffect(() => {
    if (!enabled) {
      setActiveSection("");
      return;
    }

    const ids = key.split("|").filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // When several sections straddle the band, the earliest in document
        // order is the one being read.
        const current = ids.find((id) => visible.has(id));
        if (current) setActiveSection(current);
      },
      // A band just below the nav, so a section becomes "active" as its top
      // reaches reading position rather than when it first peeks in.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return activeSection;
}
