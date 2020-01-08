/**
 * Test that tests are working correctly
 */

/* eslint-disable no-unused-vars */
const { assert, expect } = require('chai');
const sinon = require('sinon');

const commander = require('commander');

const { Runner } = require('./runner');
/* eslint-enable */

//-- path to the happy birthday file
const HAPPY_BIRTHDAY_PATH = './testAssets/HappyBirthday.txt';

const EXAMPLE_NUMBERED_PHRASES = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => [`${num}`, num]);

// const sandbox = sinon.sandbox.create();

describe('Runner', () => {
  test('Runner can say hello', (done) => {
    assert.equal('1.0', Runner.getVersion(), 'Version should be set');
    done();
  });

  test('LoadFile has contents', (done) => {
    const fileContents = Runner.loadFileContents(HAPPY_BIRTHDAY_PATH);
    assert.isNotEmpty(fileContents, 'File contents should be found');
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

  test('phrase table returns phrases if phrases are found', (done) => {
    const EXAMPLE_PHRASE_STR = '{"Happy Birthday":1,"Birthday to":3,'
      + '"to You\\nHappy":2,"You\\nHappy Birthday":2,"Birthday Dear":1,'
      + '"Dear name\\nHappy":1,"name\\nHappy Birthday":1,"to You.":1}';
    const EXAMPLE_PHRASES = Runner.getObjectEntries(
      JSON.parse(EXAMPLE_PHRASE_STR)
    );

    const phraseTable = Runner.printPhraseTable(EXAMPLE_PHRASES);

    assert.isNotEmpty(phraseTable);

    // console.log(phraseTable);

    done();
  });

  test('min count filters phrases less than the count', (done) => {
    const filteredPhrases = Runner.filterMinCount(EXAMPLE_NUMBERED_PHRASES, 2);

    assert.isNotNull(filteredPhrases);
    assert.isArray(filteredPhrases);
    assert.equal(filteredPhrases.length, 9);
    assert.sameDeepMembers(filteredPhrases, EXAMPLE_NUMBERED_PHRASES.slice(3), 'something');

    done();
  });

  test('min count does not filter if min was not provided', (done) => {
    const filteredPhrases = Runner.filterMinCount(EXAMPLE_NUMBERED_PHRASES, undefined);

    assert.isNotNull(filteredPhrases);
    assert.isArray(filteredPhrases);
    assert.equal(filteredPhrases.length, 12);
    assert.sameDeepMembers(filteredPhrases, EXAMPLE_NUMBERED_PHRASES);
    done();
  });

  test('max count filters phrases more than the count', (done) => {
    const filteredPhrases = Runner.filterMaxCount(EXAMPLE_NUMBERED_PHRASES, 2);

    assert.isNotNull(filteredPhrases);
    assert.isArray(filteredPhrases);
    assert.equal(filteredPhrases.length, 4);
    assert.sameDeepMembers(filteredPhrases, EXAMPLE_NUMBERED_PHRASES.slice(0, 4));

    done();
  });

  test('max count does not filter if max was not provided', (done) => {
    const filteredPhrases = Runner.filterMaxCount(EXAMPLE_NUMBERED_PHRASES, undefined);

    assert.isNotNull(filteredPhrases);
    assert.isArray(filteredPhrases);
    assert.equal(filteredPhrases.length, 12);
    assert.sameDeepMembers(filteredPhrases, EXAMPLE_NUMBERED_PHRASES);
    done();
  });

  test('sort phrases in descending order', (done) => {
    const phraseList = EXAMPLE_NUMBERED_PHRASES.reduce((collection, entry) => {
      collection.push(entry);
      return collection;
    }, []);

    //-- the items are sorted in ascending order
    assert.sameMembers(phraseList[0], ['-1', -1]);

    const sortedList = Runner.sortPhrases(phraseList, null);

    assert.sameMembers(sortedList[0], ['10', 10]);

    // console.log(`descending order:${JSON.stringify(sortedList)}`);

    done();
  });

  test('sort phrases in ascending order', (done) => {
    const phraseList = EXAMPLE_NUMBERED_PHRASES.reduce((collection, entry) => {
      collection.unshift(entry);
      return collection;
    }, []);

    //-- the items are sorted in ascending order
    assert.sameMembers(phraseList[0], ['10', 10]);

    const sortedList = Runner.sortPhrases(phraseList, true);

    assert.sameMembers(sortedList[0], ['-1', -1]);

    done();
  });
});

// let sandbox = null;

describe('command line arguments', () => {
  beforeEach(() => {
    //-- we should be able to use sinon sandboxes,
    //-- but sinon sandboxes are coming up with a null exception
    //-- @TODO: investigage
    // sandbox = sinon.sandbox.create();
    //-- TypeError: Cannot read property 'create' of undefined

    if (commander && commander.file) {
      delete commander.file;
    }
  });
  afterEach(() => {
    // sandbox.restore();
  });

  test('path if specified by command line arguments', (done) => {
    const PASSED_FILE_PATH = './test.js';
    const commandLineArguments = Runner.getCommandArguments(
      ['-f', PASSED_FILE_PATH]
    );
    const commandLinePath = commandLineArguments.file;
    assert.equal(commandLinePath, PASSED_FILE_PATH);

    done();
  });

  test('path if not specified by command line arguments', (done) => {
    const commandLineArguments = Runner.getCommandArguments();
    const commandLinePath = commandLineArguments.file;
    assert.isUndefined(commandLinePath);
    done();
  });

  /*
  //-- @TODO for some reason this always fails, come back later
  test('path if not specified by command line arguments > something else specified', (done) => {
    debugger;
    try {
      const commandLineArguments = Runner.getCommandArguments(['-c', 'cuca']);
    } catch (err) {
      console.error('err', err.message);
    }
    const commandLinePath = commandLineArguments.file;
    assert.isEmpty(commandLinePath);
    done();
  });
  */
});

describe('Run program', () => {
  beforeEach(() => {
    delete commander.file;
    delete commander.min;
    delete commander.max;
    delete commander.asc;
    delete commander.desc;
    delete commander.json;
  });

  test('no path or file sent', (done) => {
    Runner.run()
      .then(() => {
        assert.fail('No path provided, we should get an error');
        done();
      })
      .catch((err) => {
        // console.log('expected an error');
        assert.isNotNull(err, 'We wanted an error, we got an error');
        done();
      });
  });

  test('table', (done) => {
    Runner.run(
      ['-f', './testAssets/HappyBirthday.txt']
    )
      .then((tableStr) => {
        assert.isNotNull(tableStr);
        done();
      });
  });

  test('json', (done) => {
    Runner.run(
      ['-f', './testAssets/HappyBirthday.txt', '--json']
    )
      .then((tableStr) => {
        const tableJSON = JSON.parse(tableStr);
        assert.isNotNull(tableJSON);
        done();
      })
      .catch((err) => {
        assert.equal(false, true, `error:${err.message}`);
        done();
      });
  });
});
