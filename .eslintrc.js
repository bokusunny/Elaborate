module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "react"
  ],
  "parserOptions": {
    "sourceType": "module",
    "tsconfigRootDir": __dirname,
    "project": "./tsconfig.json"
  },
  "rules": {
    "react/prop-types": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "prettier/prettier": [
      "error", {
        "singleQuote": true,
        "semi": false,
        "printWidth": 100,
        "trailingComma": "es5"
      }
    ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  }
}
