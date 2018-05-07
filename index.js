const globEntries = require('./src/globEntries');
const MultipleBundlesWebpackPlugin = require('./src/preventEmit');

module.exports = {
  globEntries,
	MultipleBundlesWebpackPlugin,
};
