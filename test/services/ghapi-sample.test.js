const assert = require('assert');
const app = require('../../src/app');

describe('\'ghapi-sample\' service', () => {
  it('registered the service', () => {
    const service = app.service('ghapi-sample');

    assert.ok(service, 'Registered the service');
  });
});
