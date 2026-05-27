const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");

module.exports = {
  input: "src/index.ts",
  output: {
    format: "cjs",
    file: "main.js",
    exports: "default",
    inlineDynamicImports: true,
  },
  external: ["obsidian", "fs", "os", "path"],
  plugins: [
    typescript({
      sourceMap: false,
      inlineSourceMap: false,
      inlineSources: false,
    }),
    resolve.nodeResolve({
      browser: true,
    }),
    commonjs(),
  ],
};
