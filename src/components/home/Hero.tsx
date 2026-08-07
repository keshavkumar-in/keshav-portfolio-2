import { Cta } from "@/components/ui/Cta";
import { Delta } from "@/components/ui/Delta";
import { SITE } from "@/lib/site";
import styles from "@/styles/components/Hero.module.scss";

/**
 * The hero leads with the two measurements that define the work rather than a
 * photograph or a rotating job title. What a client is buying here is a
 * before-and-after, so the before-and-after is the image.
 */
export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          Freelance {SITE.role}
          <span className={styles.sep} aria-hidden="true">
            /
          </span>
          {SITE.location}
        </p>

        <h1 className={styles.headline}>
          Web platforms
          <br />
          that hold up
          <br />
          <span className={styles.accent}>under load.</span>
        </h1>

        <div className={styles.body}>
          <p className={styles.lede}>
            Six years building and rescuing production systems — a deep-tech AI
            platform, a state education board serving 3,000 schools, and
            founders who needed one developer who could handle all of it. I take
            on the parts that are measured: page speed, query times, payment
            flows that have to clear.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Years building</dt>
              <dd className={styles.statValue}>06+</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Projects shipped</dt>
              <dd className={styles.statValue}>20+</dd>
            </div>
          </dl>
        </div>

        <div className={styles.actions}>
          <Cta href="#contact">Start a project</Cta>
          <Cta href="#work" variant="outline">
            See the work
          </Cta>
        </div>
      </div>

      {/* The proof strip: two real, sourced deltas, sitting on the fold. */}
      <div className={styles.proof}>
        <div className={styles.proofInner}>
          <Delta
            from="4.5s"
            to="0.6s"
            label="Largest Contentful Paint — Bert Labs"
          />
          <Delta
            from="60s"
            to="1.2s"
            label="Query time on 1M+ records — BSMEB"
          />
          {/* No documented baseline for this one, so it shows as a single figure. */}
          <Delta to="+38%" label="Successful transactions — Hotel Patliputra" />
        </div>
      </div>
    </section>
  );
}
