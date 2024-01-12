import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bun: resolve(__dirname, "src/bun.html"),
        esbuild: resolve(__dirname, "src/esbuild.html"),
        microbundle: resolve(__dirname, "src/microbundle.html"),
        parcel: resolve(__dirname, "src/parcel.html"),
        rollup: resolve(__dirname, "src/rollup.html"),
        tsup: resolve(__dirname, "src/tsup.html"),
        typescript: resolve(__dirname, "src/typescript.html"),
        vite: resolve(__dirname, "src/vite.html"),
        webpack: resolve(__dirname, "src/webpack.html"),
      },
    },
    sourcemap: true,
  },
  plugins: [react()],
});
