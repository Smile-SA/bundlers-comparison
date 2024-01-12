import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { sync } from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPaths = [join(__dirname, "public")];
const output = resolve(__dirname, "dist");

export default {
  mode: "production",
  devtool: "source-map",
  entry: Object.fromEntries(
    sync("./src/*").map((entry) => [
      entry.slice(entry.lastIndexOf("/") + 1, entry.lastIndexOf(".")),
      `./${entry}`,
    ])
  ),
  output: {
    path: output,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // For parcel-lib
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "linkTag" } },
          { loader: "file-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: staticPaths,
    compress: true,
    port: 9000,
  },
  plugins: sync("./public/*").map(
    (entry) =>
      new HtmlWebpackPlugin({
        filename: entry.slice(entry.lastIndexOf("/") + 1),
        template: `./${entry}`,
        chunks: [],
      })
  ),
  performance: {
    hints: false,
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
};
