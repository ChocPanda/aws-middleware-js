module.exports = {
  extends: [
    'prettier',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:ava/recommended'
  ],
  plugins: ['prettier', 'import', 'ava'],
  rules: {
    'prettier/prettier': ['error'],
    'no-use-before-define': 'error'
  }
};
