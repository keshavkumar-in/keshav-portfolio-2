import type { CaseStudy } from "@/types/portfolio";
import { bertLabs } from "./bert-labs";
import { bsmebAcademicPortal } from "./bsmeb-academic-portal";
import { hotelReservationSystem } from "./hotel-reservation-system";
import { rameshPotnuriPortfolio } from "./ramesh-potnuri-portfolio";

/**
 * Case studies keyed by Contentful slug.
 *
 * A project without an entry here still gets a /work/[slug] page — it just
 * renders the short Contentful description instead of the long form. Add a file
 * alongside these and register it below to promote a project.
 */
export const caseStudies: Record<string, CaseStudy> = {
  [bertLabs.slug]: bertLabs,
  [bsmebAcademicPortal.slug]: bsmebAcademicPortal,
  [rameshPotnuriPortfolio.slug]: rameshPotnuriPortfolio,
  [hotelReservationSystem.slug]: hotelReservationSystem,
};
