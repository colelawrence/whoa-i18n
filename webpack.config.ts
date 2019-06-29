import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  mode: "development",
  // target: "node",
  context: __dirname,
  entry: path.resolve(__dirname, "./i18n.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "i18n.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.i18n$/,
        include: path.resolve("components"),
        loader: [require.resolve("json-loader"), require.resolve("yaml-loader")]
      },
      {
        test: /\.ts$/,
        exclude: path.resolve("node_modules"),
        loader: require.resolve("ts-loader")
      }
    ]
  }
};

export default config;
