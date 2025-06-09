import React from "react";
import Image from "next/image";
import { PortfolioItem } from "@/types/portfolio";
import styles from "@/styles/components/PortfolioSection.module.scss";

interface PortfolioCardProps {
  item: PortfolioItem;
  onSelect: (item: PortfolioItem) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  onSelect,
}) => (
  <div className={styles.portfolioItem}>
    <div className={styles.imageContainer}>
      <Image
        src={item.projectImage}
        alt={item.projectName}
        width={400}
        height={300}
        className={styles.portfolioImage}
      />
    </div>
    <div className={styles.portfolioContent}>
      <div className={styles.categories}>
        {item.techUsed.map((tech) => (
          <span key={`${item.id}-${tech}`} className={styles.category}>
            {tech}
          </span>
        ))}
      </div>
      <h3>{item.projectName}</h3>
      <button
        className={styles.viewButton}
        onClick={() => onSelect(item)}
        aria-label={`View ${item.projectName} details`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
);
