// components/PortfolioSection.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/PortfolioSection.module.scss";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  categories: string[];
}

const PortfolioSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number>(6);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Document manager application",
      image: "/assets/2-1.jpg",
      categories: ["Web", "Coding"],
    },
    {
      id: 2,
      title: "Dynamic mobile app development",
      image: "/assets/1-1.jpg",
      categories: ["Software", "Mobile"],
    },
    {
      id: 3,
      title: "Printable professional brochure templates",
      image: "/assets/2-1.jpg",
      categories: ["Brochure", "Design"],
    },
    {
      id: 4,
      title: "Create stunning product flexible mockups",
      image: "/assets/1-1.jpg",
      categories: ["Brand", "Mockup"],
    },
    {
      id: 5,
      title: "Making smart software smartphones",
      image: "/assets/2-1.jpg",
      categories: ["Tech", "Mobile"],
    },
    {
      id: 6,
      title: "Decor design vectors illustrations",
      image: "/assets/1-1.jpg",
      categories: ["Design", "Art"],
    },
    {
      id: 7,
      title: "E-commerce website redesign",
      image: "/assets/2-1.jpg",
      categories: ["Web", "UI/UX"],
    },
    {
      id: 8,
      title: "Logo collection for tech startups",
      image: "/assets/1-1.jpg",
      categories: ["Brand", "Design"],
    },
    {
      id: 9,
      title: "Custom WordPress theme development",
      image: "/assets/2-1.jpg",
      categories: ["Web", "Coding"],
    },
  ];

  const loadMoreItems = () => {
    setVisibleItems((prevValue) =>
      prevValue + 3 > portfolioItems.length
        ? portfolioItems.length
        : prevValue + 3
    );
  };

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>PORTFOLIO</div>
          <h2>My Recent Work</h2>
        </div>

        <div className={styles.portfolioGrid}>
          {portfolioItems.slice(0, visibleItems).map((item) => (
            <div key={item.id} className={styles.portfolioItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className={styles.portfolioImage}
                />
              </div>
              <div className={styles.portfolioContent}>
                <div className={styles.categories}>
                  {item.categories.map((category) => (
                    <span
                      key={`${item.id}-${category}`}
                      className={styles.category}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3>{item.title}</h3>
                <div className={styles.viewButton}>
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleItems < portfolioItems.length && (
          <div className={styles.loadMoreContainer}>
            <p>Are you interested to show more portfolios?</p>
            <button onClick={loadMoreItems} className={styles.loadMoreButton}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
