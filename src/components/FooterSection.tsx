import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/components/FooterSection.module.scss";

const FooterSection: React.FC = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={40}
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          <a href="#home">HOME</a>
          <a href="#project">PROJECT</a>
          <a href="#service">SERVICE</a>
          <a href="#blog">BLOG</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className={styles.copyright}>
          Copyright 2024 Antux. All Rights Reserved by{" "}
          <a href="https://validthemes.com">Validthemes</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
