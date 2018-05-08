const PLUGIN_NAME = 'multiple-bundles-plugin';

class MultipleBundlesPlugin {
  constructor({ test = /\.js$/, entries }) {
    this.filePatterns = entries;
    this.fileExtensions = test;
    this.cache = [];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.chunkAsset.tap(PLUGIN_NAME, (chunk, fileName) => {
        if (
          this.fileExtensions.test(fileName)
          &&
          this.isMatchToFilePattern(chunk.entryModule.rawRequest)
        ) {
          this.addToCache(fileName);
        }
      });

      compilation.hooks.afterOptimizeChunkAssets.tap(PLUGIN_NAME, () => {
        this.cache.map(fileName => delete compilation.assets[fileName]);
      });
    });
  }

  addToCache(fileName) {
    this.cache.push(fileName);
  }

  isMatchToFilePattern(rawRequest) {
    return Object.values(this.filePatterns).find(pattern => pattern === rawRequest);
  }
}

module.exports = MultipleBundlesPlugin;
