"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/components/BlogSection.module.scss";
import Image from "next/image";

interface DevtoArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  url: string;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  reading_time_minutes: number;
}

const BlogSection: React.FC = () => {
  const [articles, setArticles] = useState<DevtoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your Dev.to username
  const username = "keshav_kumar";
  const devtoProfileUrl = `https://dev.to/${username}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        // Fetch articles from Dev.to API
        const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching Dev.to articles:", err);
        setError("Failed to load articles. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  // Format date to "MMM DD, YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <section id="blogs" className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>BLOG INSIGHT</div>
          <h2 className={styles.title}>
            Latest Articles From My Blog
          </h2>
        </div>
        
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading latest articles...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className={styles.blogGrid}>
              {articles.map((article) => (
                <div key={article.id} className={styles.blogCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={article.cover_image || article.social_image || "/assets/blog-placeholder.png"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      <span className={styles.category}>
                        {article.tag_list.length > 0 ? article.tag_list[0] : "Dev"}
                      </span>
                      <span className={styles.date}>{formatDate(article.published_at)}</span>
                    </div>
                    <h3 className={styles.blogTitle}>{article.title}</h3>
                    <div className={styles.description}>
                      {article.description.length > 100 
                        ? `${article.description.substring(0, 100)}...` 
                        : article.description}
                    </div>
                    <div className={styles.readingTime}>
                      {article.reading_time_minutes} min read
                    </div>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                      READ MORE <span className={styles.arrow}>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.viewMoreContainer}>
              <a 
                href={devtoProfileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.viewMoreButton}
              >
                View More Articles
                <span className={styles.arrow}>→</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
