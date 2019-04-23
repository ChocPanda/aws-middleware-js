module.exports = {
  'check-coverage': true,
  'per-file': true,
  lines: 0,
  statements: 0,
  functions: 0,
  branches: 0,
  watermarks: {
    lines: [80, 95],
    functions: [80, 95],
    branches: [80, 95],
    statements: [80, 95]
  },
  include: ['src/**/*.js'],
  exclude: ['src/**/*.test.js'],
  reporter: ['lcov', 'text-summary'],
  cache: true,
  all: true,
  'report-dir': './reports/coverage'
};
