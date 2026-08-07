import type { CaseStudy } from "@/types/portfolio";

/**
 * Sources: Contentful entry `hotel-reservation-system` (70% booking efficiency,
 * 3× traffic, CCAvenue integration) and the "Full Stack Web Developer & IT
 * Support, Hotel Patliputra Continental" role in the site's experience timeline
 * (35% database performance gain, +38% successful transactions).
 */
export const hotelReservationSystem: CaseStudy = {
  slug: "hotel-reservation-system",
  eyebrow: "Hotel Patliputra Continental · Hospitality",
  role: "Full Stack Developer & IT Support",
  headline: "Direct bookings that clear, instead of failing at the payment step",

  // No measured baseline for the old booking process, so this leads with the
  // lift alone rather than a fabricated "before".
  delta: {
    to: "+38%",
    label: "Successful transactions",
  },

  problem:
    "An independent hotel taking bookings through a system it does not control pays for every reservation twice — once in commission, once in the guest relationship it never owns. The obstacle to running direct booking is trust: if the payment step fails, the guest does not retry, they go back to the aggregator. Inventory had to be accurate in real time, because a double-booking costs more than the reservation does.",

  approach:
    "Payment reliability was the whole engagement. I integrated CCAvenue, which Indian guests recognise and already trust, and built the booking flow so that inventory was reserved and released deterministically around the payment rather than optimistically before it. Database performance mattered for the same reason — a booking screen that stalls under load produces abandoned transactions, so the two problems are the same problem.",

  built: [
    {
      title: "Real-time room booking and inventory",
      body: "Availability held accurate across concurrent bookings, so the hotel could sell directly without risking double-allocation.",
    },
    {
      title: "CCAvenue payment integration",
      body: "A payment path guests recognise, wired so that a failure at the gateway releases the held inventory instead of stranding it. Successful transactions rose 38%.",
    },
    {
      title: "Admin dashboard with booking analytics",
      body: "Gave the front desk its own view of bookings and revenue rather than a spreadsheet reconstructed after the fact.",
    },
    {
      title: "Database performance work",
      body: "Improved database performance by 35%, letting the same infrastructure absorb three times the traffic.",
    },
  ],

  results: [
    { value: "+38%", label: "Successful transactions" },
    { value: "+70%", label: "Booking efficiency" },
    { value: "3×", label: "Traffic handled on the same infrastructure" },
    { value: "+35%", label: "Database performance" },
  ],

  caveats: [
    // TODO(keshav): the dates disagree across your own sources — the Contentful
    // entry says 2021-07-15, your experience timeline says Aug 2019 – Jul 2020.
    // Fix whichever is wrong.
    "This is a PHP and MySQL build from an earlier engagement. It is included because the outcome is strong and the problem is one hospitality clients still have — not as a sample of current stack choices.",
  ],
};
