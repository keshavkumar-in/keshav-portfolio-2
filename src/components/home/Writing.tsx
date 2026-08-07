import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getArticles } from "@/lib/devto";
import { SITE } from "@/lib/site";
import styles from "@/styles/components/Writing.module.scss";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function Writing() {
  const articles = await getArticles(3);

  // Nothing to say is better than an empty shell with a heading over it.
  if (articles.length === 0) return null;

  return (
    <section id="writing" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          label="Writing"
          title="Notes from the build"
          aside={
            <a
              href={`https://dev.to/${SITE.devto}`}
              className={styles.all}
              target="_blank"
              rel="noopener noreferrer"
            >
              All posts &rarr;
            </a>
          }
        />

        <ul className={styles.grid}>
          {articles.map((article) => (
            <li key={article.id} className={styles.card}>
              <a
                href={article.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Only render the frame when there is an image for it —
                    otherwise the card shows an empty bordered box. */}
                {article.cover_image || article.social_image ? (
                  <div className={styles.media}>
                    <Image
                      src={(article.cover_image ?? article.social_image)!}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className={styles.image}
                    />
                  </div>
                ) : null}

                <p className={styles.meta}>
                  <span>{formatDate(article.published_at)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.reading_time_minutes} min read</span>
                </p>

                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
