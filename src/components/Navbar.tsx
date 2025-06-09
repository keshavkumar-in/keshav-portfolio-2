// Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "@/styles/components/Navbar.module.scss";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "HOME", path: "home" },
    { name: "SERVICES", path: "services" },
    { name: "PORTFOLIO", path: "portfolio" },
    { name: "RESUME", path: "resume" },
    { name: "BLOGS", path: "blogs" },
    { name: "CONTACT", path: "contact" },
  ];

  const activeSection = useScrollSpy(navItems.map((item) => item.path));

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

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/KK.png"
            alt="Keshav Kumar Logo"
            width={60}
            height={40}
          />
        </Link>

        <div
          className={`${styles.menuItems} ${isMenuOpen ? styles.active : ""}`}
        >
          {navItems.map((item) => (
            <div key={item.name} className={styles.navItem}>
              <Link
                href={`#${item.path}`}
                className={`${styles.navLink} ${
                  activeSection === item.path ? styles.active : ""
                }`}
                onClick={(e) => handleClick(e, item.path)}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        <Link
          href="https://www.linkedin.com/in/keshavkumar-in"
          className={styles.talkButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let&apos;s Talk <span className={styles.chatIcon}>💬</span>
        </Link>

        <button className={styles.menuToggle} onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
