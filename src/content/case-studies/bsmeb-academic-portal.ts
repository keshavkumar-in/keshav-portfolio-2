import type { CaseStudy } from "@/types/portfolio";

/**
 * Sources: Contentful entry `bsmeb-academic-portal` (3,000+ schools, millions of
 * records, SabPaisa & NTT Data gateways) and the "Full Stack Web Developer &
 * Team Lead, Bihar State Madrasa Education Board" role in the site's experience
 * timeline (60s → 1.2s on 1M+ records, +30% payment success, −20% failures).
 */
export const bsmebAcademicPortal: CaseStudy = {
  slug: "bsmeb-academic-portal",
  eyebrow: "Bihar State Madrasa Education Board · Government",
  role: "Full Stack Developer & Team Lead",
  headline: "A results portal for 3,000 schools that stopped timing out",

  delta: {
    from: "60s",
    to: "1.2s",
    label: "Core query response time",
  },

  problem:
    "The board administers admissions, registrations, staff records, and examinations for more than 3,000 schools. The queries behind those screens ran against over a million records and took a full minute to return — long enough that staff assumed the system was broken and reloaded, multiplying the load that caused the problem. Examination season concentrates almost all of that traffic into a few days, so the failure mode arrived exactly when the system mattered most. Payments were failing at a rate that generated its own support burden.",

  approach:
    "The bottleneck was the data layer, not the interface, so that is where the work went first — profiling the real queries against production-scale data rather than a seeded development set, which is the only way the pathological cases show up. Payment reliability was treated as a second, separate problem: gateway failures needed to be distinguished from user error before anything could be fixed, which meant instrumenting the flow before changing it. I led the team delivering this across a three-year engagement.",

  built: [
    {
      title: "Admissions and registration",
      body: "End-to-end intake for schools and students, replacing a process that could not scale past its own paperwork.",
    },
    {
      title: "Teacher and institution management",
      body: "Records for staff and member madrasas across the state, with the access control a government body requires.",
    },
    {
      title: "Examination management",
      body: "The system's peak-load surface: scheduling, records, and results for the board's examination cycle.",
    },
    {
      title: "Query performance rebuild",
      body: "Restructured the queries and indexing behind the heaviest screens, taking response times on 1M+ record tables from 60 seconds to 1.2.",
    },
    {
      title: "Payment gateway integration",
      body: "Integrated SabPaisa and NTT Data, lifting successful transactions by 30% and cutting failures by 20%.",
    },
  ],

  results: [
    { value: "1.2s", from: "60s", label: "Core query response time" },
    { value: "3,000+", label: "Schools served" },
    { value: "1M+", label: "Records under query" },
    { value: "+30%", label: "Payment success rate" },
    { value: "−20%", label: "Payment failures" },
    { value: "3 yrs", label: "Engagement length, as team lead" },
  ],

  quote: {
    text: "Keshav was instrumental in building our IT infrastructure and developing our web systems from scratch. His technical expertise and dedication greatly enhanced our digital capabilities.",
    name: "Dr. Md. Noor Islam",
    role: "Controller of Examinations, Bihar State Madrasa Education Board",
    image: "/assets/avatar.webp",
  },

  caveats: [
    // TODO(keshav): your two sources disagree on the stack. The Contentful entry
    // says ReactJS + MySQL 8 + Bootstrap 5; your experience timeline says MERN
    // for the same engagement. MySQL and MongoDB are not interchangeable and a
    // technical client will spot it. Confirm which is right and fix the other.
    "Query timings are measured against the board's production dataset, which grows each examination cycle.",
  ],
};
