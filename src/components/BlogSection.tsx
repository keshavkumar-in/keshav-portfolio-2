import React from "react";
import styles from "@/styles/components/BlogSection.module.scss";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Minuter him own clothes but observe country",
    category: "Creative",
    date: "AUG 29, 2024",
    image: "/assets/Untitled-1-1.png",
    link: "#",
  },
  {
    id: 2,
    title: "Miscovery incommode earnestly commanded tempering task.",
    category: "Creative",
    date: "AUG 29, 2024",
    image: "/assets/Untitled-1-1.png",
    link: "#",
  },
  {
    id: 3,
    title: "Overcame breeding point concerns has terminate actual",
    category: "Creative",
    date: "AUG 29, 2024",
    image: "/assets/Untitled-1-1.png",
    link: "#",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>BLOG INSIGHT</div>
          <h2 className={styles.title}>
            Valuable insights to change your startup idea
          </h2>
        </div>
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <div key={post.id} className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.date}>{post.date}</span>
                </div>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <a href={post.link} className={styles.readMore}>
                  READ MORE <span className={styles.arrow}>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
