module.exports = {
  env: {
    'jest/globals': true
  },
  settings: {
    'import/resolver': { "babel-module": {} }
  },
  parser: 'babel-eslint',
  extends: [
    'prettier',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'],
  plugins: ['prettier', 'jest', 'import'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': ['error'],
    'no-use-before-define': 'error',
    // The following are here because airbnb and prettier don't play nicely together
    'indent': 'off',
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': 'off',
    'import/named': 'off',
  }
};
