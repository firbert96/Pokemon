/* eslint-env node */
module.exports = {
  "root": true,
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "rules": {
    "vue/multi-word-component-names": 0,
    "no-unused-vars":[
        "warn",
        {
            "vars":"all",
            "args":"after-used",
            "ignoreRestSiblings":false
        }
    ]
  },
  "ignorePatterns":[]
}