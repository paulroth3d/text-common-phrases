/**
 * Finds the common phrases in a set of data
 */

const { Runner } = require('./runner');

Runner.run()
  .then((tableStr) => {
    // eslint-disable-next-line no-console
    console.log(tableStr);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`an error occurred:${err.message}`);
    process.exit(-1);
  });
