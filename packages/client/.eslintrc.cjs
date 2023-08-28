module.exports = {
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "prettier"
  ],
  "parserOptions": {

    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  "rules": {
    "no-alert": "off",
    "no-console": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "import/extensions": "off",

    "import/prefer-default-export": "off",
    "consistent-return": "off",
    "array-callback-return": "off",
    "@typescript-eslint/no-use-before-define": "off",

    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",

    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "off",
    "react/require-default-props": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/button-has-type": "off",
    "react/function-component-definition": "off",

    "indent": [
      "off",
      2
    ]
  }
}
