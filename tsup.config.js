import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  treeshake: true,
  sourcemap: false,
  minify: false,
  clean: true,
  dts: true,
  splitting: true,
  format: ["cjs", "esm"],
  external: ["react", "react-dom"],
  outDir: "dist",
  injectStyle: false,
})
