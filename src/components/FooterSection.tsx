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
              src="/assets/Group 47 (1).png"
              alt="Logo"
              width={100}
              height={50}
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          <a href="#home">HOME</a>
          <a href="#project">PROJECT</a>
          <a href="#service">SERVICE</a>
          <a href="#blogs">BLOG</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <div className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} Keshav Kumar. All Rights Reserved.{" "}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
