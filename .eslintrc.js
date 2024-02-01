module.exports = {
  env: {
    mocha: true,
  },
  rules: {
    "import/no-extraneous-dependencies": "off",
  },
  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2020,
    sourceType: "module",
  },
};
