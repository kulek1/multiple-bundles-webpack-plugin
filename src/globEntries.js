const glob = require('glob');
const path = require('path');

const generateCustomPath = (file) => {
  const fileName = path.basename(file);
  const directoryName = path.posix.basename(path.dirname(file));
  return path.posix.join(directoryName, fileName).split('.').shift();
};

const globEntries = (entryPattern) => {
  const reducer = entryPattern.reduce((outputAccumulator, pattern) => {
    const paths = glob.sync(pattern).reduce((accumulator, file) => {
      const acc = accumulator;
      acc[generateCustomPath(file)] = file;
      return acc;
    }, {});
    return Object.assign(outputAccumulator, paths, {});
  }, {});
  return reducer;
};

module.exports = globEntries;
