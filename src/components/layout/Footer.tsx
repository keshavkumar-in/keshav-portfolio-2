import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/site";
import styles from "@/styles/components/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>
            Keshav
            <span className={styles.dot} aria-hidden="true">
              .
            </span>
          </p>
          <p className={styles.tagline}>
            {SITE.role} <span aria-hidden="true">·</span> {SITE.location}
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          {NAV_ITEMS.map((item) => (
            <Link key={item.name} href={`/#${item.target}`} className={styles.link}>
              {item.name}
            </Link>
          ))}
          <Link href="/work" className={styles.link}>
            All work
          </Link>
        </nav>

        <div className={styles.reach}>
          <a href={`mailto:${SITE.email}`} className={styles.link}>
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={SITE.github}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className={styles.baseline}>
        <div className={styles.baselineInner}>
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p>Built with Next.js. Measured, then shipped.</p>
        </div>
      </div>
    </footer>
  );
}
