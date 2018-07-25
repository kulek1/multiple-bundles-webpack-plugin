const { joinDirectory, takePathWithoutExt } = require('../src/globEntries');

const jsFile = {
  fileName: 'accordion.js',
  directory: 'js/components',
};
const cssFile = {
  fileName: 'form.scss',
  directory: 'css/components',
};

it('joinDirectory returns correct path', () => {
  expect(joinDirectory(jsFile.directory)(jsFile.fileName)).toBe('js/components/accordion.js');
  expect(joinDirectory(cssFile.directory)(cssFile.fileName)).toBe('css/components/form.scss');
});

it('takePathWithoutExt returns correct path without file extension', () => {
  expect(takePathWithoutExt(jsFile.directory)(jsFile.fileName)).toBe('js/components/accordion');
  expect(takePathWithoutExt(cssFile.directory)(cssFile.fileName)).toBe('css/components/form');
});
