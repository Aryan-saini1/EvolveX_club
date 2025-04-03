import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? "/EvolveX_club/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Ensure proper MIME types by setting explicit file extensions
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/.test(name ?? '')) {
            return 'assets/images/[name].[hash][extname]';
          }
          
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')) {
            return 'assets/fonts/[name].[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
            return 'assets/styles/[name].[hash][extname]';
          }
          
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  }
}));
