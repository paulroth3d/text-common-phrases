/**
 * Finds the common phrases in a set of data
 */

const { Runner } = require('./runner');

async function run() {
  const tableStr = await Runner.run();
  console.log(tableStr); // eslint-disable-line
}
run();
