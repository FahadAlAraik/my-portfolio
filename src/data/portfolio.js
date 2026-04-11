export const personalInfo = {
  name: "Fahad Alaraik",
  title: "Senior Data Scientist",
  company: "HUMAIN",
  location: "Riyadh, Saudi Arabia",
  email: "falaraik.dev@gmail.com",
  github: "https://github.com/FahadAlAraik",
  linkedin: "https://linkedin.com/in/fahad-alaraik",
  bio: "Software Engineer & AI Engineer with 3+ years of experience building and deploying AI and Generative AI solutions in production environments. I specialize in customer analytics, machine learning, and AI-driven systems that transform complex data into scalable products."
}

export const experience = [
  {
    company: "HUMAIN",
    role: "Senior AI Engineer",
    period: "Aug 2025 – Present",
    current: true,
    branch: "main",
    color: "#a6e22e",
    highlights: [
      "Developed an AI project management agent that guides users through requirements gathering via conversation, generates hierarchical project plans with tasks and timelines, and supports iterative refinement",
      "Built a Human-In-The-Loop entity resolution system using fuzzy matching to disambiguate user references, surfacing candidates via dropdown UI for confirmation",
      "Designed a conversational survey builder agent that converts natural language requirements into JSON-based form schemas, rendered dynamically with AI-assisted refinement",
      "Architected a runtime authorization layer for agentic workflows, intercepting agent actions and validating user permissions",
      "Integrated frontend UI with multiple backend systems via a unified WebSocket layer, connecting HUMAIN ONE to ERPNext"
    ],
    techFocus: ["Agentic AI", "Python", "WebSocket", "Microservices"]
  },
  {
    company: "Al Rajhi Bank",
    role: "Data Scientist - AI Engineer",
    period: "Nov 2023 – Aug 2025",
    current: false,
    branch: "feature/banking-ai",
    color: "#66d9ef",
    highlights: [
      "Led end-to-end development of a beneficiary recommendation engine, from model design to integration into the mobile TypeScript SDK",
      "Developed a supervised ML model for fraud detection focusing on mule account identification with transaction-based feature engineering",
      "Built rule-based prediction model for coffee consumers using RFM modeling combined with external data scraping",
      "Developed PoC executive chatbot for natural language queries",
      "Created merchant classification model using scraped training data",
      "Implemented chunk-level tagging for RAG document retrieval optimization",
      "Developed in-house TypeScript SDK for React Native with versioning in Nexus registry"
    ],
    techFocus: ["ML", "Fraud Detection", "RAG", "TypeScript SDK"]
  }
]

export const skills = {
  "Programming & Development": {
    items: ["Python", "TypeScript", "React", "API Development", "Backend Engineering"],
    weight: 0.95,
  },
  "Machine Learning": {
    items: ["ML Algorithms", "Model Training", "Fine-tuning", "Feature Engineering"],
    weight: 0.9,
  },
  "Generative AI": {
    items: ["RAG Systems", "AI Orchestration", "Agentic AI", "LLM Integration"],
    weight: 0.92,
  },
  "Deployment & Operations": {
    items: ["Containerization", "CI/CD Pipelines", "Docker", "Cloud Deployment"],
    weight: 0.8,
  }
}

export const education = {
  institution: "King Saud University",
  degree: "BS in Software Engineering",
  honors: "First-class honors",
  gpa: "4.83 / 5",
  period: "Sept 2019 – Jun 2023",
  projects: [
    {
      name: "Nabtah",
      description: "AI system for detecting plant diseases in grapes, corn, cherries, potatoes, tomatoes, and bell peppers",
      tech: ["React", "Flask", "TensorFlow"]
    },
    {
      name: "Jadwali",
      description: "Tool that scrapes KSU's available courses and generates automatic schedules for students",
      tech: ["Python", "Flask"]
    }
  ]
}

export const projects = [
  {
    title: "Chess Vision Engine",
    description: "Real-time chess assistance tool that captures the board from chess.com, uses a CNN model to classify each tile and detect pieces (white/black), reconstructs the board state programmatically, and feeds it to Stockfish to suggest the optimal next move.",
    tech: ["Python", "TensorFlow", "CNN", "Stockfish", "OpenCV", "Tkinter"],
    github: "https://github.com/FahadAlAraik",
    featured: true,
    category: "model-deployment",
    relatedNodes: ["Python", "ML Algorithms", "Model Training"],
  },
  {
    title: "Agent Farm",
    description: "A multi-agent AI system running a 'Council of Claudes' - an orchestrator that spawns, coordinates, and manages multiple specialized Claude Code agents to collaboratively solve complex tasks. Features Discord integration, Redis-based queuing, and council commands.",
    tech: ["Python", "Claude API", "Redis", "Discord.py", "Multi-Agent AI"],
    github: "https://github.com/FahadAlAraik",
    featured: true,
    category: "agentic-ai",
    relatedNodes: ["Agentic AI", "AI Orchestration", "Python"],
  },
  {
    title: "Riyadh Establishments Dataset",
    description: "Comprehensive dataset containing 8.8k records of establishments in Riyadh. Built an intelligent scraping bot to collect and compile the data.",
    tech: ["Python", "Web Scraping", "Data Engineering"],
    link: "https://www.kaggle.com",
    badge: "Kaggle Bronze Badge",
    featured: true,
    category: "data-extraction",
    relatedNodes: ["Python", "Feature Engineering"],
  },
  {
    title: "Nabtah - Plant Disease Detection",
    description: "Web-based AI system for detecting plant diseases across multiple crop types using deep learning and image classification.",
    tech: ["React", "Flask", "TensorFlow", "CNN"],
    featured: true,
    category: "model-deployment",
    relatedNodes: ["React", "Python", "Model Training"],
  },
  {
    title: "Jadwali - Course Scheduler",
    description: "Automated course scheduling tool for KSU students that scrapes available courses and generates optimal schedules.",
    tech: ["Python", "Flask", "Web Scraping"],
    featured: false,
    category: "tool",
    relatedNodes: ["Python", "Backend Engineering"],
  }
]

// Neural network node definitions for 3D visualization
export const neuralNodes = [
  { id: "genai",     label: "Generative AI",    group: "core",   size: 1.4 },
  { id: "rag",       label: "RAG Systems",      group: "core",   size: 1.2 },
  { id: "python",    label: "Python",            group: "core",   size: 1.3 },
  { id: "ml",        label: "Machine Learning",  group: "skill",  size: 1.1 },
  { id: "agentic",   label: "Agentic AI",        group: "skill",  size: 1.1 },
  { id: "ts",        label: "TypeScript",         group: "skill",  size: 0.9 },
  { id: "react",     label: "React",              group: "skill",  size: 0.9 },
  { id: "docker",    label: "Docker",             group: "ops",    size: 0.8 },
  { id: "api",       label: "API Dev",            group: "ops",    size: 0.8 },
  { id: "llm",       label: "LLM Integration",   group: "skill",  size: 1.0 },
  { id: "finetune",  label: "Fine-tuning",        group: "skill",  size: 0.9 },
  { id: "feateng",   label: "Feature Eng.",       group: "skill",  size: 0.85 },
]

// Connections between neural nodes (synapses)
export const neuralEdges = [
  { from: "genai",   to: "rag",      weight: 0.95 },
  { from: "genai",   to: "llm",      weight: 0.9 },
  { from: "genai",   to: "agentic",  weight: 0.85 },
  { from: "rag",     to: "python",   weight: 0.8 },
  { from: "python",  to: "ml",       weight: 0.9 },
  { from: "python",  to: "api",      weight: 0.75 },
  { from: "python",  to: "docker",   weight: 0.6 },
  { from: "ml",      to: "finetune", weight: 0.85 },
  { from: "ml",      to: "feateng",  weight: 0.8 },
  { from: "agentic", to: "llm",      weight: 0.9 },
  { from: "agentic", to: "python",   weight: 0.85 },
  { from: "ts",      to: "react",    weight: 0.9 },
  { from: "ts",      to: "api",      weight: 0.7 },
  { from: "react",   to: "api",      weight: 0.65 },
  { from: "llm",     to: "finetune", weight: 0.7 },
  { from: "docker",  to: "api",      weight: 0.6 },
  { from: "rag",     to: "llm",      weight: 0.85 },
  { from: "genai",   to: "python",   weight: 0.8 },
]

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }
]
