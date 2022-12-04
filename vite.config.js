import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePluginFonts } from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePluginFonts({
    //   google: {
    //     families: ["monospace"],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
