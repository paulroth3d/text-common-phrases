/**
 * Test that tests are working correctly
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const sinon = require('sinon');

const CliTable = require('cli-table');

const { Runner } = require('./runner');
/* eslint-enable */

const EXAMPLE_RESULTS = [
  ['First', 1],
  ['Second', 2]
];

describe('CLI-Table', () => {
  test('creates a table', (done) => {
    const table = new CliTable({
      head: ['Position', 'Value']
    });

    EXAMPLE_RESULTS.forEach(entry => {
      table.push(entry);
    });

    const result = table.toString();

    assert.isNotEmpty(result);

    // console.log(result);

    done();
  });
});