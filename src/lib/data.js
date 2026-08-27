// Personal Info
export const PERSONAL_INFO = {
  name: "Sohail Masood",
  role: "Full-Stack Development Partner",
  tagline: "Your Technical Co-Founder for Growing Businesses",
  email: "design@vocryn.com",
  whatsappUrl: "https://wa.me/15717034510",
  whatsappDisplay: "+1 571-703-4510",
  phoneTel: "tel:+15717034510",
  location: "Sterling, VA",
  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "5+", label: "Years Experience" },
    { value: "100%", label: "Response Rate" }
  ]
};

// Headline services shown as links in the header and mobile menu
export const SERVICE_LINKS = [
  { label: "Web Development", short: "Web", href: "#full-stack" },
  { label: "SEO", short: "SEO", href: "#perf-seo" },
  { label: "Social Media", short: "Social", href: "#social-media" }
];

// Services
export const SERVICES = [
  {
    id: "full-stack",
    number: "01",
    title: "Full-Stack Web Applications",
    description: "End-to-end web products with robust backends, RESTful APIs, and seamlessly connected frontends.",
    tags: ["React.js", "Node.js", "JavaScript", "REST APIs", "Modern Architecture"],
    deliverables: ["Microservices & Monolith Architecture", "Scalable REST & GraphQL APIs", "High-Performance SSR / SPA Frontends"]
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-Commerce Solutions",
    description: "Conversion-optimised storefronts with seamless checkout, inventory management, and analytics dashboards.",
    tags: ["Next.js", "Stripe / Gateways", "Cart Logic", "Analytics", "Inventory"],
    deliverables: ["High-Conversion Funnels & Checkouts", "Real-Time Inventory Management", "Custom Analytics Dashboard"]
  },
  {
    id: "ai-solutions",
    number: "03",
    title: "AI-Powered Solutions",
    description: "AI & ML integration covering brain-tumour/prediction-grade models, clinical dashboards, and intelligent automation.",
    tags: ["PyTorch", "TensorFlow", "Deep Learning", "Clinical Dashboards", "Predictive ML"],
    deliverables: ["Diagnostic Deep Learning Models", "Predictive Business Signal Pipelines", "Clinical & Diagnostic Visualization"]
  },
  {
    id: "ui-ux",
    number: "04",
    title: "UI/UX Design & Prototyping",
    description: "High-fi Figma mockups, Low-fi wireframes, Design Systems.",
    tags: ["Figma", "Design Systems", "Interactive Wireframes", "UX Research"],
    deliverables: ["Comprehensive Design Systems & Tokens", "Clickable Interactive Prototypes", "Design-to-Code Parity"]
  },
  {
    id: "perf-seo",
    number: "05",
    title: "Performance & SEO Optimization",
    description: "Performance audit, Image Optimization, Code Splitting, Accessibility (WCAG).",
    tags: ["Lighthouse 100", "WCAG 2.1 AA", "Asset Pipelines", "Core Web Vitals"],
    deliverables: ["Sub-second First Contentful Paint", "Semantic Structured Data (JSON-LD)", "Full WCAG Accessibility Compliance"]
  },
  {
    id: "social-media",
    number: "06",
    title: "Social Media Management",
    description: "A month of posts planned ahead, published daily, replies answered the same day, one report at month end.",
    tags: ["Content Calendar", "Daily Publishing", "Community Replies", "Monthly Reporting"],
    deliverables: ["A Month of Posts Planned Ahead", "Same-Day Replies to Comments & DMs", "One Monthly Report with the Numbers on Top"]
  },
  {
    id: "end-to-end",
    number: "07",
    title: "End-to-End Products",
    description: "Full-stack product build, Database & authentication, Post-launch support.",
    tags: ["Full MVP", "Auth & RBAC", "Database Design", "Post-Launch Ops"],
    deliverables: ["Complete Turnkey SaaS & App Launches", "Secure Multi-Tenant Auth Architecture", "Zero-Downtime Infrastructure Setup"]
  }
];

// Process Steps
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your business goals, target audience, and technical requirements.",
    deliverables: [
      "Project brief & scope document",
      "Competitor analysis",
      "Tech stack recommendation",
      "Timeline & milestones"
    ]
  },
  {
    number: "02",
    title: "Design",
    description: "Low-fi wireframes → High-fi Figma mockups → Client approval checkpoint.",
    deliverables: [
      "Low-fidelity structural wireframes",
      "High-fidelity responsive UI mockups",
      "Interactive prototype review & approval checkpoint"
    ]
  },
  {
    number: "03",
    title: "Development",
    description: "Agile sprints with weekly demos. Clean, documented, production-ready code.",
    deliverables: [
      "Weekly demo calls",
      "Feature iterations & continuous deployment",
      "2 rounds of comprehensive revisions"
    ]
  },
  {
    number: "04",
    title: "Testing",
    description: "Cross-browser, cross-device, performance and security testing before launch.",
    deliverables: [
      "Cross-browser & cross-device compatibility",
      "Performance & Core Web Vitals audit",
      "Contact form & integration verification"
    ]
  },
  {
    number: "05",
    title: "Deployment",
    description: "Smooth deployment to production with zero downtime, monitoring and handover docs.",
    deliverables: [
      "Production deployment with CI/CD pipeline",
      "Full handover documentation & credentials transfer",
      "Automated uptime monitoring & error telemetry"
    ]
  },
  {
    number: "06",
    title: "Support",
    description: "Post-launch support, bug fixes, and feature iterations to keep your product growing.",
    deliverables: [
      "Monthly progress & performance reports",
      "Dedicated priority technical support",
      "30-day bug fix guarantee"
    ]
  }
];

// Projects
export const PROJECTS = [
  {
    id: "vocryn-ai",
    number: "01",
    title: "Vocryn AI",
    category: "Product Site",
    description: "The product site for our own AI receptionist, an appointment-booking voice agent for dental and primary care clinics, with the integrations and pricing laid out on one page.",
    metrics: "vocryn.com",
    tags: ["Voice AI", "Appointment Booking", "Pricing Page", "Integrations"],
    image: "/work/vocryn.webp",
    gradient: "from-indigo-900/35 to-violet-950/45",
    liveUrl: "https://vocryn.com"
  },
  {
    id: "caresync-ai",
    number: "02",
    title: "CareSync AI",
    category: "Healthcare SaaS",
    description: "A HIPAA-ready AI front desk for clinics. The hero carries a live call demo and the booking flow writes straight into eClinicalWorks.",
    metrics: "caresync.aiwonderz.com",
    tags: ["HIPAA-Ready", "eClinicalWorks", "Live Call Demo", "Booking Flow"],
    image: "/work/caresync.webp",
    gradient: "from-violet-900/30 to-amber-900/25",
    liveUrl: "https://caresync.aiwonderz.com"
  },
  {
    id: "aiwonderz",
    number: "03",
    title: "AIWonderz",
    category: "AI Solutions Platform",
    description: "AI voice agents, chatbots and workflow automation for service businesses, with an embedded demo reel and a chat agent running on the page itself.",
    metrics: "aiwonderz.com",
    tags: ["Voice Agents", "Chatbots", "Workflow Automation", "Embedded Demo"],
    image: "/work/aiwonderz.webp",
    gradient: "from-amber-900/25 to-indigo-950/45",
    liveUrl: "https://aiwonderz.com"
  }
];

// Tech Stack
export const TECH_STACK = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript", "Tailwind CSS"]
  },
  {
    category: "Backend & Database",
    items: ["Node.js / Express", "Django / Node.js backends", "MongoDB", "PostgreSQL"]
  },
  {
    category: "AI & Machine Learning",
    items: ["TensorFlow / PyTorch", "Data Preprocessing", "Deep Learning"]
  },
  {
    category: "Tools & Platforms",
    items: ["AWS", "Docker", "Git & GitHub", "Figma"]
  }
];

// Also Working With
export const ALSO_WORKING_WITH = [
  "Git & GitHub CI/CD",
  "Vercel / Netlify",
  "GraphQL",
  "Redis",
  "FastAPI",
  "Linux / Nginx",
  "Figma",
  "Postman"
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "Sohail built our SaaS platform with incredible speed and precision.",
    author: "Ahmed Raza",
    role: "CEO",
    company: "TechVentures PK",
    initials: "AR"
  },
  {
    quote: "Sohail delivered our platform ahead of schedule with exceptional quality.",
    author: "Founder & CEO",
    role: "Founder & CEO",
    company: "AIWonderz",
    initials: "AW"
  },
  {
    quote: "The Skillwares4u platform was built with outstanding attention to detail. Sohail understood our vision perfectly and delivered a product that exceeded all expectations.",
    author: "Hasnat Ahmed",
    role: "CEO & Founder",
    company: "Skillwares4u",
    initials: "HA"
  }
];

// Guarantees
export const GUARANTEES = [
  { title: "30-day warranty", desc: "Post-launch guarantee covering all deliverables and potential edge cases." },
  { title: "Unlimited revisions", desc: "We refine every sprint deliverable until it aligns with your exact vision." },
  { title: "IP ownership transfer", desc: "100% full intellectual property and source code ownership handed to you." },
  { title: "Full handover docs", desc: "Comprehensive architectural, deployment, and operational documentation." },
  { title: "Bug fix guarantee", desc: "Immediate resolution for any scope-related anomalies post-deployment." },
  { title: "Dedicated support", desc: "Direct communication with direct access to technical leadership." }
];
