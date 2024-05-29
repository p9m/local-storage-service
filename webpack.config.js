const path = require("path");

module.exports = {
  mode: "production",
  entry: "./dist/esm/index.js",
  output: {
    path: path.resolve(__dirname, "./dist/umd"),
    filename: "index.js",
    library: {
      name: 'LocalStorageService',
      type: 'const',
      export: 'default',
    },
    libraryTarget: "umd",
    globalObject: "this"
  },
};
