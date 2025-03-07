import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import { resolve } from "path";

console.log("🚀  ", resolve(__dirname, "lib"));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["lib"], exclude: ["src"] }) as any,
  ],
  server: {
    port: 10006,
    host: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "lib"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: (id) => !id.startsWith(".") && !id.startsWith("/") && !id.startsWith("@/"),
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        assetFileNames: "assets/[name][extname]",
        entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`,
      },
    },
  },
});
