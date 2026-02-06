import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const googleScriptUrl = env.VITE_GOOGLE_SCRIPT_URL || "";

  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: googleScriptUrl
      ? {
          "/api-google": {
            target: googleScriptUrl,
            changeOrigin: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/api-google/, ""),
          },
        }
      : undefined,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
