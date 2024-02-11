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
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-duplicate-imports": ["error", { includeExports: true }],

    "react/react-in-jsx-scope": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    "import/no-relative-packages": "error",
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
};
