import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  entry: "./src/index.ts",
  mode: "production",
  // mode: "development",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "webpack-lib.js",
    globalObject: "this",
    library: {
      name: "webpackLib",
      type: "umd",
    },
  },
  externals: {
    react: {
      module: "react",
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react/jsx-runtime": {
      module: "react/jsx-runtime",
      commonjs: "react/jsx-runtime",
      commonjs2: "react/jsx-runtime",
      amd: "react/jsx-runtime",
      root: "jsxRuntime",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            // loader: "style-loader",
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    symlinks: false,
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'styles.css'
  })],
};

// module.exports = [
export default [
  config,
  {
    ...config,
    output: {
      path: resolve(__dirname, "dist"),
      filename: "webpack-lib.cjs",
      library: {
        type: "commonjs-static",
      },
    },
  },
  {
    ...config,
    experiments: {
      outputModule: true,
    },
    output: {
      path: resolve(__dirname, "dist"),
      module: true,
      filename: "webpack-lib.mjs",
      library: {
        type: "module",
      },
    },
  },
];
