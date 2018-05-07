
<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>multiple-bundles-webpack-plugin</h1>
  <p>Create multiple bundles from independent js/scss components.</p>
</div>

  <br><br>
This plugin prevents Webpack from creating an separate output file from multiple, unrelated components.
Inspired by [Webpack-flat-bundle](https://github.com/xolir/webpack-flat-bundle/tree/master/plugin)

  <h2 align="center">Usage</h2>

> :warning: To make independent css files, use [Mini-Extract-Css-Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).


### Installation

```
npm install --save-dev multiple-bundles-webpack-plugin
```

## Usage

##### Import plugin and helper method:
```
const { MultipleBundlesWebpackPlugin, globEntries } = require('multiple-bundles-webpack-plugin');

```

##### Add following to your webpack config:
```
const entries = Object.assign(
  globEntries(['./src/js/*/*.js'], { relativeRoot: './src/js' }),
  globEntries(['./src/sass/*/*.scss'], { relativeRoot: './src/sass/' }),
);
```

It will create an object something like that:
```
{ 'components/helloWorld': './src/js/components/helloWorld.js',
  'libs/picturefill': './src/js/libs/picturefill.js',
  'core/_variables': './src/sass/core/_variables.scss',
  'core/main': './src/sass/core/main.scss',
  'utils/author': './src/sass/utils/author.scss' }
```

Then add `entries` object to `entry` property:
```
{
  entry: entries
}
```

How it works?

* Helper method construct webpack entry object out of files that are matched by glob pattern.

By default this search tree and construct nested output tree, matching pattern provided.

```
{
  plugins: [
    new MultipleBundlesWebpackPlugin({
        test: /\.js$/,
        entries: globEntries(['./sass/*.scss'], { relativeRoot: './sass/'}))
    }
  ]
}
```

## Feature Sets

| Property | Description |
|:---|:---|
| `test`   | Match resources to being checked by plugin |
| `entries`      | Pass globEntries object to match source of files. |

If you're using Mini-Extract-Css-Plugin it's important to set `test` property to `/\.js$\` to matching only js files,
Otherwise plugin will prevent css files from emitting.