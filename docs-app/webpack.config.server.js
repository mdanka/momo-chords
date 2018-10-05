"use strict";

const path = require("path");
const webpack = require("webpack");

const baseWebpackConfig = require("./webpack.config");

const baseUrl = "/";
const webpackDevServerPort = "8543";

module.exports = Object.assign({}, baseWebpackConfig, {
    mode: 'dev',
    entry: [
        ...baseWebpackConfig.entry.app,
        // "webpack/hot/dev-server",
        // `${require.resolve("webpack-dev-server/client/")}?http://localhost:${webpackDevServerPort}`,
    ],
    output: Object.assign({}, baseWebpackConfig.output, {
        publicPath: `http://localhost:${webpackDevServerPort}${baseUrl}`,
    }),
    module: Object.assign({}, baseWebpackConfig.module),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...baseWebpackConfig.plugins,
    ],
    devServer: {
        contentBase: path.join(__dirname, "build", "src"),
        historyApiFallback: {
            index: baseUrl,
        },
        https: false,
        hot: true,
        port: webpackDevServerPort,
        // proxy: {
        //     "*": {
        //         target: "http://localhost:8443",
        //         secure: false,
        //     },
        // },
        publicPath: `http://localhost:${webpackDevServerPort}${baseUrl}`,
        stats: baseWebpackConfig.stats,
    },
});
