// HeroSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/HeroSection.module.scss';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heroText}>
            <h1>
              Hey <span className={styles.waveEmoji}>👋</span> I&apos;m Keshav
            </h1>
            <div className={styles.professionBox}>
              <p>Professional Coder</p>
            </div>
            <p className={styles.description}>
              Hi, my name is Keshav Kumar and I began coding when I was in high school.
              I&apos;ve spent most of my waking hours for the last several years designing,
              programming and building web applications.
            </p>
            <div className={styles.cta}>
              <Link href="#contact" className={styles.hireButton}>
                Hire Me Now
                <span className={styles.arrow}>↗</span>
              </Link>
              <div className={styles.socialLinks}>
                <Link href="https://www.linkedin.com/in/keshavkumar-in/" aria-label="LinkedIn" className={styles.socialIcon}>
                  <FaLinkedinIn />
                </Link>
                <Link href="https://github.com/keshavkumar-in" aria-label="Github" className={styles.socialIcon}>
                  <FaGithub />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical separator between left and right sides */}
        <div className={styles.verticalSeparator}>
          <div className={styles.separatorLine}></div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.backgroundElements}>
            <Image
              src="/assets/1.png"
              alt="Yellow background"
              width={450}
              height={550}
              className={styles.yellowBackground}
            />
            <Image
              src="/assets/3.png"
              alt="Decorative star"
              width={120}
              height={120}
              className={styles.starDecoration}
            />
          </div>
          <Image
            src="/assets/5-2.png"
            alt="Keshav Kumar"
            width={400}
            height={500}
            priority
            className={styles.profileImage}
          />
        </div>
      </div>

      {/* Bottom separator */}
      <div className={styles.bottomSeparator}>
        <Image
          src="/assets/4-dark.png"
          alt="Bottom separator"
          width={1200}
          height={50}
          className={styles.bottomSeparatorImage}
        />
      </div>
    </section>
  );
};

export default HeroSection;
