export interface DayModule {
  day: number;
  title: string;
  author: string;
  description: string;
  items: string[];
  reward: string;
}

export const modules: DayModule[] = [
  {
    day: 1,
    title: "Website Strategy & Product Thinking",
    author: "Mathis",
    description:
      "Learn how to think like a strategist before touching any design tool. Understand what makes a website feel credible and how to choose the right type to sell.",
    items: [
      "How founders think vs designers",
      "What makes a website feel credible",
      "Choosing the right type of website to sell",
      "Defining one clear product idea",
      "Clarifying target user & main goal",
    ],
    reward:
      "A clear product vision and website strategy you can pitch to any client with confidence.",
  },
  {
    day: 2,
    title: "High-End Website Design (Figma)",
    author: "Mathis",
    description:
      "Dive into Figma and learn the fundamentals of designing a clean, trustworthy website from scratch.",
    items: [
      "Design systems vs screens",
      "Fonts, colors, spacing fundamentals",
      "Layouts that build trust",
      "Designing a clean homepage",
      "Structuring key sections (hero, value, CTA)",
    ],
    reward:
      "A professional Figma homepage design ready to be turned into a real website.",
  },
  {
    day: 3,
    title: "Vibe-Coding the Website with AI",
    author: "Mathis",
    description:
      "Turn your Figma design into a real, live website using AI-powered tools and modern development workflows.",
    items: [
      "Figma → website workflow",
      "Using Cursor to build fast without breaking quality",
      "Responsive layout basics",
      'Making the site "good enough to sell"',
      "Publishing a live or shareable version",
    ],
    reward:
      "A live, shareable website you built from your own design — ready to show clients.",
  },
  {
    day: 4,
    title: "Personalization & Reusability",
    author: "Mathis",
    description:
      "Learn how to turn the website you just built into a reusable system. The goal is to duplicate it easily and use AI to quickly adapt the design, copy, and branding for a specific company.",
    items: [
      "Turn the website into a reusable system",
      "Duplicate and adapt the design quickly with AI",
      "Customize copy and branding for a specific company",
    ],
    reward:
      "A reusable website template system you can personalize for any client in minutes.",
  },
  {
    day: 5,
    title: "Offer & Pricing",
    author: "Adrien",
    description:
      "Finalize your offer and pricing, then share it with the community for feedback.",
    items: [
      'Write a recap post titled: "Day 5 - My Final Offer"',
      "Include your final offer and pricing",
      "Comment on 5 members' offers",
    ],
    reward: "$300 Gemini API credit",
  },
  {
    day: 6,
    title: "Outreach Execution",
    author: "Adrien",
    description:
      "Put your outreach plan into action and report your results to the community.",
    items: [
      'Write a recap post titled: "Day 6 - Outreach Report"',
      "Include number of contacts, replies, and meetings",
      "Comment on 5 members' outreach recaps",
    ],
    reward:
      "Perplexity — 3 months free on the Enterprise Pro plan (up to 50 seats)",
  },
  {
    day: 7,
    title: "Closing Momentum",
    author: "Adrien",
    description:
      "Share your closing results and reflect on what you've learned during this 7-day sprint.",
    items: [
      'Write a recap post titled: "Day 7 - Closing Result"',
      "Include outcome (won / pending / lessons)",
      "Share what you've learned from this 7-day challenge",
      "Comment on 5 members' Day 7 posts",
    ],
    reward:
      "Full Refund of Creative Club if you complete the 30-day challenge",
  },
  // Days 8–30: Coming soon
  ...Array.from({ length: 23 }, (_, i) => ({
    day: i + 8,
    title: `Day ${i + 8} — Coming Soon`,
    author: "TBA",
    description: "This module is coming soon. Stay tuned!",
    items: ["Content coming soon"],
    reward: "Coming soon!",
  })),
];
