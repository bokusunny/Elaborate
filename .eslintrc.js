module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
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
  }
}
