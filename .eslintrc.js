module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard'
  ],
  rules: {
    'semi': [ 'error', 'always' ],
    'semi-spacing': [ 'error', { before: false, after: true } ],
    'semi-style': [ 'error', 'last' ],
    'comma-dangle': [ 'error', 'always-multiline' ]
  }
}
