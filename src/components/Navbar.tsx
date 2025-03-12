// Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/styles/components/Navbar.module.scss";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "RESUME", path: "/resume" },
    { name: "PRICING", path: "/pricing" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.svg"
            alt="Antux Logo"
            width={120}
            height={40}
          />
        </Link>

        <div
          className={`${styles.menuItems} ${isMenuOpen ? styles.active : ""}`}
        >
          {navItems.map((item) => (
            <div key={item.name} className={styles.navItem}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${
                  pathname === item.path ? styles.active : ""
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        <Link href="/contact" className={styles.talkButton}>
          Let's Talk <span className={styles.chatIcon}>💬</span>
        </Link>

        <button className={styles.menuToggle} onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
