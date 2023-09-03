module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: ["."],
        alias: {
          "^@src/(.+)": "./src/\\1",
          "^@lib/(.+)": "./src/lib/\\1",
        },
      },
    ],
  ],
};