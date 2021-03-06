const app = require('./package.json');

// environment variables
// each object represents
// a execution environment
module.exports = Promise.resolve({
  // default variables for all environments.
  default: {
    PORT: 3000,
    VERSION: app.version,
    TITLE: app.title,
    DESCRIPTION: app.description
  },

  // used on tests running.
  test: {},

  // used on project building.
  build: {
    PORT: 80,
  },

  debug: {
    ENV: 'debug'
  },
  development: {
    ENV: 'development'
  },
  production: {
    ENV: 'production'
  },
});
