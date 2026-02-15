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
    title: "Positioning & The Offer",
    author: "Adrien",
    description:
      "Find your niche and craft an offer so good that prospects can't say no.",
    items: [
      "Pick an industry",
      "Use the prompt I shared to make research with ChatGPT on this industry",
      "Create a No-Brainer offer",
    ],
    reward:
      "A niche-specific, no-brainer offer that makes prospects say yes immediately.",
  },
  {
    day: 6,
    title: "Outreach Masterclass",
    author: "Adrien",
    description:
      "Master the art of finding and reaching out to potential clients using proven scripts and tools.",
    items: [
      "Go to Google Maps, and search for your industry",
      "Scrap all their info with the extension Data Scraper",
      "DM, or cold call them using the script I sent you (tell them that you've just built a brand new website for them for free, and that you'd like to show it to them on a meeting)",
      "How to schedule a meeting (ask for their email, and open Google Calendar)",
      "Or use Cal.com if you close via messages",
    ],
    reward:
      "A full pipeline of prospects with their contact info, ready for outreach.",
  },
  {
    day: 7,
    title: "Closing Your First Client",
    author: "Adrien",
    description:
      "Everything you need to know to run the meeting, close the deal, and get paid.",
    items: [
      "Make sure they join the meeting: strategies to avoid no-show",
      "Prepare the site demo",
      "Follow the script",
      "Handle objections",
      "Send Stripe payment link",
      "Collect a review",
      "Ask for referral",
    ],
    reward:
      "The skills and scripts to close your first paying client and get a 5-star review.",
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
