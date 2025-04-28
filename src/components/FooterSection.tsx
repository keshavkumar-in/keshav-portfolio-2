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
              src="/assets/KK.png"
              alt="Keshav Kumar Logo"
              width={100}
              height={50}
            />
          </Link>
        </div>
        <div className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} Keshav Kumar. All Rights Reserved.{" "}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
