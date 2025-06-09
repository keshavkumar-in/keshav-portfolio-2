import React from "react";
import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "@/styles/components/Navigation.module.scss";

const Navigation: React.FC = () => {
  const sections = [
    "home",
    "services",
    "portfolio",
    "resume",
    "blogs",
    "contact",
  ];
  const activeSection = useScrollSpy(sections);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        {sections.map((section) => (
          <li key={section}>
            <Link
              href={`#${section}`}
              className={`${styles.navLink} ${
                activeSection === section ? styles.active : ""
              }`}
              onClick={(e) => handleClick(e, section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
