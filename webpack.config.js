const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: path.resolve('src/index.js'),
    },
    output: {
        filename: '[name].js',
        path: 'dist',
        publicPath: `/dist/`
    },
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
};