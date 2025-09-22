module.exports = {
  root: true,
  extends: ['../config/eslint-base.cjs'],
  parserOptions: {
    project: __dirname + '/tsconfig.json'
  }
};
