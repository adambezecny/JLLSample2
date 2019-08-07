const ghapiSample = require('./ghapi-sample/ghapi-sample.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(ghapiSample);
};
