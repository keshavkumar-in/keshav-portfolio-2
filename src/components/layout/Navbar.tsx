"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { NAV_ITEMS, SITE } from "@/lib/site";
import styles from "@/styles/components/Navbar.module.scss";

const SECTION_IDS = NAV_ITEMS.filter((item) => item.type === "anchor").map(
  (item) => item.target
);

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sections only exist on the landing page; elsewhere the observer would find
  // nothing and the nav should show no active state.
  const activeSection = useScrollSpy(SECTION_IDS, isLanding);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /**
   * On the landing page an anchor stays an in-page hash. Anywhere else it has
   * to be an absolute path, or the browser looks for an id that isn't on the
   * current route and does nothing.
   */
  const hrefFor = (target: string, type: "anchor" | "route") => {
    if (type === "route") return `/${target}`;
    return isLanding ? `#${target}` : `/#${target}`;
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark} onClick={() => setIsMenuOpen(false)}>
          Keshav
          <span className={styles.wordmarkDot} aria-hidden="true">
            .
          </span>
        </Link>

        <div
          id="nav-menu"
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={hrefFor(item.target, item.type)}
              className={`${styles.link} ${
                activeSection === item.target ? styles.linkActive : ""
              }`}
              aria-current={
                activeSection === item.target ? "location" : undefined
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href={hrefFor("contact", "anchor")}
            className={styles.menuCta}
            onClick={() => setIsMenuOpen(false)}
          >
            Start a project
          </Link>
        </div>

        <div className={styles.end}>
          {SITE.available ? (
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              Available
            </span>
          ) : null}

          <Link href={hrefFor("contact", "anchor")} className={styles.cta}>
            Start a project
          </Link>

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={styles.toggleBar} data-open={isMenuOpen} />
            <span className={styles.toggleBar} data-open={isMenuOpen} />
          </button>
        </div>
      </div>
    </nav>
  );
}
