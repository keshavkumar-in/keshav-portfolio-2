import React from 'react';
import styles from '@/styles/components/PortfolioSection.module.scss';

interface LoadMoreProps {
  visibleItems: number;
  totalItems: number;
  onLoadMore: () => void;
  onViewLess: () => void;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
  visibleItems,
  totalItems,
  onLoadMore,
  onViewLess,
}) => (
  <div className={styles.loadMoreContainer}>
    {visibleItems < totalItems ? (
      <>
        <p>Are you interested to show more portfolios?</p>
        <button onClick={onLoadMore} className={styles.loadMoreButton}>
          Load More
        </button>
      </>
    ) : visibleItems > 6 ? (
      <>
        <p>Want to see less?</p>
        <button onClick={onViewLess} className={`${styles.loadMoreButton} ${styles.viewLessButton}`}>
          View Less
        </button>
      </>
    ) : null}
  </div>
);