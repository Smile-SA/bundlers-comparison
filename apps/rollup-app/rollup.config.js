import { sync } from "glob";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-import-css";

const config = {
  output: {
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve(), // tells Rollup how to find react in node_modules
    commonjs(), // converts react to ES modules
    json(), // For typescript-lib
    copy({
      targets: [{ src: "public/**/*", dest: "dist" }],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // Need to use "development" for bun-lib (https://github.com/oven-sh/bun/issues/3768)
    }),
  ],
};

export default sync("./src/*").map((entry) => ({
  ...config,
  input: entry,
  output: {
    ...config.output,
    file: `dist/${entry.slice(
      entry.lastIndexOf("/") + 1,
      entry.lastIndexOf(".")
    )}.js`,
  },
  plugins: config.plugins.concat(css({
    output: `${entry.slice(
      entry.lastIndexOf("/") + 1,
      entry.lastIndexOf(".")
    )}.css`
  }))
}));

// export default {
//   input: Object.fromEntries(
//     sync("./src/*").map((entry) => [
//       entry.slice(entry.lastIndexOf("/") + 1, entry.lastIndexOf(".")),
//       entry,
//     ])
//   ),
//   output: {
//     dir: 'dist',
//     format: "es",
//     sourcemap: true,
//   },
//   plugins: [
//     typescript(),
//     resolve(), // tells Rollup how to find react in node_modules
//     commonjs(), // converts react to ES modules
//     json(), // For typescript-lib
//     css(),
//     copy({
//       targets: [{ src: "public/**/*", dest: "dist" }],
//     }),
//     replace({
//       "process.env.NODE_ENV": JSON.stringify("production"), // Need to use "development" for bun-lib (https://github.com/oven-sh/bun/issues/3768)
//     }),
//     terser()
//   ],
// };
