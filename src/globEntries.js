const glob = require('glob');
const path = require('path');

const generateCustomPath = (file) => {
  const fileName = path.basename(file);
  const directoryName = path.posix.basename(path.dirname(file));
  return path.posix.join(directoryName, fileName).split('.').shift();
};

const globEntries = (entryPattern) => entryPattern.reduce((outputAccumulator, pattern) =>
    Object.assign(outputAccumulator, glob.sync(pattern).reduce((accumulator, file) => {
      accumulator[generateCustomPath(file)] = file;
        return accumulator;
        }, {}))
  , {});

module.exports = globEntries;
