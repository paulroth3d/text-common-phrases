/**
 * Module for running the project
 */

/* eslint-disable no-unused-vars */
const path = require('path');
const fs = require('fs-extra');
/* eslint-enable */

class Runner {
  /** test method */
  static sayHello() {
    console.log('Hello!');
  }
}

module.exports = {
  Runner
};
