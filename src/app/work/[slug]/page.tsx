import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Cta } from "@/components/ui/Cta";
import { Delta } from "@/components/ui/Delta";
import { MetricGrid } from "@/components/ui/MetricGrid";
import { getNextProject, getProject, getProjects } from "@/lib/projects";
import styles from "@/styles/components/CaseStudy.module.scss";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  const description =
    project.caseStudy?.headline ?? project.description.slice(0, 155);

  // No `images` on either block: opengraph-image.tsx in this folder generates
  // a branded card per case study, and an explicit `images` here would
  // override it with the raw Contentful screenshot.
  return {
    title: project.projectName,
    description,
    openGraph: {
      title: `${project.projectName} — case study`,
      description,
      type: "article",
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.projectName} — case study`,
      description,
    },
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const { caseStudy } = project;
  const next = await getNextProject(slug);

  return (
    <>
      <Navbar />

      <main id="main" className={styles.page}>
        <article>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <Link href="/work" className={styles.back}>
                <span aria-hidden="true">&larr;</span> All work
              </Link>

              <p className={styles.eyebrow}>
                {caseStudy?.eyebrow ?? project.role}
              </p>

              <h1 className={styles.title}>{project.projectName}</h1>

              {caseStudy ? (
                <p className={styles.headline}>{caseStudy.headline}</p>
              ) : null}

              {caseStudy?.delta ? (
                <div className={styles.lead}>
                  <Delta
                    from={caseStudy.delta.from}
                    to={caseStudy.delta.to}
                    label={caseStudy.delta.label}
                    size="lead"
                  />
                </div>
              ) : null}

              <dl className={styles.facts}>
                {/* Contentful's `role` field is empty on every entry, so the
                    case study supplies it. Omitted rather than guessed when
                    neither has one. */}
                {caseStudy?.role || project.role ? (
                  <div>
                    <dt>Role</dt>
                    <dd>{caseStudy?.role ?? project.role}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Year</dt>
                  <dd>
                    {project.developedOn
                      ? new Date(project.developedOn).getFullYear()
                      : "—"}
                  </dd>
                </div>
                <div className={styles.factWide}>
                  <dt>Stack</dt>
                  <dd>{project.techUsed.join(" · ")}</dd>
                </div>
              </dl>

              {project.demoLink || project.sourceCode ? (
                <div className={styles.externals}>
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      className={styles.external}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaArrowUpRightFromSquare aria-hidden="true" />
                      Visit the live site
                    </a>
                  ) : null}
                  {project.sourceCode &&
                  project.sourceCode !== project.demoLink ? (
                    <a
                      href={project.sourceCode}
                      className={styles.external}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub aria-hidden="true" />
                      Source
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </header>

          {project.projectImage ? (
            <div className={styles.heroImage}>
              <Image
                src={project.projectImage}
                alt={`${project.projectName} interface`}
                width={1600}
                height={1000}
                priority
                sizes="100vw"
                className={styles.heroImageInner}
              />
            </div>
          ) : null}

          {caseStudy ? (
            <>
              <section className={styles.prose}>
                <div className={styles.proseBlock}>
                  <h2 className={styles.h2}>The problem</h2>
                  <p>{caseStudy.problem}</p>
                </div>

                <div className={styles.proseBlock}>
                  <h2 className={styles.h2}>The approach</h2>
                  <p>{caseStudy.approach}</p>
                </div>
              </section>

              <section className={styles.built}>
                <div className={styles.builtInner}>
                  <h2 className={styles.h2}>What I built</h2>
                  <ul className={styles.builtList}>
                    {caseStudy.built.map((item) => (
                      <li key={item.title} className={styles.builtItem}>
                        <h3 className={styles.builtTitle}>{item.title}</h3>
                        <p className={styles.builtBody}>{item.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className={styles.results}>
                <div className={styles.resultsInner}>
                  <h2 className={styles.h2}>Results</h2>
                  <MetricGrid metrics={caseStudy.results} />

                  {caseStudy.caveats?.length ? (
                    <div className={styles.caveats}>
                      <p className={styles.caveatsLabel}>How to read these</p>
                      <ul>
                        {caseStudy.caveats.map((caveat) => (
                          <li key={caveat}>{caveat}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </section>

              {caseStudy.quote ? (
                <section className={styles.quoteSection}>
                  <figure className={styles.quoteInner}>
                    <blockquote className={styles.quote}>
                      {caseStudy.quote.text}
                    </blockquote>
                    <figcaption className={styles.attribution}>
                      {caseStudy.quote.image ? (
                        <Image
                          src={caseStudy.quote.image}
                          alt=""
                          width={48}
                          height={48}
                          className={styles.avatar}
                        />
                      ) : null}
                      <span>
                        <span className={styles.quoteName}>
                          {caseStudy.quote.name}
                        </span>
                        <span className={styles.quoteRole}>
                          {caseStudy.quote.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </section>
              ) : null}
            </>
          ) : (
            // No case study written yet — the Contentful summary still renders,
            // so the page is never broken, just shorter.
            <section className={styles.prose}>
              <div className={styles.proseBlock}>
                <h2 className={styles.h2}>Overview</h2>
                <p>{project.description}</p>
              </div>
            </section>
          )}
        </article>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Have something similar?</h2>
            <Cta href="/#contact">Start a project</Cta>
          </div>
        </section>

        {next ? (
          <Link href={`/work/${next.slug}`} className={styles.next}>
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextName}>{next.projectName}</span>
            <span className={styles.nextArrow} aria-hidden="true">
              &rarr;
            </span>
          </Link>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
