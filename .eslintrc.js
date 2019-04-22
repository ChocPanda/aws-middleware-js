module.exports = {
  extends: [
    'prettier',
    'airbnb-base',
    'plugin:prettier/recommended'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['error'],
    'no-use-before-define': 'error'
  }
};
