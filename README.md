<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>multiple-bundles-webpack-plugin</h1>
  <p>Create multiple bundles from independent js/scss components.</p>
  <a href="https://badge.fury.io/js/multiple-bundles-webpack-plugin">
    <img src="https://badge.fury.io/js/multiple-bundles-webpack-plugin.svg" alt="npm version" height="18"/>
  </a>
  <a href="https://img.shields.io/npm/dt/multiple-bundles-webpack-plugin.svg">
    <img src="https://img.shields.io/npm/dt/multiple-bundles-webpack-plugin.svg" alt="npm downloads" height="18"/>
  </a>
  <a href="https://circleci.com/gh/kulek1/multiple-bundles-webpack-plugin/tree/master">
    <img src="https://circleci.com/gh/kulek1/multiple-bundles-webpack-plugin.svg?style=shield" alt="circleci build" height="18"/>
  </a>
</div>

<br><br>
This plugin prevents Webpack 4 from creating an separate output file from multiple, unrelated components.
Inspired by [Webpack-flat-bundle](https://github.com/xolir/webpack-flat-bundle/tree/master/plugin).

  <h2 align="center">Usage</h2>

> :warning: To make independent css files, use [Mini-Extract-Css-Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).

### Installation

```
npm install --save-dev multiple-bundles-webpack-plugin
```

## Usage

##### Import plugin and helper method:

```
const { MultipleBundlesPlugin, globEntries } = require('multiple-bundles-webpack-plugin');
```

##### Add following to your webpack config:

```
const entries = {
  ...globEntries(['./src/js/*/*.js']),
  ...globEntries(['./src/sass/*/*.scss'], { sass: true }),
};
```

> `sass` key as a second argument is needed to replace bundles paths from `sass/scss` to `css`

It will create an object something like that:

```
{ 'js/components/helloWorld': './src/js/components/helloWorld.js',
  'js/libs/picturefill': './src/js/libs/picturefill.js',
  'css/core/_variables': './src/sass/core/_variables.scss',
  'css/core/main': './src/sass/core/main.scss',
  'css/utils/author': './src/sass/utils/author.scss' }
```

Then add `entries` object to `entry` property in webpack's object:

```
{
  entry: entries
}
```

How it works?

- Helper method construct webpack entry object out of files that are matched by glob pattern.

By default this search tree and construct nested output tree, matching pattern provided.

```
{
  plugins: [
    new MultipleBundlesPlugin({
        test: /\.js$/,
        entries: globEntries(['./sass/*.scss']))
    }
  ]
}
```

## Feature Sets

| Property  | Description                                       |
| :-------- | :------------------------------------------------ |
| `test`    | Match resources to being checked by plugin        |
| `entries` | Pass globEntries object to match source of files. |

If you're using Mini-Extract-Css-Plugin it's important to set `test` property to `/\.js$\` to matching only js files,
Otherwise plugin will prevent css files from emitting.

## SourceMaps

This plugin supports CSS and JS SourceMaps.</br>
Recommended devtool flags:
- cheap-module-source-map
- source-map
- inline-source-map
- inline-cheap-module-source-map

See reference to get more: https://webpack.js.org/configuration/devtool/

Eval sourcemaps e.g. `eval-source-map` do not work properly with [Mini-Extract-Css-Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).
This issue is not related with this plugin.


**Feel free to make a pull request with new features or hotfixes.**
