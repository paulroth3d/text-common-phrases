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

  test('LoadFile has contents', (done) => {
    Runner.loadFileContents('./testAssets/HappyBirthday.txt')
      .then(
        (fileContents) => {
          debugger; // eslint-disable-line
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
    const fileContents = await Runner.loadFileContents('./testAssets/HappyBirthday.txt');
    assert.isNotEmpty(fileContents, 'File contents should not be empty');
    done();
  });
});
