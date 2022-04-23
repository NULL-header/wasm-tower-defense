import { Configuration } from "webpack";
import "webpack-dev-server";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

const webpackConfig: Configuration = {
  mode: "development",
  entry: path.join(__dirname, "src/index.tsx"),
  resolve: {
    extensions: [".js", ".ts", ".tsx", "wasm"],
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { transpileOnly: true },
      },
    ],
  },
  devServer: { hot: true },
  devtool: "inline-cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, "src/index.html") }),
    new ForkTCheckerWebpackPlugin(),
    new WasmPackPlugin({
      crateDirectory: path.join(__dirname, "lib/subthread"),
    }),
  ],
  experiments: { asyncWebAssembly: true },
};

export default webpackConfig;
