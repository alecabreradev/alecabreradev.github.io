/**
 * Technologies shown in the toolkit. Names are not translated; the categories,
 * contexts and notes come from the locales (projects.skills.*).
 *
 * - mark: short monogram drawn on the tile
 * - contexts: where I have used it ("corteArte" and "no2" are project ids)
 */
export const CATEGORIES = ["lang", "web", "ai", "db"];

export const CONTEXTS = ["corteArte", "no2", "portfolio", "degree"];

export const TOOLS = [
  { id: "python", name: "Python", mark: "Py", category: "lang", contexts: ["no2"] },
  { id: "kotlin", name: "Kotlin", mark: "Kt", category: "lang", contexts: ["corteArte"] },
  {
    id: "javascript",
    name: "JavaScript",
    mark: "JS",
    category: "lang",
    contexts: ["corteArte", "portfolio"],
  },
  { id: "java", name: "Java", mark: "Jv", category: "lang", contexts: ["degree"] },
  { id: "cpp", name: "C/C++", mark: "C++", category: "lang", contexts: ["degree"] },
  { id: "sql", name: "SQL", mark: "SQL", category: "lang", contexts: ["degree"] },

  {
    id: "compose",
    name: "Android · Compose",
    mark: "An",
    category: "web",
    contexts: ["corteArte"],
  },
  { id: "react", name: "React", mark: "Re", category: "web", contexts: ["corteArte", "portfolio"] },
  { id: "node", name: "Node.js · Express", mark: "No", category: "web", contexts: ["corteArte"] },
  { id: "rest", name: "REST APIs", mark: "API", category: "web", contexts: ["corteArte"] },
  {
    id: "htmlcss",
    name: "HTML · CSS",
    mark: "</>",
    category: "web",
    contexts: ["corteArte", "portfolio"],
  },

  { id: "sklearn", name: "Scikit-learn", mark: "SK", category: "ai", contexts: ["no2"] },
  { id: "xgboost", name: "XGBoost", mark: "XG", category: "ai", contexts: ["no2"] },
  { id: "pandas", name: "Pandas · NumPy", mark: "Pd", category: "ai", contexts: ["no2"] },
  { id: "pytorch", name: "PyTorch", mark: "PT", category: "ai", contexts: ["degree"] },

  { id: "mongodb", name: "MongoDB", mark: "Mg", category: "db", contexts: ["corteArte"] },
  { id: "firebase", name: "Firebase", mark: "Fb", category: "db", contexts: ["corteArte"] },
  { id: "postgresql", name: "PostgreSQL", mark: "PG", category: "db", contexts: ["degree"] },
  {
    id: "git",
    name: "Git · GitHub",
    mark: "Git",
    category: "db",
    contexts: ["corteArte", "no2", "portfolio"],
  },
  { id: "docker", name: "Docker", mark: "Dk", category: "db", contexts: ["degree"] },
];

/** Tools of one category ("all" keeps every tool). */
export function filterTools(tools, category) {
  return category === "all" ? tools : tools.filter((tool) => tool.category === category);
}

/** How many tools each context has, e.g. { corteArte: 12, no2: 7, ... }. */
export function countByContext(tools, contexts) {
  return Object.fromEntries(
    contexts.map((context) => [context, tools.filter((t) => t.contexts.includes(context)).length]),
  );
}
