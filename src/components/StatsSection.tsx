// StatsSection.tsx
import React from "react";
import Link from "next/link";
import styles from "@/styles/components/StatsSection.module.scss";

const StatsSection: React.FC = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <h2 className={styles.statNumber}>
              05<span className={styles.plus}>+</span>
            </h2>
            <p className={styles.statLabel}>Years of Experience</p>
          </div>

          <div className={styles.statBox}>
            <h2 className={styles.statNumber}>
              20<span className={styles.plus}>+</span>
            </h2>
            <p className={styles.statLabel}>Projects completed</p>
          </div>
        </div>

        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            Full Stack Developer with expertise in Next.js and MERN stack,
            focused on building high-performance web applications. Proven track
            record of improving Core Web Vitals and boosting user engagement by
            40%, while optimizing database performance for enterprise-scale
            projects handling millions of records. Passionate about creating
            secure, accessible digital solutions that deliver measurable
            results.
          </p>

          <Link href="#portfolio" className={styles.learnMoreButton}>
            Learn More
            <span className={styles.arrowIcon}>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
