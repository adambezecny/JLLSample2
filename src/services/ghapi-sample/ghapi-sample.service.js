// Initializes the `ghapi-sample` service on path `/ghapi-sample`
const createService = require('./ghapi-sample.class.js');
const hooks = require('./ghapi-sample.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ghapi-sample', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('ghapi-sample');

  service.hooks(hooks);
};
