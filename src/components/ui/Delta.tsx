import styles from "@/styles/components/Delta.module.scss";

interface DeltaProps {
  /** Omit when there is no documented baseline — renders as a single figure. */
  from?: string;
  to: string;
  label: string;
  /** `lead` is the oversized treatment used once per page. */
  size?: "lead" | "panel";
}

/**
 * The site's signature device: a measured before → after.
 *
 * Every real outcome in this portfolio is a transition — 4.5s to 0.6s, 60s to
 * 1.2s — so the pair is set as one typographic unit rather than a lone number
 * with a caption. The arrow is decorative; the relationship is spelled out for
 * screen readers.
 *
 * `from` is optional because not every result has a baseline, and inventing a
 * placeholder to keep the shape consistent would be worse than showing the
 * figure on its own.
 */
export function Delta({ from, to, label, size = "panel" }: DeltaProps) {
  return (
    <figure className={`${styles.delta} ${styles[size]}`}>
      <div className={styles.pair}>
        {from ? (
          <>
            <span className={styles.from}>{from}</span>
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
            <span className={styles.srOnly}> improved to </span>
          </>
        ) : null}
        <span className={styles.to}>{to}</span>
      </div>
      <figcaption className={styles.label}>{label}</figcaption>
    </figure>
  );
}
