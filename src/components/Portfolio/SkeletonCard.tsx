import React from "react";
import styles from "@/styles/components/PortfolioSection.module.scss";

export const SkeletonCard: React.FC = () => (
  <div className={styles.portfolioItem}>
    <div className={`${styles.imageContainer} ${styles.skeleton}`}>
      <div className={styles.skeletonImage} />
    </div>
    <div className={styles.portfolioContent}>
      <div className={styles.categories}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`${styles.category} ${styles.skeletonText}`}
          />
        ))}
      </div>
      <div className={`${styles.skeletonTitle} ${styles.skeletonText}`} />
      <div className={`${styles.viewButton} ${styles.skeletonButton}`} />
    </div>
  </div>
);
