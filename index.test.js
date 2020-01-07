/**
 * Test that tests are working correctly
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const sinon = require('sinon');

const { Runner } = require('./runner');
/* eslint-enable */

//-- path to the happy birthday file
const HAPPY_BIRTHDAY_PATH = './testAssets/HappyBirthday.txt';

describe('Runner', () => {
  test('Runner can say hello', (done) => {
    assert.equal('1.0', Runner.getVersion(), 'Version should be set');
    done();
  });

  test('LoadFile has contents', (done) => {
    Runner.loadFileContents(HAPPY_BIRTHDAY_PATH)
      .then(
        (fileContents) => {
          assert.isNotEmpty(fileContents, 'File contents should be found');
          done();
        }
      )
      .catch(
        (err) => {
          assert.isNull(err, `Error occurred while loading file contents: ${err.message}`);
          done();
        }
      );
  });

  test('await works in tests', async (done) => {
    const fileContents = await Runner.loadFileContents(HAPPY_BIRTHDAY_PATH);
    assert.isNotEmpty(fileContents, 'File contents should not be empty');
    done();
  });

  test('get object properties', (done) => {
    const obj = {
      first: 'john',
      last: 'doe'
    };

    const objEntries = Runner.getObjectEntries(obj);

    assert.isNotEmpty(objEntries);
    assert.isArray(objEntries);
    assert.equal(objEntries.length, 2, 'Expect there should be two entries there');
    assert.include(objEntries[0], 'first');
    assert.include(objEntries[0], 'john');
    assert.include(objEntries[1], 'last');
    assert.include(objEntries[1], 'doe');

    done();
  });
});
