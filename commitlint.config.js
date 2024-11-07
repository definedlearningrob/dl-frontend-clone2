const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  rules: {
    'references-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      referenceActions: null,
      issuePrefixes: ['#DLK-', '#DL-'],
    },
  },
};

module.exports = Configuration;
