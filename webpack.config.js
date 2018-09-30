const webpack = require('webpack')
const path = require('path')

module.exports = (function(options) {

  return {
    entry: __dirname + "/src/index.ts",

    output: {
      path: __dirname + "/dist",

      filename: "MomoChords.js",
      library: "MomoChords"
    },

    devtool: 'source-map',

    module: {
      loaders: [
        { test: /\.ts$/, loader: "awesome-typescript-loader" }
      ]
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }


  }
})()
