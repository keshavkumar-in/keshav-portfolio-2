import { ImageResponse } from "next/og";
import { OG, OG_DISPLAY, OG_MONO, loadOgFonts } from "@/lib/og";
import { getProject, getProjects } from "@/lib/projects";

export const alt = "Case study";
export const size = OG.size;
export const contentType = "image/png";

/** Without this the image route would be rendered on demand rather than built. */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Per-case-study card. The point of giving case studies their own URLs is that
 * they can be pasted into a pitch — so each one needs its own preview showing
 * the client and the result, not the generic site card.
 */
export default async function Image({
  params,
}: {
  // Async, exactly like the page's params. Typing this as a plain object
  // compiles fine and then silently yields `undefined` for slug at runtime,
  // which renders every case study with the same generic card.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, fonts] = await Promise.all([
    getProject(slug),
    loadOgFonts(),
  ]);

  const caseStudy = project?.caseStudy;
  const delta = caseStudy?.delta;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG.ink,
          padding: 64,
          ...OG_DISPLAY,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 24,
            borderBottom: `1px solid ${OG.inkLine}`,
            ...OG_MONO,
            fontSize: 22,
            letterSpacing: 3,
            color: OG.smoke,
          }}
        >
          <span style={{ color: OG.volt }}>CASE STUDY</span>
          <span>KESHAVKUMAR.IN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {caseStudy?.eyebrow ? (
            <div
              style={{
                display: "flex",
                marginBottom: 18,
                ...OG_MONO,
                fontSize: 22,
                letterSpacing: 2,
                color: OG.smoke,
              }}
            >
              {caseStudy.eyebrow}
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1,
              letterSpacing: -4,
              color: OG.bone,
              textTransform: "uppercase",
            }}
          >
            {project?.projectName ?? "Work"}
          </div>

          {caseStudy?.headline ? (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 32,
                lineHeight: 1.25,
                letterSpacing: -1,
                color: OG.smoke,
                maxWidth: 900,
              }}
            >
              {caseStudy.headline}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: `1px solid ${OG.inkLine}`,
          }}
        >
          {delta ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 18,
                  fontSize: 68,
                  letterSpacing: -3,
                }}
              >
                {delta.from ? (
                  <>
                    <span
                      style={{
                        color: OG.smoke,
                        textDecoration: "line-through",
                      }}
                    >
                      {delta.from}
                    </span>
                    <span style={{ color: OG.volt }}>→</span>
                  </>
                ) : null}
                <span style={{ color: OG.bone }}>{delta.to}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  ...OG_MONO,
                  fontSize: 20,
                  letterSpacing: 3,
                  color: OG.smoke,
                  textTransform: "uppercase",
                }}
              >
                {delta.label}
              </div>
            </div>
          ) : (
            // No documented result for this project — show the stack instead of
            // padding the card with a number that does not exist.
            <div
              style={{
                display: "flex",
                ...OG_MONO,
                fontSize: 22,
                letterSpacing: 2,
                color: OG.smoke,
                maxWidth: 820,
              }}
            >
              {(project?.techUsed ?? []).slice(0, 5).join("  ·  ")}
            </div>
          )}

          <svg width="96" height="96" viewBox="0 0 64 64">
            <rect width="64" height="64" fill={OG.volt} />
            <g fill={OG.ink}>
              <rect x="15" y="12" width="10" height="40" />
              <path d="M25 36 L49 12 L35 12 L25 22 Z" />
              <path d="M25 28 L49 52 L35 52 L25 42 Z" />
            </g>
          </svg>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined }
  );
}
