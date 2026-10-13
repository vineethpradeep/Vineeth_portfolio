// Content for the portfolio site. Facts come from the CV (public/vineeth_pradeep_cv.pdf);
// brand and copy rules live in VINEETH.md.

import { projects } from "../data/constants";

export const profile = {
  name: "Vineeth Pradeep",
  fullName: "Vineeth Suvarna Pradeep",
  wordmark: "VINEETH",
  role: "Solutions Architect & Full-Stack Developer",
  roleDetail: "Frontend · Backend · AI-driven solutions",
  tagline: "Business solutions, architected with AI",
  location: "Swansea, UK",
  availability: "Open to roles & projects",
  email: "vineethpradeeps@gmail.com",
  linkedin: "https://www.linkedin.com/in/vineeth-ui-developer",
  cv: "/vineeth_pradeep_cv.pdf",
  // Primary deployment. The Netlify copy has no serverless functions, so its form posts here.
  siteUrl: "https://vineethjourney.vercel.app",
  heroStatement:
    "I architect AI-driven business *solutions* end to end: modern frontends, robust backends and intelligent AI agents that turn real business problems into products people use.",
  aboutTitle: "Architecture, full-stack and *AI* in one solution.",
  about: [
    "I'm a Solutions Architect and Full-Stack Developer with 13+ years designing and delivering web, cloud and digital platforms across B2B, B2C and education, from IBM and HCL to my current role as Technical Lead at QTHE in the UK.",
    "I design the whole solution: the architecture and data flows, responsive frontends in React and Next.js, scalable backends and APIs in .NET, Node.js and Python, and AI-driven features such as tutor agents and model-generated plans validated by application rules, delivered on Azure with CI/CD.",
  ],
  whyHire: [
    {
      title: "Solution architecture",
      text: "I map business goals to data flows, integration boundaries and cloud architecture before any code is written.",
    },
    {
      title: "Frontend to backend",
      text: "React and Next.js interfaces, .NET, Node.js and Python services, SQL and NoSQL data: one person across the whole stack.",
    },
    {
      title: "AI-driven delivery",
      text: "I design AI agents and model workflows with structured outputs, validation and fallbacks, so AI features hold up in production.",
    },
  ],
  cta: "Hire me",
};

// Personal statement shown as a large quote.
export const statement = {
  quote: "Great software isn't measured in lines of code. It's measured in problems *solved* for the people who use it.",
  caption: "Personal statement",
};

export const stats = [
  { value: "13+", label: "Years building software" },
  { value: "20+", label: "Projects delivered" },
  { value: "8", label: "Roles across 7 organisations" },
  { value: "3", label: "QTHE products in development" },
];

// How I deliver, shown one step at a time in the approach section.
export const services = [
  {
    title: "Understand the business",
    text: "Requirements analysis to pin down the real problem, the users and what success looks like, before any code is written.",
  },
  {
    title: "Architect the solution",
    text: "Data flows, integration boundaries, cloud setup and a phased delivery roadmap the whole team can follow.",
  },
  {
    title: "Frontend experience",
    text: "Accessible, responsive React and Next.js interfaces designed in Figma, with SEO and performance built in.",
  },
  {
    title: "Backend & APIs",
    text: ".NET, Node.js, Laravel or Python services and APIs on PostgreSQL, SQL Server or MongoDB, built to scale.",
  },
  {
    title: "AI agents & models",
    text: "AI agents and model integrations with structured outputs, validation and fallbacks, used where they genuinely improve outcomes.",
  },
  {
    title: "Release & scale",
    text: "Playwright, Jest and xUnit testing, CI/CD with GitHub Actions or Jenkins, and Docker and Kubernetes on Azure or AWS.",
  },
];

// What I'm leading now (from the CV's selected projects).
export const currentProjects = [
  {
    title: "QTHE Accredited Learning Platform",
    role: "Technical Lead",
    image: "/work/portfolio_21.jpg",
    url: "https://dev.qthe.co.uk/",
    points: [
      "Course creation, assessor review, publishing, enrolment, assessment and certification across multiple user roles.",
      "Certificate controls with public verification, plus payment and enrolment reliability.",
      "Messaging, institute learners, video processing and delivery on Azure.",
    ],
    tech: ["React", "Next.js", ".NET", "Azure", "Kubernetes"],
  },
  {
    title: "QTHE Kids MindMath / CLP",
    role: "Technical Lead",
    image: "/work/portfolio_20.jpg",
    url: "https://dev.qthemindmath.com/",
    points: [
      "Scene-based Creator Studio with environments, characters, objects, subject tools, behaviours and interactions.",
      "Runtime and XState separation for authored intent, interaction evaluation, learner progress and animation.",
      "Responsive Play Scene and Programme Preview, a digital abacus and multi-subject platform design.",
    ],
    tech: ["React", "XState", "TypeScript", ".NET", "Azure"],
  },
  {
    title: "QBuddy AI Agent Workflows",
    role: "Tutor-agent design",
    image: null,
    url: null,
    points: [
      "Programme and lesson planning through .NET orchestration and Python model integration.",
      "Structured output validation and authored fallbacks, with tutor workflows at preview stage.",
      "AI proposes lesson intent and guidance; application rules control validation, assessment and progression.",
    ],
    tech: [".NET", "Python", "AI agents", "JSON schemas"],
  },
];

// Technology stack, grouped as on the CV.
export const stackGroups = [
  {
    title: "Front-end",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Angular", "Vue.js", "HTML5", "CSS3", "Tailwind", "Bootstrap", "SCSS", "PWA", "React Native", "Flutter"],
  },
  {
    title: "Backend & APIs",
    items: ["C#", "ASP.NET Core Web API", "Node.js", "Express.js", "PHP", "Laravel", "Python", "Django", "REST APIs"],
  },
  {
    title: "AI & agent architecture",
    items: [
      "AI agent design",
      "Tutor agents",
      "Model integration",
      ".NET / Python orchestration",
      "Structured JSON plans",
      "AI-assisted authoring",
      "Validation & fallback workflows",
    ],
  },
  {
    title: "Data platforms",
    items: ["PostgreSQL", "SQL Server", "MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "DevOps & cloud",
    items: ["Azure", "AKS", "Kubernetes", "Docker", "AWS", "GCP", "Terraform", "Jenkins", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Performance & testing",
    items: ["Playwright", "Jest", "Cypress", "xUnit", "React Testing Library", "E2E & regression"],
  },
  {
    title: "Design & collaboration",
    items: ["Figma", "Adobe Suite", "Jira", "Confluence", "Agile", "Scrum", "Accessibility", "SEO", "Performance"],
  },
];

// Career history from the CV, newest first.
export const experience = [
  {
    role: "Technical Lead / Full-Stack Developer",
    company: "QTHE",
    place: "United Kingdom",
    date: "2025 – Present",
    points: [
      "Lead technical delivery across accredited learning and QTHE Kids MindMath / CLP, translating education requirements into front-end, backend and cloud development.",
      "Guide React/Next.js, .NET services, Azure/Kubernetes, data flows and integration boundaries.",
      "Lead Creator Studio and learner runtime development: lesson and scene authoring, semantic assets, animation, interactions, evaluation, gating and responsive preview.",
      "Coordinate architecture, QA and releases across instructor, assessor, institute, learner, assessment and certification workflows.",
      "Shape AI-assisted lesson authoring and QBuddy tutor-agent design, with model-generated plans validated by deterministic application rules.",
    ],
    tech: ["React", "Next.js", ".NET", "Azure", "Kubernetes", "AI agents"],
  },
  {
    role: "Freelance Web Developer",
    company: "Freelance",
    place: "Swansea, UK",
    date: "Jul 2024 – Present",
    points: [
      "Built client-facing web applications, including property listings and real-estate workflows using PHP and Laravel.",
      "Delivered bilingual React and Vite websites for Swansea businesses, including AC Jenkins Travel Services and Gerwyn Steele.",
      "Delivered SEO, structured metadata and performance improvements.",
    ],
    tech: ["PHP", "Laravel", "React", "Vite", "SEO"],
  },
  {
    role: "Senior Application Developer",
    company: "IBM",
    place: "India",
    date: "Aug 2022 – Oct 2023",
    points: [
      "Contributed to Amazon Connect IVR optimisation, contact flows and queue routing.",
      "Delivered React UI enhancements and workforce-management automation using Terraform.",
    ],
    tech: ["React", "Amazon Connect", "AWS", "Terraform"],
  },
  {
    role: "Tech Lead – UI Developer",
    company: "HCL",
    place: "India",
    date: "May 2020 – Aug 2022",
    points: [
      "Led telematics dashboards using React, D3.js and real-time analytics.",
      "Implemented monorepo and CI/CD practices to improve collaboration and deployment speed.",
    ],
    tech: ["React", "D3.js", "Monorepo", "CI/CD"],
  },
  {
    role: "Senior Analyst – UI Developer",
    company: "Apptium Technologies",
    place: "India",
    date: "Mar 2018 – Jan 2020",
    points: [
      "Delivered Angular telecom marketplace experiences with CMS/CRM integrations.",
      "Improved API-connected business processes and front-end consistency.",
    ],
    tech: ["Angular", "CMS", "CRM", "REST APIs"],
  },
  {
    role: "Business Associate",
    company: "Crown Solutions",
    place: "India",
    date: "Jun 2017 – Dec 2017",
    points: ["Designed automated test frameworks and supported Docker/cloud deployment and DNS configuration."],
    tech: ["Test automation", "Docker", "Cloud"],
  },
  {
    role: "Software Web Designer",
    company: "Ducen IT",
    place: "India",
    date: "Oct 2013 – Jun 2017",
    points: [
      "Designed UI/UX and data-visualisation components for business-intelligence dashboards; supported agile MVP delivery.",
    ],
    tech: ["UI/UX", "Data visualisation", "Agile"],
  },
  {
    role: "System Administrator",
    company: "Narayanaguru College",
    place: "India",
    date: "Nov 2007 – May 2010",
    points: ["Supported systems administration, institutional branding and marketing materials."],
    tech: ["Systems admin", "Branding"],
  },
];

export const achievements = [
  {
    title: "Engineering reliability",
    text: "Identified production bottlenecks and documented repeatable engineering practices to improve delivery reliability.",
  },
  {
    title: "Concept Visualization Award",
    text: "Recognised for design innovation and contributions to major client initiatives.",
  },
];

export const leadership = [
  "Architecture and technical review",
  "Phased delivery planning",
  "Cross-functional coordination",
  "QA and release readiness",
  "Production support",
];

// Descriptions and tags come from the project list in src/data/constants.js, matched by `source`.
const projectList = projects[0].projects;
const fromProject = (source) => {
  const p = projectList.find((item) => item.title === source);
  return { description: p.description, tags: p.tags };
};

export const work = [
  { title: "QTHE Accreditation", source: "QTHE Accreditation", image: "/work/portfolio_21.jpg", url: "https://dev.qthe.co.uk/" },
  { title: "QTHE MindMath", source: "QTHE MindMath", image: "/work/portfolio_20.jpg", url: "https://dev.qthemindmath.com/" },
  { title: "AC Jenkins", source: "AC Jenkins Travel Services", image: "/work/portfolio_19.jpg", url: "https://acjenkins-delta.vercel.app/" },
  { title: "Gerwyn Steele", source: "Gerwyn Steele", image: "/work/portfolio_18.jpg", url: "https://gerwynsteele.vercel.app/" },
  { title: "Eisken Properties", source: "Eisken Properties", image: "/work/portfolio_10.jpg", url: "https://www.eiskenproperties.com" },
  { title: "Dotseek", source: "Dotseek", image: "/work/portfolio_16.jpg", url: "https://www.dotseek.co.uk/" },
  { title: "Edumex", source: "Edumex", image: "/work/edumex.jpg", url: "https://www.edumex.co.uk/" },
  { title: "Mubarak", source: "Mubarak Restaurant", image: "/work/portfolio_15.jpg", url: "https://www.mubarakhotels.com/" },
  { title: "Hostel Booking", source: "Accommodation Booking", image: "/work/portfolio_17.jpg", url: "https://hostelbookingcom.netlify.app/" },
  { title: "ThoughtWalks", source: "ThoughtWalks", image: "/work/portfolio_8.jpg", url: "https://www.thoughtwalks.net/" },
  { title: "Intelliforger", source: "Intelliforger", image: "/work/portfolio_14.jpg", url: "https://intelliforgerltd.netlify.app/" },
  { title: "Edumex Kids", source: "Edumex Kids", image: "/work/edumex-kids.jpg", url: "https://www.edumex.co.uk/kids/" },
].map((item) => ({ ...item, ...fromProject(item.source) }));

// Projects shown in the hero ring, the approach fly-through and the closing strip.
export const gallery = work.slice(0, 10);

// Portfolio overviews, shown in the slot the template uses for testimonials.
export const overviews = [
  {
    title: "QTHE Accreditation",
    sector: "Education · Accreditation",
    image: "/work/portfolio_21.jpg",
    url: "https://dev.qthe.co.uk/",
    vision: "Make accredited qualifications easy to find, buy and complete online, for individuals and organisations.",
    text: "One platform where learners discover, enrol and get certified, organisations buy training at scale, and experts publish their own courses.",
  },
  {
    title: "QTHE MindMath",
    sector: "EdTech · Children",
    image: "/work/portfolio_20.jpg",
    url: "https://dev.qthemindmath.com/",
    vision: "Give every child a confident start in maths, and give parents a clear view of their progress.",
    text: "A personalised Math and Abacus platform with adaptive learning paths, parent and student accounts and weekly progress reports.",
  },
  {
    title: "AC Jenkins",
    sector: "Transport · Swansea",
    image: "/work/portfolio_19.jpg",
    url: "https://acjenkins-delta.vercel.app/",
    vision: "Turn a trusted local transport name into a modern brand that wins bookings online.",
    text: "A bilingual site with a guided journey selector that turns visitors into quote enquiries for airport, cruise, event and contract travel.",
  },
  {
    title: "Eisken Properties",
    sector: "Real estate · Lettings",
    image: "/work/portfolio_10.jpg",
    url: "https://www.eiskenproperties.com",
    vision: "Run a growing letting agency from one system instead of spreadsheets and email.",
    text: "A live property platform with role-based access for admins, agents and tenants, listings management, maps and automated customer emails.",
  },
  {
    title: "Gerwyn Steele",
    sector: "Wellbeing · Small business",
    image: "/work/portfolio_18.jpg",
    url: "https://gerwynsteele.vercel.app/",
    vision: "Bring yoga, martial arts and sound healing together under one calm, bookable brand.",
    text: "A bilingual home for classes, workshops, retreats and memberships, with one simple journey from discovery to booking.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Now", href: "#current" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Portfolio", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
