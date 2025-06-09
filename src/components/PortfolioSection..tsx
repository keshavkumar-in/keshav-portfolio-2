"use client";
import React, { useState } from "react";
import styles from "@/styles/components/PortfolioSection.module.scss";
import { PortfolioCard } from "./Portfolio/PortfolioCard";
import { LoadMore } from "./Portfolio/LoadMore";
import { SkeletonCard } from "./Portfolio/SkeletonCard";
import ProjectModal from "./ProjectModal";
import { usePortfolio } from "@/hooks/usePortfolio";
import { PortfolioItem } from "@/types/portfolio";

const PortfolioSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number>(6);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const { portfolioItems, isLoading, error } = usePortfolio();

  const loadMoreItems = () => {
    setVisibleItems((prev) => Math.min(prev + 3, portfolioItems.length));
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
            <h2>My Recent Work</h2>
          </div>
          <div className={styles.portfolioGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
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
            <h2>{error}</h2>
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
            <PortfolioCard
              key={item.id}
              item={item}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        <LoadMore
          visibleItems={visibleItems}
          totalItems={portfolioItems.length}
          onLoadMore={loadMoreItems}
          onViewLess={viewLessItems}
        />
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
