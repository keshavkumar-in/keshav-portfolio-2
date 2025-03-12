import React from "react";
import { FaLinkedin } from "react-icons/fa";
import styles from "@/styles/components/FreelanceSection.module.scss";

const FreelanceSection: React.FC = () => {
  return (
    <section className={styles.freelanceSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Hello <span className={styles.wave}>👋</span> I'm available for
          freelance work
        </h1>
        <p className={styles.subtitle}>
          For quick response:{" "}
          <a
            href="https://www.linkedin.com/in/keshavkumar-in"
            className={styles.chatLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.linkedinIcon} /> Chat now
          </a>
        </p>
        <a href="#contact" className={styles.hireButton}>
          Hire Me Now <span className={styles.arrow}>↗</span>
        </a>
      </div>
    </section>
  );
};

export default FreelanceSection;
