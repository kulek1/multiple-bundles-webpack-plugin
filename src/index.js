class MultipleBundlesPlugin {
  constructor({ test = /\.js$/, entries }) {
    this.filePatterns = entries;
    this.fileExtensions = test;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('chunk-asset', (chunk, fileName) => {
        if (this.fileExtensions.test(fileName) && this.isMatchToFilePattern(chunk.entryModule.rawRequest)) {
          delete compilation.assets[fileName];
        }
      });
    });
  }

  isMatchToFilePattern(rawRequest) {
    return Object.values(this.filePatterns).find(pattern => pattern === rawRequest);
  }
}

module.exports = MultipleBundlesPlugin;
