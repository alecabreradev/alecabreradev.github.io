/**
 * Skill network data. Area names come from the locales (network.areas.<id>);
 * each skill lists the areas it belongs to and the ids of the PROJECTS that use it.
 */
export const AREAS = ["web", "data", "ai", "tools"];

export const SKILLS = [
  { name: "Kotlin · Compose", areas: ["web"], projects: ["corteArte"] },
  { name: "Android", areas: ["web"], projects: ["corteArte"] },
  { name: "React", areas: ["web"], projects: ["corteArte"] },
  { name: "Node.js · Express", areas: ["web"], projects: ["corteArte"] },
  { name: "REST · Retrofit", areas: ["web", "data"], projects: ["corteArte"] },
  { name: "MongoDB", areas: ["data"], projects: ["corteArte"] },
  { name: "SQL", areas: ["data"], projects: [] },
  { name: "PostgreSQL", areas: ["data"], projects: [] },
  { name: "Pandas", areas: ["data"], projects: ["no2"] },
  { name: "Python", areas: ["data", "ai"], projects: ["no2"] },
  { name: "Scikit-learn", areas: ["ai"], projects: ["no2"] },
  { name: "XGBoost", areas: ["ai"], projects: ["no2"] },
  { name: "PyTorch", areas: ["ai"], projects: [] },
  { name: "Firebase Auth", areas: ["tools"], projects: ["corteArte"] },
  { name: "Figma", areas: ["tools"], projects: ["corteArte"] },
  { name: "Docker", areas: ["tools"], projects: [] },
  { name: "Git", areas: ["tools"], projects: ["corteArte", "no2"] },
];
