/**
 * Module for running the project
 */

/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs-extra');

//-- allow accessing the command line arguments
const commander = require('commander');
const commonPhrases = require('commonphrases');
const CliTable = require('cli-table');
/* eslint-enable */

commander
  .version('1.0', '-v, --version', 'outout the current version')
  .option('-f, --file <filePath>', 'file to load')
  .option('-n, --min <minCount>', 'phrases occurring >= min will be reported')
  .option('-x, --max <maxCount>', 'phrases occurring <= max will be reported')
  .option('-a, --asc', 'sorts in ascending order')
  .option('-d, --desc', 'sorts in descending order (default)')
  .option('-j, --json', 'returns results in JSON format');

// const DEFAULT_PATH = './testAssets.txt';

const TEST_COMMAND_LINE_ARVG = ['/usr/bin/node', './index.js'];

class Runner {
  /**
   * get the version
   * @returns {string}
   */
  static getVersion() {
    return '1.0';
  }

  /**
   * Get the command line arguments
   * @param {array} mockArguments - mock arguments - such as for a test
   * @return {any}
   */
  static getCommandArguments(mockArguments) {
    //-- allow process to work even if in unit tests.
    let commanderArgs = process.argv;
    if (process.env.NODE_ENV === 'test') {
      //-- at least provide something
      if (mockArguments) {
        commanderArgs = [...TEST_COMMAND_LINE_ARVG, ...mockArguments];
      } else {
        commanderArgs = [...TEST_COMMAND_LINE_ARVG];
      }
    }

    // console.log(`commanderArgs:${JSON.stringify(commanderArgs)}`);
    commander.parse(commanderArgs);

    return commander;
  }

  /**
   * Runs the execution
   * @param {array} mockArguments - mock arguments sent in process.argv
   * @returns {Promise<string>}
   */
  static run(mockArguments) {
    const resultPromise = new Promise((resolve, reject) => {
      try {
        const args = Runner.getCommandArguments(mockArguments);

        const filePath = args.file;
        const fileContents = Runner.loadFileContents(filePath);

        let phraseList = Runner.getCommonPhrases(fileContents);

        //-- filter
        phraseList = Runner.filterMinCount(phraseList, args.min);
        phraseList = Runner.filterMaxCount(phraseList, args.max);

        const sortedList = phraseList.sort((left, right) => {
          return right[1] - left[1];
        });

        let resultStr = '';
        if (args.json) {
          resultStr = Runner.printPhraseJSON(sortedList);
        } else {
          resultStr = Runner.printPhraseTable(sortedList);
        }
        resolve(resultStr);
      } catch (err) {
        reject(err);
      }
    });
    return resultPromise;
  }

  //-- methods

  /**
   * Prints a table of the list of common phrases
   * @param {array} commonPhrases - [phrase : count]]
   * @returns {string} - table to print to command line of the properties
   */
  static printPhraseTable(phraseList) {
    if (!phraseList) {
      return '--no results--';
    }

    const table = new CliTable({
      head: ['Phrase', 'Weight']
    });

    phraseList.forEach((phrase) => {
      table.push(phrase);
    });

    return table.toString();
  }

  /**
   * Prints the results in JSON format
   * @param {array} commonPhrases - phrases as json table
   * @returns {string} - json printout of the results
   */
  static printPhraseJSON(phraseList) {
    if (!phraseList) {
      return '[]';
    }

    return JSON.stringify(phraseList, null, 2);
  }

  /**
   * Determines the contents of a file
   * @param {string} filePath - path to the file
   * @returns {string}}
   */
  static loadFileContents(filePath) {
    let targetPath = null;
    if (filePath) {
      targetPath = filePath;
    } else if (commander.file) {
      targetPath = commander.file;
    } else {
      throw (new Error('-f, --file <path> was not sent'));
    }
    return fs.readFileSync(targetPath, 'utf-8').toLowerCase();
  }

  /**
   * Finds the list of common phrases within the text document
   * @param {string} str - the string to look into
   * @returns {any}
   */
  static getCommonPhrases(str) {
    const phrases = commonPhrases.phrases.getAllPhrases([str]);
    const phraseEntries = Runner.getObjectEntries(phrases);
    return phraseEntries;
  }

  /**
   * Filters phrases by min count
   * @param {array} phraseList
   * @param {str} min - minimum count for results to be included
   * @return {array} phraseList
   */
  static filterMinCount(phraseList, min) {
    let results = phraseList;
    if (phraseList && min) {
      results = phraseList.filter(([phrase, num]) => { // eslint-disable-line
        return Number.isNaN(num) || num >= min;
      });
    }
    return results;
  }

  /**
   * Filters phrases by max count
   * @param {array} phraseList
   * @param {str} max - maximum count for results to be included
   * @return {array} phraseList
   */
  static filterMaxCount(phraseList, max) {
    let results = phraseList;
    if (phraseList && max) {
      results = phraseList.filter(([phrase, num]) => { // eslint-disable-line no-unused-vars
        return Number.isNaN(num) || num <= max;
      });
    }
    return results;
  }

  /**
   * Sorts an array of results by the count
   * @param {array} phraseList
   * @param {boolean} isAscending
   * @returns {array} phraseList in ascending or descending order
   */
  static sortPhrases(phraseList, isAscending) {
    const ascendingSort = (a, b) => a[1] - b[1];
    const descendingSort = (a, b) => b[1] - a[1];

    let results = [];
    if (phraseList) {
      results = phraseList.sort(isAscending ? ascendingSort : descendingSort);
    }
    return results;
  }

  /**
   * Convert Phrase Object to array
   * @param {Object}
   * @returns {Array}
   */
  static getObjectEntries(obj) {
    if (!obj) {
      return [];
    }
    const results = Object.entries(obj).map(([prop, val]) => [
      JSON.stringify(prop).replace(/^"/g, '').replace(/"$/g, ''),
      val
    ]);
    return results;
  }
}

module.exports = {
  Runner
};
