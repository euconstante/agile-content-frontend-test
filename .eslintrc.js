//  Configurações do ESLint.

const configuration = {
  root: true,
  extends: ["standard", "prettier"],
  globals: {
    IS_DEVELOPMENT: "readonly",
  },
  parserOptions: {
    ecmasVersion: 2021,
  },
};

module.exports = configuration;
