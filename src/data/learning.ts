export type Module = {
  id: string;
  title: string;
  summary: string;
  minutes?: number;
  link?: string;
  complianceNote?: string;
  tags?: string[];
};

export type Pathway = {
  id: string;
  title: string;
  description: string;
  category: string;
  free: true;
  educationalOnly: boolean;
  modules: Module[];
};

import { EXTERNAL } from "@/data/externalLinks";

export const PATHWAYS: Pathway[] = [
  {
    id: "financial",
    title: "Understand Your Money: Free Financial Education",
    description:
      "Educational-only modules to build confidence with credit, budgeting, and financial systems.",
    category: "Financial Literacy & Credit Education",
    free: true,
    educationalOnly: true,
    modules: [
      {
        id: "fin-credit-report",
        title: "How to Read Your Credit Report",
        summary:
          "Learn how credit reports are structured and what each section means.",
        minutes: 20,
        link: EXTERNAL.programs.financial,
        complianceNote: "Educational content only — no advisory services.",
        tags: ["credit", "reports"],
      },
      {
        id: "fin-identity-theft",
        title: "Identity Theft Awareness & Resources",
        summary:
          "Recognize red flags and know steps to take if your identity is compromised.",
        minutes: 15,
        link: EXTERNAL.programs.financial,
        complianceNote: "Educational content only — refer to qualified professionals for advice.",
        tags: ["security"],
      },
      {
        id: "fin-budgeting",
        title: "Budgeting Education",
        summary: "Principles of planning, tracking, and adjusting your spending.",
        minutes: 18,
        link: EXTERNAL.programs.financial,
        tags: ["budgeting"],
      },
      {
        id: "fin-credit-building",
        title: "Understanding Credit Building",
        summary: "How credit systems work and what influences credit history.",
        minutes: 20,
        link: EXTERNAL.programs.financial,
        tags: ["credit"],
      },
      {
        id: "fin-banking-basics",
        title: "Banking Basics & Consumer Rights",
        summary:
          "Understand accounts, fees, and your rights as a banking consumer.",
        minutes: 22,
        link: EXTERNAL.programs.financial,
        tags: ["banking", "rights"],
      },
      {
        id: "fin-debt-education",
        title: "Debt Education & Resources",
        summary: "Types of debt and resources for learning and support.",
        minutes: 20,
        link: EXTERNAL.programs.financial,
        tags: ["debt"],
      },
      {
        id: "fin-planning-education",
        title: "Financial Planning Education",
        summary: "Set goals and align daily actions with what matters most.",
        minutes: 16,
        link: EXTERNAL.programs.financial,
        tags: ["planning"],
      },
    ],
  },
  {
    id: "wellness",
    title: "Heal & Thrive: Free Wellness Education & Resources",
    description:
      "Trauma‑informed mental health education to support healing and resilience.",
    category: "Mindfulness & Wellness",
    free: true,
    educationalOnly: true,
    modules: [
      {
        id: "wel-trauma-understanding",
        title: "Understanding Trauma & Healing",
        summary:
          "Learn about trauma responses and supportive healing practices.",
        minutes: 18,
        link: EXTERNAL.programs.mindfulness,
      },
      {
        id: "wel-stress-management",
        title: "Stress Management Education",
        summary: "Evidence‑based techniques to reduce stress and tension.",
        minutes: 15,
        link: EXTERNAL.programs.mindfulness,
      },
      {
        id: "wel-mindfulness-meditation",
        title: "Mindfulness & Meditation Learning",
        summary:
          "Learn simple ways to practice presence, breathing, and grounding.",
        minutes: 15,
        link: EXTERNAL.programs.mindfulness,
      },
      {
        id: "wel-emotional-resilience",
        title: "Building Emotional Resilience",
        summary:
          "Strengthen coping skills and grow emotional flexibility over time.",
        minutes: 16,
        link: EXTERNAL.programs.mindfulness,
      },
      {
        id: "wel-self-care",
        title: "Self‑Care Education",
        summary: "Create sustainable wellness routines aligned with your reality.",
        minutes: 14,
        link: EXTERNAL.programs.mindfulness,
      },
      {
        id: "wel-healthy-relationships",
        title: "Healthy Relationships Education",
        summary: "Communication, boundaries, and connection.",
        minutes: 18,
        link: EXTERNAL.programs.mindfulness,
      },
      {
        id: "wel-community-healing",
        title: "Community Healing Resources",
        summary: "Explore collective wellness resources and practices.",
        minutes: 12,
        link: EXTERNAL.programs.mindfulness,
      },
    ],
  },
  {
    id: "business",
    title: "Build Your Future: Free Business Education & Resources",
    description:
      "Foundational business education with referrals for professional guidance.",
    category: "Business & Entrepreneurship",
    free: true,
    educationalOnly: true,
    modules: [
      {
        id: "bus-planning-education",
        title: "Business Planning Education",
        summary: "Understand core parts of a simple business plan.",
        minutes: 20,
        link: EXTERNAL.programs.business,
        complianceNote:
          "Educational content and professional referrals — not advisory services.",
      },
      {
        id: "bus-legal-structure",
        title: "Legal Structure Education",
        summary: "Learn common structures and when to seek legal/pro advice.",
        minutes: 18,
        link: EXTERNAL.programs.business,
      },
      {
        id: "bus-marketing-education",
        title: "Marketing Education",
        summary: "Principles of audience, value, and channels.",
        minutes: 16,
        link: EXTERNAL.programs.business,
      },
      {
        id: "bus-finance-education",
        title: "Small Business Financial Education",
        summary: "Cash flow basics, pricing, and financial terms.",
        minutes: 18,
        link: EXTERNAL.programs.business,
      },
      {
        id: "bus-networking",
        title: "Networking Education",
        summary: "Build relationships that support your goals.",
        minutes: 12,
        link: EXTERNAL.programs.business,
      },
      {
        id: "bus-digital-skills",
        title: "Digital Skills Education",
        summary: "Free technology skills for business and beyond.",
        minutes: 20,
        link: EXTERNAL.programs.business,
      },
      {
        id: "bus-growth-strategies",
        title: "Growth Strategies Education",
        summary: "Learn ways to test and refine what works.",
        minutes: 16,
        link: EXTERNAL.programs.business,
      },
    ],
  },
  {
    id: "life-skills",
    title: "Navigate Life: Free Essential Skills Education",
    description:
      "Everyday skills for confidence with tech, communication, and organization.",
    category: "Life Skills & Digital Literacy",
    free: true,
    educationalOnly: true,
    modules: [
      {
        id: "life-digital-literacy",
        title: "Digital Literacy Education",
        summary: "Core computer and smartphone skills, safely.",
        minutes: 22,
        link: EXTERNAL.programs.community,
      },
      {
        id: "life-time-management",
        title: "Time Management Education",
        summary: "Plan your week and prioritize with less stress.",
        minutes: 12,
        link: EXTERNAL.programs.community,
      },
      {
        id: "life-communication",
        title: "Communication Skills Education",
        summary: "Clarity, listening, and assertiveness.",
        minutes: 14,
        link: EXTERNAL.programs.community,
      },
      {
        id: "life-conflict",
        title: "Conflict Resolution Education",
        summary: "Healthy conflict tools and de‑escalation basics.",
        minutes: 14,
        link: EXTERNAL.programs.community,
      },
      {
        id: "life-goal-setting",
        title: "Goal Setting Education",
        summary: "Small steps and milestones that build momentum.",
        minutes: 12,
        link: EXTERNAL.programs.community,
      },
      {
        id: "life-job-search",
        title: "Job Search Education",
        summary: "Resumes, applications, and online tools.",
        minutes: 18,
        link: EXTERNAL.programs.community,
      },
      {
        id: "life-workplace-success",
        title: "Workplace Success Education",
        summary: "Professional skills for day‑to‑day success.",
        minutes: 16,
        link: EXTERNAL.programs.community,
      },
    ],
  },
  {
    id: "career",
    title: "Get Ready to Work: Free Career Preparation",
    description:
      "Career exploration and job readiness learning for next‑step confidence.",
    category: "Job Readiness & Career",
    free: true,
    educationalOnly: true,
    modules: [
      {
        id: "car-resume-writing",
        title: "Resume Writing Education",
        summary: "Templates and learning resources to present your story.",
        minutes: 16,
        link: EXTERNAL.programs.community,
      },
      {
        id: "car-interview-skills",
        title: "Interview Skills Education",
        summary: "Practice tools and common question frameworks.",
        minutes: 18,
        link: EXTERNAL.programs.community,
      },
      {
        id: "car-networking",
        title: "Professional Networking Education",
        summary: "Build and sustain helpful relationships.",
        minutes: 12,
        link: EXTERNAL.programs.community,
      },
      {
        id: "car-rights",
        title: "Workplace Rights Education",
        summary: "Know your protections and how to advocate for yourself.",
        minutes: 14,
        link: EXTERNAL.programs.community,
      },
      {
        id: "car-planning",
        title: "Career Planning Education",
        summary: "Explore roles and create a simple plan.",
        minutes: 14,
        link: EXTERNAL.programs.community,
      },
      {
        id: "car-second-chance",
        title: "Second‑Chance Employer Resources",
        summary: "Where to find employers committed to second chances.",
        minutes: 10,
        link: EXTERNAL.programs.community,
      },
    ],
  },
];
