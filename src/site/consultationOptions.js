// Choices offered in the hire-me form. Shared by the form and the api/consultation function,
// which rejects any value not listed here.
export const CONSULTATION_OPTIONS = {
  stage: ["Full-time role", "Contract role", "Freelance project", "Architecture / AI consultation"],
  services: [
    "Solution architecture",
    "Frontend development",
    "Backend & APIs",
    "AI agents & model integration",
    "Cloud & DevOps",
    "Technical leadership",
  ],
  budget: ["Under £2k", "£2k – £5k", "£5k – £15k", "£15k+", "Discuss on a call"],
  timeline: ["Immediately", "Within 1 month", "1 – 3 months", "Flexible"],
  arrangement: ["Remote", "Hybrid", "On-site"],
};

// Engagement types that are jobs rather than projects: the form asks about the role instead of a budget.
export const ROLE_STAGES = ["Full-time role", "Contract role"];
