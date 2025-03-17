// components/PortfolioSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/components/PortfolioSection.module.scss";
import ProjectModal from "./ProjectModal";
import { PortfolioItem } from "@/types/portfolio";
import { ContentfulPortfolio } from "@/lib/contentful";

const PortfolioSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number>(6);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolioItems() {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Failed to fetch');
        const items = await response.json() as ContentfulPortfolio[];
        const formattedItems: PortfolioItem[] = items.map((item) => ({
          id: item.sys.id,
          projectName: item.fields.projectName,
          slug: item.fields.slug,
          description: item.fields.description,
          projectImage: `https:${item.fields.projectImage.fields.file.url}`,
          developedOn: item.fields.developedOn,
          techUsed: item.fields.techUsed,
          role: item.fields.role,
          demoLink: item.fields.demoLink,
          sourceCode: item.fields.sourceCode,
        }));
        setPortfolioItems(formattedItems);
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to load portfolio items, ${err}`);
        setIsLoading(false);
      }
    }

    fetchPortfolioItems();
  }, []);

  const loadMoreItems = () => {
    setVisibleItems((prevValue) =>
      prevValue + 3 > portfolioItems.length
        ? portfolioItems.length
        : prevValue + 3
    );
  };

  const viewLessItems = () => {
    setVisibleItems(6);
  };

  if (isLoading) {
    return (
      <section className={styles.portfolioSection} id="portfolio">
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.tag}>PORTFOLIO</div>
            <h2>Loading...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.portfolioSection} id="portfolio">
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.tag}>PORTFOLIO</div>
            <h2>Error: {error}</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.portfolioSection} id="portfolio">
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
                    <span
                      key={`${item.id}-${tech}`}
                      className={styles.category}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3>{item.projectName}</h3>
                <div
                  className={styles.viewButton}
                  onClick={() => setSelectedProject(item)}
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
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          {visibleItems < portfolioItems.length ? (
            <>
              <p>Are you interested to show more portfolios?</p>
              <button onClick={loadMoreItems} className={styles.loadMoreButton}>
                Load More
              </button>
            </>
          ) : visibleItems > 6 ? (
            <>
              <p>Want to see less?</p>
              <button onClick={viewLessItems} className={`${styles.loadMoreButton} ${styles.viewLessButton}`}>
                View Less
              </button>
            </>
          ) : null}
        </div>
      </div>
      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default PortfolioSection;
