module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  globals: {
    process: "readonly", // Allow process.env usage
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "warn",
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
