/**
 * Tests converting an array to csv
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const { convertArrayToCSV } = require('convert-array-to-csv');
// eslint-enable

const EXAMPLE_ARRAY = [
  ['birthday to', 3],
  ['to you\\nhappy', 2],
  ['you\\nhappy birthday', 2],
  ['happy birthday', 1],
  ['birthday dear', 1],
  ['dear name\\nhappy', 1],
  ['name\\nhappy birthday', 1],
  ['to you.\\n', 1],
  ['Pauly says "Hello"', 20]
];

const EXAMPLE_HEADER = ['Phrase', 'Rating'];

describe('array-to-csv', () => {
  test('array to csv creates an array', (done) => {
    const csvFromArray = convertArrayToCSV(EXAMPLE_ARRAY, {
      header: EXAMPLE_HEADER
    });
    assert.isNotNull(csvFromArray);
    done();
  });

  test('result array escapes quotes', (done) => {
    const csvFromArray = convertArrayToCSV(EXAMPLE_ARRAY, {
      header: EXAMPLE_HEADER
    });

    assert.include(csvFromArray, 'Pauly says ""Hello""', 'quotes should be escaped');
    done();
  });

  test('result includes a normal phrase', (done) => {
    const csvFromArray = convertArrayToCSV(EXAMPLE_ARRAY, {
      header: EXAMPLE_HEADER
    });

    assert.include(csvFromArray, '"birthday to",3', 'quotes should be escaped');
    done();
  });

  test('header is included in results', (done) => {
    const csvFromArray = convertArrayToCSV(EXAMPLE_ARRAY, {
      header: EXAMPLE_HEADER
    });

    assert.isNotNull(
      csvFromArray.match(/Phrase\s*["']*\s*,\s*["']*\s*Rating/i),
      'Header should be found in there somewhere'
    );
    done();
  });
});
