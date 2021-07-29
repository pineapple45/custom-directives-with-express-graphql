// env-loader.js
const dotenv = require('dotenv');
module.exports = function plugin(snowpackConfig, { path }) {
  dotenv.config({ path: path });
  return { name: 'Custom plugin from StackOverflow' };
};
