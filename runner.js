/**
 * Module for running the project
 */

/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs-extra');

//-- allow accessing the command line arguments
const commander = require('commander');
/* eslint-enable */

commander
  .version('1.0', '-v, --version', 'outout the current version')
  .option('-f, --file <filePath>', 'file to load');

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
    console.log(`version: ${Runner.getVersion()}`);
  }

  //-- methods

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
    return str;
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
    return Object.entries(obj);
  }
}

module.exports = {
  Runner
};
