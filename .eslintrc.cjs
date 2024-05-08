module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/react",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "object-shorthand": "error",

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase"],
        filter: { match: false, regex: "_" },
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: ["import", "parameter", "variable"],
        format: ["camelCase", "PascalCase"],
        filter: { match: false, regex: "_" },
      },
      {
        selector: "variable",
        modifiers: ["const", "exported"],
        format: ["PascalCase", "UPPER_CASE"],
      },
      {
        selector: ["typeLike", "enumMember"],
        format: ["PascalCase"],
      },
      {
        selector: ["property"],
        format: null,
      },
    ],

    "react/react-in-jsx-scope": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    "import/no-relative-packages": "error",
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^virtual:pwa-register"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
};
