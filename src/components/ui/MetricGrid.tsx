import type { Metric } from "@/types/portfolio";
import styles from "@/styles/components/MetricGrid.module.scss";

/**
 * Results as a grid of measured figures. A metric with a `from` renders as a
 * before → after; one without renders as a single figure. Both shapes occur in
 * the real data, so both are first-class rather than one faked into the other.
 */
export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className={styles.grid}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.cell}>
          <dt className={styles.label}>{metric.label}</dt>
          <dd className={styles.value}>
            {metric.from ? (
              <>
                <span className={styles.from}>{metric.from}</span>
                <span className={styles.arrow} aria-hidden="true">
                  &rarr;
                </span>
              </>
            ) : null}
            <span className={styles.to}>{metric.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
