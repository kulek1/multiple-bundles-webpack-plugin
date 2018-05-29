const glob = require('glob');
const path = require('path');
const { compose, takeLast, split, join, shift, head } = require('ramda');

const sassRegex = /\/(sass|scss)\//;

const trimSassFolder = dirs => dirs.replace(sassRegex, '/css/');
const sassHelper = (file, isSass) => {
  const dir = path.dirname(file);
  return isSass ? trimSassFolder(dir) : dir;
};
const getTwoLastDirs = compose(join('/'), takeLast(2), split('/'), sassHelper);
const joinDirectory = directory => fileName => path.posix.join(directory, fileName);
const takePathWithoutExt = directory => compose(head, split('.'), joinDirectory(directory));

const generateCustomPath = (file, sass) => {
  const fileName = path.basename(file);
  const directory = getTwoLastDirs(file, sass);

  return takePathWithoutExt(directory)(fileName);
};

const globEntries = (entryPattern, { sass } = { sass: false }) => {
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
