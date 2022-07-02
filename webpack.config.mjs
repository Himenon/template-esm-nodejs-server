/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import webpack from "webpack";

const cwd = process.cwd();
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

process.on("unhandledRejection", console.dir);

const createConfig = () => {
  /** @type {webpack.Configuration} */
  const config = {
    mode:  "development",
    target: "node16.13",
    entry: {
      server: ["regenerator-runtime", "./src/entry.ts"],
    },
    devtool: "inline-source-map",
    experiments: {
      topLevelAwait: true,
      outputModule: true,
    },
    output: {
      path: path.join(cwd, "dist"),
      filename: "[name].mjs",
      clean: true,
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.APP_VERSION": JSON.stringify(pkg.version),
        "process.env.BUILD": JSON.stringify("webpack"),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            // rustで作成されたJavaScript/TypeScriptトランスパイラ（babelよりとても速い）
            // 設定は.swcrcを読む
            loader: "swc-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".web.mjs", ".mjs", ".web.js", ".js", ".web.ts", ".ts", ".web.tsx", ".tsx", ".json", ".web.jsx", ".jsx"],
      modules: [path.join(cwd, "src"), "node_modules", path.join(cwd, "node_modules")],
    },
    externalsPresets: { node: true },
  };

  return config;
};

export default createConfig();
