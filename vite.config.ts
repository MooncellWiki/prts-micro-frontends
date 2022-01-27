import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import WindiCSS from "vite-plugin-windicss";
import { readdirSync } from "fs";
import { join } from "path";
const entries = readdirSync(join(__dirname, "src/entries/"));
const input = {};
entries.forEach((entry) => {
  input[entry.replace(".tsx", "")] = `src/entries/${entry}`;
});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), WindiCSS()],
  server: {
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },
  build: {
    sourcemap: true,
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {
      input,
      output: {
        manualChunks(id) {
          if (
            id.includes("preact") ||
            id.includes("md5") ||
            id.includes("flyio")
          ) {
            return "vendor";
          }
        },
      },
    },
    assetsDir: ".",
  },
});
