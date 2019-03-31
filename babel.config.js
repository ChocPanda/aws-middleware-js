module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-syntax-export-default-from'],
    ['@babel/plugin-proposal-export-namespace-from'],
    [
      'module-resolver',
      {
        root: ['./src', './node_modules']
      }
    ]
  ]
};
