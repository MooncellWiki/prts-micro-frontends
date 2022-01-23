import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  theme: {
    colors: {
      divider: "#a2a9b1",
      "primary-light": "#22bbff",
      disabled: "#9d9d9d",
      paper: "#f8f8f8",
      "primary-main": "#6a6aff",
      table: "#eaebee",
    },
  },
  shortcuts:{
    img:'border-solid block align-middle max-w-full h-auto'
  },
  preflight: false
});
