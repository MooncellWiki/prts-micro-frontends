import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import WindiCSS from "vite-plugin-windicss";

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
    rollupOptions: {
      input: "src/main.tsx",
    },
    assetsDir: ".",
  },
});
