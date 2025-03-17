// StatsSection.tsx
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/StatsSection.module.scss';

const StatsSection: React.FC = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <h2 className={styles.statNumber}>05<span className={styles.plus}>+</span></h2>
            <p className={styles.statLabel}>Years of Experience</p>
          </div>
          
          <div className={styles.statBox}>
            <h2 className={styles.statNumber}>20<span className={styles.plus}>+</span></h2>
            <p className={styles.statLabel}>Projects completed</p>
          </div>
        </div>
        
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            As a skilled web developer, I specialize in creating responsive, user-friendly websites with a 
            focus on modern design and efficient code. I excel in front-end development, with a deep 
            understanding of HTML, CSS, JavaScript, and various frameworks. My passion is turning 
            ideas into functional and aesthetically pleasing digital experiences.
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
