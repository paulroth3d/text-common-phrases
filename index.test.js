/**
 * Test that tests are working correctly
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const sinon = require('sinon');

const { Runner } = require('./runner');
/* eslint-enable */

test('Runner can say hello', (done) => {
  assert.equal('1.0', Runner.getVersion(), 'Version should be set');
  done();
});
