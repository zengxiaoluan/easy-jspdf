import { defineConfig } from "vite";
import { depsTree } from "@easy-jspdf/vite-plugin-deps-tree";

export default defineConfig({
  plugins: [depsTree({ server: true })],
  base: "./",
  root: ".",
  build: {
    outDir: "dist",
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {},
  },
});
