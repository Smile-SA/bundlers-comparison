import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import url from "postcss-url";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    external: ["react", "react/jsx-runtime"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
      {
        name: "rollupLib",
        file: "dist/rollup-lib.umd.js",
        format: "umd",
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    ],
    plugins: [
      typescript(),
      postcss({
        extract: true,
        plugins: [
          url({
            url: "inline",
            maxSize: 100,
            fallback: "copy",
          }),
        ],
      }),
      json(),
      image(),
    ],
  },
];
