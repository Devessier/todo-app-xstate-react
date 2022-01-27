module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
