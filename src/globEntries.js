const glob = require('glob');
const path = require('path');
const R = require('ramda');

const sassRegex = /\/(sass|scss)\//;

const sassHelper = (file, isSass) => {
  let dir = path.dirname(file);
  return isSass ? trimSassFolder(dir) : dir;
};

const trimSassFolder = dirs => dirs.replace(sassRegex, '/css/');
const getTwoLastDirs = R.compose(R.join('/'), R.takeLast(2), R.split('/'), sassHelper);

const generateCustomPath = (file, sass) => {
  const fileName = path.basename(file);
  const directory = getTwoLastDirs(file, sass);

  return path.posix.join(directory, fileName).split('.').shift();
};

const globEntries = (entryPattern, {
  sass
} = {
  sass: false
}) => {
  const reducer = entryPattern.reduce((outputAccumulator, pattern) => {
    const paths = glob.sync(pattern).reduce((accumulator, file) => {
      const acc = accumulator;
      acc[generateCustomPath(file, sass)] = file;
      return acc;
    }, {});
    return Object.assign(outputAccumulator, paths, {});
  }, {});
  return reducer;
};

module.exports = globEntries;