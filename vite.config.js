import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // build: {
  //   rollupOptions: {
  //     external: ["react", "react-router", "react-router-dom"],
  //     output: {
  //       globals: {
  //         react: "React",
  //       },
  //     },
  //   },
  // },
});
