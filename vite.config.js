import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Counts the unit tests (`it(` / `test(` calls) in src, shown in the footer. */
function countTests(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) total += countTests(path);
    else if (entry.name.endsWith(".test.js")) {
      total += (readFileSync(path, "utf8").match(/^\s*(it|test)\(/gm) ?? []).length;
    }
  }
  return total;
}

/*
 * Facts about this build for the footer. On GitHub Actions the commit comes from
 * GITHUB_SHA, and the deploy only happens after lint and tests pass.
 */
const BUILD_INFO = {
  commit: (process.env.GITHUB_SHA ?? "").slice(0, 7),
  builtAt: Date.now(),
  tests: countTests("src"),
};

// Deployed as a GitHub user site (https://alecabreradev.github.io), so the base path is "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  define: {
    __BUILD_INFO__: JSON.stringify(BUILD_INFO),
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.js"],
  },
});
