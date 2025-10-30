import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "VitePluginDepsTree",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vite"],
    },
  },
});
