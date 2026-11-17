import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed as a GitHub user site (https://alecabreradev.github.io), so the base path is "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.js"],
  },
});
