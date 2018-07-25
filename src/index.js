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
          this.fileExtensions.test(fileName) &&
          chunk.entryModule &&
          this.isMatchToFilePattern(chunk.entryModule.rawRequest)
        ) {
          this.addToCache(fileName);
        }
      });

      compilation.hooks.afterOptimizeAssets.tap(PLUGIN_NAME, () => {
        this.cache.map(fileName => delete compilation.assets[fileName]);
      });
    });

    compiler.hooks.emit.tap(PLUGIN_NAME, (compilation) => {
      Object.keys(compilation.assets).map((item) => {
        const fixedName = this.trimFirstDirectory(item);
        compilation.assets[fixedName] = compilation.assets[item];
        delete compilation.assets[item];
      });
    });
  }

  trimFirstDirectory(item) {
    return item.slice(item.indexOf('/') + 1, item.length);
  }

  addToCache(fileName) {
    this.cache.push(fileName);
  }

  isMatchToFilePattern(rawRequest) {
    return Object.values(this.filePatterns).find(pattern => pattern === rawRequest);
  }
}

module.exports = MultipleBundlesPlugin;
