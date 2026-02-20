export const personalInfo = {
  name: "Fahad Alaraik",
  title: "Software & AI Engineer",
  company: "HUMAIN",
  location: "Riyadh, Saudi Arabia",
  email: "falaraik.dev@gmail.com",
  github: "https://github.com/FahadAlAraik",
  linkedin: "https://linkedin.com/in/fahad-alaraik", // Add your LinkedIn
  bio: "Software Engineer & AI Engineer with 3+ years of experience building and deploying AI and Generative AI solutions in production environments. I specialize in customer analytics, machine learning, and AI-driven systems that transform complex data into scalable products."
}

export const experience = [
  {
    company: "HUMAIN",
    role: "Senior AI Engineer",
    period: "Aug 2025 – Present",
    current: true,
    highlights: [
      "Developed an AI project management agent that guides users through requirements gathering via conversation, generates hierarchical project plans with tasks and timelines, and supports iterative refinement",
      "Built a Human-In-The-Loop entity resolution system using fuzzy matching to disambiguate user references, surfacing candidates via dropdown UI for confirmation",
      "Designed a conversational survey builder agent that converts natural language requirements into JSON-based form schemas, rendered dynamically with AI-assisted refinement",
      "Architected a runtime authorization layer for agentic workflows, intercepting agent actions and validating user permissions",
      "Integrated frontend UI with multiple backend systems via a unified WebSocket layer, connecting HUMAIN ONE to ERPNext"
    ]
  },
  {
    company: "Al Rajhi Bank",
    role: "Data Scientist - AI Engineer",
    period: "Nov 2023 – Aug 2025",
    current: false,
    highlights: [
      "Led end-to-end development of a beneficiary recommendation engine, from model design to integration into the mobile TypeScript SDK",
      "Developed a supervised ML model for fraud detection focusing on mule account identification with transaction-based feature engineering",
      "Built rule-based prediction model for coffee consumers using RFM modeling combined with external data scraping",
      "Developed PoC executive chatbot for natural language queries",
      "Created merchant classification model using scraped training data",
      "Implemented chunk-level tagging for RAG document retrieval optimization",
      "Developed in-house TypeScript SDK for React Native with versioning in Nexus registry"
    ]
  }
]

export const skills = {
  "Programming & Development": ["Python", "TypeScript", "React", "API Development", "Backend Engineering"],
  "Machine Learning": ["ML Algorithms", "Model Training", "Fine-tuning", "Feature Engineering"],
  "Generative AI": ["RAG Systems", "AI Orchestration", "Agentic AI", "LLM Integration"],
  "Deployment & Operations": ["Containerization", "CI/CD Pipelines", "Docker", "Cloud Deployment"]
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
    description: "Real-time chess assistance tool that captures the board from chess.com, uses a CNN model to classify each tile and detect pieces (white/black), reconstructs the board state programmatically, and feeds it to Stockfish to suggest the optimal next move. Features a Python GUI for one-click board capture and analysis.",
    tech: ["Python", "TensorFlow", "CNN", "Stockfish", "OpenCV", "Tkinter"],
    github: "https://github.com/FahadAlAraik",
    featured: true
  },
  {
    title: "Agent Farm",
    description: "A multi-agent AI system running a 'Council of Claudes' - an orchestrator that spawns, coordinates, and manages multiple specialized Claude Code agents to collaboratively solve complex tasks. Features Discord integration, Redis-based queuing, and council commands for spawning, discussing, and synthesizing agent outputs.",
    tech: ["Python", "Claude API", "Redis", "Discord.py", "Multi-Agent AI"],
    github: "https://github.com/FahadAlAraik",
    featured: true
  },
  {
    title: "Riyadh Establishments Dataset",
    description: "Comprehensive dataset containing 8.8k records of establishments in Riyadh including restaurants, coffee shops, supermarkets, pharmacies, and more. Built an intelligent scraping bot to collect and compile the data.",
    tech: ["Python", "Web Scraping", "Data Engineering"],
    link: "https://www.kaggle.com",
    badge: "Kaggle Bronze Badge",
    featured: true
  },
  {
    title: "Nabtah - Plant Disease Detection",
    description: "Web-based AI system for detecting plant diseases across multiple crop types using deep learning and image classification.",
    tech: ["React", "Flask", "TensorFlow", "CNN"],
    featured: true
  },
  {
    title: "Jadwali - Course Scheduler",
    description: "Automated course scheduling tool for KSU students that scrapes available courses and generates optimal schedules.",
    tech: ["Python", "Flask", "Web Scraping"],
    featured: false
  }
]

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }
]
