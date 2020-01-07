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
}

module.exports = {
  Runner
};
