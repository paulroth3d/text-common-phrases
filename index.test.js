/**
 * Test that tests are working correctly
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const sinon = require('sinon');

const { Runner } = require('./runner');
/* eslint-enable */

describe('Runner', () => {
  test('Runner can say hello', (done) => {
    assert.equal('1.0', Runner.getVersion(), 'Version should be set');
    done();
  });

  test('data file is loaded', (done) => {
    Runner.loadData()
      .then((fileContents) => {
        assert.isNotNull(fileContents, 'file contents should not be null');
      });
  });
});
