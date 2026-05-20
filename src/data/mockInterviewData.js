/* ─────────────────────────────────────────────────────────────────
   MOCK INTERVIEW DATA
   In Sprint 4 this will be replaced by API calls.
   Structure mirrors the /api/v1/interview/plan response shape.
───────────────────────────────────────────────────────────────── */

export const COMPANY_META = {
  google: {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    industry: "Product / Cloud",
    accentColor: "#0a7c6e",
    tip: "Google heavily focuses on System Design & DSA. Expect 2–3 coding rounds and at least one system design round for 3–5 yr experience.",
    processSteps: [
      "Online Coding Test",
      "Technical Round 1 (DSA)",
      "Technical Round 2 (Java/Spring)",
      "System Design Round",
      "Googliness / HR",
      "Team Match & Offer",
    ],
  },
  jpmorgan: {
    name: "JPMorgan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg",
    industry: "FinTech / Banking",
    accentColor: "#f59e0b",
    tip: "JPMorgan focuses on Java concurrency, low-latency systems, and fintech domain knowledge. SQL and multithreading are critical.",
    processSteps: [
      "HireVue Video Interview",
      "Technical Phone Screen",
      "Technical Round (Java + Concurrency)",
      "Domain Round (FinTech)",
      "HR / Cultural Fit",
      "Offer",
    ],
  },
  tcs: {
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    industry: "IT Services",
    accentColor: "#ff6b35",
    tip: "TCS follows a structured NQT + Technical + Managerial + HR pattern. Focus on Core Java, OOPs, and basic SQL.",
    processSteps: [
      "TCS NQT (Online Test)",
      "Technical Interview (Java + OOPs)",
      "Managerial Round",
      "HR Round",
      "Offer & Document Verification",
    ],
  },
  deloitte: {
    name: "Deloitte",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
    industry: "Consulting / IT",
    accentColor: "#0a7c6e",
    tip: "Deloitte focuses on full-stack Java with React. Expect questions on Spring Boot REST APIs, React basics, and consulting scenarios.",
    processSteps: [
      "Online Aptitude + Coding Test",
      "Technical Round 1 (Java + Spring Boot)",
      "Technical Round 2 (React + APIs)",
      "Case Study / Consulting Round",
      "HR Round",
      "Offer",
    ],
  },
  infosys: {
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    industry: "IT Services",
    accentColor: "#f59e0b",
    tip: "Infosys InfyTQ platform is key. Focus on Core Java, Spring MVC, Hibernate, and basic DSA. Aptitude carries significant weight.",
    processSteps: [
      "InfyTQ / HackWithInfy Test",
      "Technical Interview (Java + Spring)",
      "HR Interview",
      "Offer",
    ],
  },
};

/* ── Round configs per company ─────────────────────────────────── */

const GOOGLE_ROUNDS = [
  {
    id: "technical",
    icon: "💻",
    title: "Technical Round",
    subtitle: "Core Java, Spring Boot & Microservices",
    accentColor: "#0a7c6e",
    totalQuestions: 42,
    completedQuestions: 0,
    totalTopics: 7,
    completedTopics: 0,
    status: "not_started",     // not_started | in_progress | completed
    estimatedHours: 12,
    topics: [
      { id: "oops",           title: "OOPs & Design Principles", questionCount: 6,  status: "not_started", googleAsked: 5, difficulty: "medium" },
      { id: "collections",    title: "Java Collections",          questionCount: 8,  status: "not_started", googleAsked: 7, difficulty: "medium" },
      { id: "multithreading", title: "Multithreading & Concurrency", questionCount: 7, status: "not_started", googleAsked: 6, difficulty: "hard" },
      { id: "spring-boot",    title: "Spring Boot",               questionCount: 8,  status: "not_started", googleAsked: 5, difficulty: "medium" },
      { id: "microservices",  title: "Microservices",             questionCount: 6,  status: "not_started", googleAsked: 4, difficulty: "hard" },
      { id: "jvm",            title: "JVM Internals",             questionCount: 4,  status: "not_started", googleAsked: 3, difficulty: "hard" },
      { id: "streams",        title: "Java 8+ Streams & Lambdas", questionCount: 3,  status: "not_started", googleAsked: 4, difficulty: "medium" },
    ],
  },
  {
    id: "coding",
    icon: "🧮",
    title: "Coding Round",
    subtitle: "DSA, Algorithms & Problem Solving",
    accentColor: "#f59e0b",
    totalQuestions: 30,
    completedQuestions: 0,
    totalTopics: 6,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 20,
    topics: [
      { id: "arrays-strings",  title: "Arrays & Strings",         questionCount: 8,  status: "not_started", googleAsked: 8, difficulty: "medium" },
      { id: "trees-graphs",    title: "Trees & Graphs",           questionCount: 6,  status: "not_started", googleAsked: 7, difficulty: "hard" },
      { id: "dp",              title: "Dynamic Programming",       questionCount: 6,  status: "not_started", googleAsked: 5, difficulty: "hard" },
      { id: "recursion",       title: "Recursion & Backtracking",  questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "medium" },
      { id: "hashing",         title: "Hashing & Maps",           questionCount: 3,  status: "not_started", googleAsked: 6, difficulty: "easy"   },
      { id: "sorting",         title: "Sorting & Searching",       questionCount: 3,  status: "not_started", googleAsked: 3, difficulty: "medium" },
    ],
  },
  {
    id: "system-design",
    icon: "🏗️",
    title: "System Design",
    subtitle: "HLD, LLD & Scalability",
    accentColor: "#ff6b35",
    totalQuestions: 18,
    completedQuestions: 0,
    totalTopics: 4,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 15,
    topics: [
      { id: "hld",             title: "High Level Design (HLD)",   questionCount: 5,  status: "not_started", googleAsked: 6, difficulty: "hard" },
      { id: "lld",             title: "Low Level Design (LLD)",    questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "hard" },
      { id: "db-design",       title: "Database Design",           questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "medium" },
      { id: "api-design",      title: "API Design & REST",         questionCount: 4,  status: "not_started", googleAsked: 3, difficulty: "medium" },
    ],
  },
  {
    id: "hr",
    icon: "🤝",
    title: "Behavioral & HR",
    subtitle: "Googliness, Culture Fit & Process",
    accentColor: "#64748b",
    totalQuestions: 10,
    completedQuestions: 0,
    totalTopics: 3,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 3,
    topics: [
      { id: "behavioral",      title: "Behavioral Questions",      questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "easy" },
      { id: "googliness",      title: "Googliness & Culture",      questionCount: 3,  status: "not_started", googleAsked: 3, difficulty: "easy" },
      { id: "salary-process",  title: "Salary & Process",          questionCount: 3,  status: "not_started", googleAsked: 2, difficulty: "easy" },
    ],
  },
];

const JPMORGAN_ROUNDS = [
  {
    id: "technical",
    icon: "💻",
    title: "Technical Round",
    subtitle: "Java Concurrency, Spring Boot & SQL",
    accentColor: "#0a7c6e",
    totalQuestions: 38,
    completedQuestions: 0,
    totalTopics: 6,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 10,
    topics: [
      { id: "concurrency",     title: "Java Concurrency",          questionCount: 10, status: "not_started", googleAsked: 9, difficulty: "hard" },
      { id: "spring-boot",     title: "Spring Boot & REST",        questionCount: 8,  status: "not_started", googleAsked: 7, difficulty: "medium" },
      { id: "sql-advanced",    title: "Advanced SQL",              questionCount: 7,  status: "not_started", googleAsked: 8, difficulty: "medium" },
      { id: "collections",     title: "Java Collections",          questionCount: 6,  status: "not_started", googleAsked: 5, difficulty: "medium" },
      { id: "design-patterns", title: "Design Patterns",           questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "medium" },
      { id: "jvm",             title: "JVM & Performance",         questionCount: 3,  status: "not_started", googleAsked: 3, difficulty: "hard" },
    ],
  },
  {
    id: "coding",
    icon: "🧮",
    title: "Coding Round",
    subtitle: "DSA & SQL Problem Solving",
    accentColor: "#f59e0b",
    totalQuestions: 20,
    completedQuestions: 0,
    totalTopics: 4,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 12,
    topics: [
      { id: "arrays-strings",  title: "Arrays & Strings",         questionCount: 6,  status: "not_started", googleAsked: 6, difficulty: "medium" },
      { id: "hashing",         title: "Hashing & Maps",           questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "easy" },
      { id: "sql-problems",    title: "SQL Problems",             questionCount: 5,  status: "not_started", googleAsked: 7, difficulty: "medium" },
      { id: "dp",              title: "Dynamic Programming",       questionCount: 4,  status: "not_started", googleAsked: 3, difficulty: "hard" },
    ],
  },
  {
    id: "domain",
    icon: "🏦",
    title: "Domain Round",
    subtitle: "FinTech, Banking & Low Latency",
    accentColor: "#ff6b35",
    totalQuestions: 14,
    completedQuestions: 0,
    totalTopics: 3,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 5,
    topics: [
      { id: "fintech",         title: "FinTech Concepts",          questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "medium" },
      { id: "low-latency",     title: "Low Latency Systems",       questionCount: 5,  status: "not_started", googleAsked: 4, difficulty: "hard" },
      { id: "system-design",   title: "Banking System Design",     questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "hard" },
    ],
  },
  {
    id: "hr",
    icon: "🤝",
    title: "HR & Culture",
    subtitle: "Behavioral & Culture Fit",
    accentColor: "#64748b",
    totalQuestions: 8,
    completedQuestions: 0,
    totalTopics: 2,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 2,
    topics: [
      { id: "behavioral",      title: "Behavioral Questions",      questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "easy" },
      { id: "process",         title: "Process & Salary",          questionCount: 3,  status: "not_started", googleAsked: 2, difficulty: "easy" },
    ],
  },
];

const TCS_ROUNDS = [
  {
    id: "technical",
    icon: "💻",
    title: "Technical Round",
    subtitle: "Core Java, OOPs & Basics",
    accentColor: "#0a7c6e",
    totalQuestions: 35,
    completedQuestions: 0,
    totalTopics: 5,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 8,
    topics: [
      { id: "oops",            title: "OOPs Concepts",             questionCount: 10, status: "not_started", googleAsked: 10, difficulty: "easy" },
      { id: "core-java",       title: "Core Java Fundamentals",    questionCount: 10, status: "not_started", googleAsked: 10, difficulty: "easy" },
      { id: "collections",     title: "Java Collections",          questionCount: 6,  status: "not_started", googleAsked: 5,  difficulty: "medium" },
      { id: "spring-mvc",      title: "Spring MVC Basics",         questionCount: 5,  status: "not_started", googleAsked: 4,  difficulty: "medium" },
      { id: "sql-basics",      title: "SQL Fundamentals",          questionCount: 4,  status: "not_started", googleAsked: 6,  difficulty: "easy" },
    ],
  },
  {
    id: "aptitude",
    icon: "🔢",
    title: "Aptitude Round",
    subtitle: "Logical, Verbal & Quantitative",
    accentColor: "#f59e0b",
    totalQuestions: 20,
    completedQuestions: 0,
    totalTopics: 3,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 6,
    topics: [
      { id: "quantitative",    title: "Quantitative Aptitude",     questionCount: 8,  status: "not_started", googleAsked: 8, difficulty: "medium" },
      { id: "logical",         title: "Logical Reasoning",         questionCount: 7,  status: "not_started", googleAsked: 7, difficulty: "medium" },
      { id: "verbal",          title: "Verbal Ability",            questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "easy" },
    ],
  },
  {
    id: "coding",
    icon: "🧮",
    title: "Coding Round",
    subtitle: "Easy–Medium DSA & SQL",
    accentColor: "#ff6b35",
    totalQuestions: 15,
    completedQuestions: 0,
    totalTopics: 3,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 8,
    topics: [
      { id: "arrays-strings",  title: "Arrays & Strings",         questionCount: 6,  status: "not_started", googleAsked: 6, difficulty: "easy" },
      { id: "patterns",        title: "Patterns & Basic Logic",    questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "easy" },
      { id: "sql-queries",     title: "SQL Queries",               questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "easy" },
    ],
  },
  {
    id: "hr",
    icon: "🤝",
    title: "HR & Managerial",
    subtitle: "Behavioral, Career & Culture",
    accentColor: "#64748b",
    totalQuestions: 12,
    completedQuestions: 0,
    totalTopics: 3,
    completedTopics: 0,
    status: "not_started",
    estimatedHours: 2,
    topics: [
      { id: "behavioral",      title: "Behavioral Questions",      questionCount: 5,  status: "not_started", googleAsked: 5, difficulty: "easy" },
      { id: "managerial",      title: "Managerial Round Qs",       questionCount: 4,  status: "not_started", googleAsked: 4, difficulty: "easy" },
      { id: "career",          title: "Career Goals & Salary",     questionCount: 3,  status: "not_started", googleAsked: 3, difficulty: "easy" },
    ],
  },
];

/* ── Recently asked questions (shown at bottom of dashboard) ───── */
export const RECENT_QUESTIONS = {
  google: [
    { text: "How does HashMap work internally?",       round: "Technical",     difficulty: "medium", year: 2024 },
    { text: "Design a URL shortener like bit.ly",      round: "System Design", difficulty: "hard",   year: 2024 },
    { text: "Find all pairs in array with sum = K",    round: "Coding",        difficulty: "medium", year: 2024 },
    { text: "Explain ConcurrentHashMap vs Hashtable",  round: "Technical",     difficulty: "hard",   year: 2023 },
  ],
  jpmorgan: [
    { text: "Implement a thread-safe singleton",        round: "Technical",     difficulty: "medium", year: 2024 },
    { text: "Design a payment processing system",       round: "Domain",        difficulty: "hard",   year: 2024 },
    { text: "Write SQL for running total per group",    round: "Coding",        difficulty: "medium", year: 2024 },
    { text: "Explain ExecutorService & thread pools",   round: "Technical",     difficulty: "hard",   year: 2023 },
  ],
  tcs: [
    { text: "Difference between abstract class & interface", round: "Technical", difficulty: "easy",  year: 2024 },
    { text: "Reverse a string without built-in methods",     round: "Coding",    difficulty: "easy",  year: 2024 },
    { text: "What is the difference between == and equals?", round: "Technical", difficulty: "easy",  year: 2024 },
    { text: "Write a SQL query to find 2nd highest salary",  round: "Coding",    difficulty: "easy",  year: 2023 },
  ],
  deloitte: [
    { text: "How does Spring Boot auto-configuration work?", round: "Technical", difficulty: "medium", year: 2024 },
    { text: "Design a REST API for an e-commerce cart",      round: "Technical", difficulty: "medium", year: 2024 },
    { text: "Explain React hooks – useState vs useEffect",   round: "Technical", difficulty: "medium", year: 2024 },
    { text: "Tell me about a project you led end-to-end",    round: "HR",        difficulty: "easy",   year: 2024 },
  ],
  infosys: [
    { text: "Explain the Spring MVC request lifecycle",     round: "Technical", difficulty: "medium", year: 2024 },
    { text: "What is Hibernate session & session factory?", round: "Technical", difficulty: "medium", year: 2024 },
    { text: "Find duplicates in an array in O(n)",          round: "Coding",    difficulty: "easy",   year: 2024 },
    { text: "Why do you want to join Infosys?",             round: "HR",        difficulty: "easy",   year: 2024 },
  ],
};

/* ── Master export map ─────────────────────────────────────────── */
export const INTERVIEW_DATA = {
  google:   { meta: COMPANY_META.google,   rounds: GOOGLE_ROUNDS   },
  jpmorgan: { meta: COMPANY_META.jpmorgan, rounds: JPMORGAN_ROUNDS },
  tcs:      { meta: COMPANY_META.tcs,      rounds: TCS_ROUNDS      },
  deloitte: { meta: COMPANY_META.deloitte, rounds: GOOGLE_ROUNDS   }, // reuse shape, swap content in Sprint 4
  infosys:  { meta: COMPANY_META.infosys,  rounds: TCS_ROUNDS      }, // reuse shape
};

/* ── Helper: normalize company name to key ──────────────────────── */
export function toCompanyKey(name = "") {
  return name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
}

/* ── Helper: compute overall progress ──────────────────────────── */
export function computeOverall(rounds = []) {
  const total     = rounds.reduce((s, r) => s + r.totalQuestions, 0);
  const completed = rounds.reduce((s, r) => s + r.completedQuestions, 0);
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}