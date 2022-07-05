module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-for': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/require-v-for-key': 'off',
    'vue/no-unused-components': 'off'
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
