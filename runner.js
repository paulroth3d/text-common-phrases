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
  .option('-x, --max <maxCount>', 'phrases occurring <= max will be reported');

const DEFAULT_PATH = './data.txt';

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
   */
  static async run() {
    // eslint-disable-next-line no-console
    this.version = Runner.getVersion();

    // eslint-disable-next-line no-console
    // console.log(`version: ${Runner.getVersion()}`);

    const args = Runner.getCommandArguments();

    const filePath = args.file || DEFAULT_PATH;
    const fileContents = await Runner.loadFileContents(filePath);

    let phraseList = Runner.getCommonPhrases(fileContents);

    //-- filter
    phraseList = Runner.filterMinCount(phraseList, args.min);
    phraseList = Runner.filterMaxCount(phraseList, args.max);

    const tableStr = Runner.printPhraseTable(phraseList);

    console.log(tableStr);
  }

  //-- methods

  /**
   * Prints a table of the list of common phrases
   * @param {array} commonPhrases - phrases as properties
   * @returns {string} - table to print to command line of the properties
   */
  static printPhraseTable(phraseList) {
    if (!phraseList) {
      return '--no results--';
    }

    const sortedList = phraseList.sort((left, right) => {
      return right[1] - left[1];
    });

    const table = new CliTable({
      header: ['Phrase', 'Weight']
    });

    sortedList.forEach((phrase) => {
      table.push(phrase);
    });

    return table.toString();
  }

  /**
   * Determines the contents of a file
   * @param {string} filePath - path to the file
   * @returns {Promise<string>}
   */
  static loadFileContents(filePath) {
    let targetPath = null;
    if (filePath) {
      targetPath = filePath;
    } else if (commander.file) {
      targetPath = commander.file;
    } else {
      targetPath = DEFAULT_PATH;
    }
    return fs.readFile(targetPath, 'utf-8');
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
        return num >= min;
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
        return num <= max;
      });
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
