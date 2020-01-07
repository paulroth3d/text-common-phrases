/**
 * Module for running the project
 */

/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs-extra');
/* eslint-enable */

class Runner {
  /**
   * get the version
   * @returns {string}
   */
  static getVersion() {
    return '1.0';
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
    return fs.readFile(filePath, 'utf-8');
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
