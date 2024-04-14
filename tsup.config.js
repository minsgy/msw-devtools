import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig } from "tsup"


export default defineConfig({
  entry: ["src/index.ts"],
  treeshake: true,
  sourcemap: false,
  minify: true,
  clean: false,
  dts: false,
  splitting: false,
  format: ["cjs", "esm"],
  outDir: "dist",
  injectStyle: false,
  esbuildPlugins: [sassPlugin()]
})
