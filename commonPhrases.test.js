/**
 * Test that tests are working correctly
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const sinon = require('sinon');

const commonPhrases = require('commonphrases');

const { Runner } = require('./runner');
/* eslint-enable */

const HAPPY_BIRTHDAY = `Happy Birthday to You
Happy Birthday to You
Happy Birthday Dear (name)
Happy Birthday to You.`;

describe('commonPhrases', () => {
  test('common phrases is not null', async (done) => {
    const fileContents = HAPPY_BIRTHDAY;
    const phrases = commonPhrases.phrases.getAllPhrases([fileContents]);
    assert.isNotEmpty(phrases, 'should get phrases returned');
    assert.equal(typeof phrases['Happy Birthday'], 'number', 'Phrase Happy Birthday should be found');

    done();
  });
});
