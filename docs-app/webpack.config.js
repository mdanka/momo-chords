"use strict";

var path = require('path');

const webpack = require("webpack");

const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const staticFileRegex = /\.(woff|svg|ttf|eot|gif|jpeg|jpg|png)([\?]?.*)$/;

module.exports = {
    mode: 'production',
    entry: {
        app: [
            path.resolve(__dirname, "src/app.tsx"),
            path.resolve(__dirname, "src/app.scss"),
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader', // compiles SCSS to CSS
                    options: {
                        sourceMap: true,
                        sourceMapContents: false
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: staticFileRegex,
                include: [
                    path.resolve(__dirname, "node_modules"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                        },
                    }
                ]
            },
            {
                test: staticFileRegex,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash].[ext]"
                        },
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
            },
            template: path.resolve(__dirname, "src/index.html"),
            title: "Miklós Danka",
        }),
        new WebpackBuildNotifierPlugin({
            title: "Miklós Danka Build",
        }),
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                postcss: () => {
                    return [
                        autoprefixer({
                            browsers: [
                                "> 1%",
                                "last 2 versions",
                                "Firefox ESR",
                                "Opera 12.1",
                            ],
                        }),
                    ];
                }
            }
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
