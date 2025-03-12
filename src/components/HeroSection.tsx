// HeroSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/HeroSection.module.scss';
import { FaFacebookF, FaLinkedinIn, FaDribbble } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heroText}>
            <h1>
              Hey <span className={styles.waveEmoji}>👋</span> I'm Dalton
            </h1>
            <div className={styles.professionBox}>
              <p>Professional Coder |</p>
            </div>
            <p className={styles.description}>
              Hi, my name is Dalton Grant and I began using WordPress when it first
              began. I've spent most of my waking hours for the last ten years designing,
              programming and operating WordPress sites.
            </p>
            <div className={styles.cta}>
              <Link href="/contact" className={styles.hireButton}>
                Hire Me Now
                <span className={styles.arrow}>↗</span>
              </Link>
              <div className={styles.socialLinks}>
                <Link href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon}>
                  <FaFacebookF />
                </Link>
                <Link href="https://linkedin.com" aria-label="LinkedIn" className={styles.socialIcon}>
                  <FaLinkedinIn />
                </Link>
                <Link href="https://dribbble.com" aria-label="Dribbble" className={styles.socialIcon}>
                  <FaDribbble />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/profile.jpg" 
            alt="Dalton Grant" 
            width={500} 
            height={600} 
            priority
            className={styles.profileImage}
          />
        </div>
      </div>
      <div className={styles.decorations}>
        <span className={styles.decorStar1}></span>
        <span className={styles.decorStar2}></span>
        <span className={styles.decorStar3}></span>
      </div>
    </section>
  );
};

export default HeroSection;
