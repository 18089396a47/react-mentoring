const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.argv.indexOf('-p') !== -1;
const config = {
    context: path.join(__dirname, 'public'),
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 8080
    },
    entry: isProduction ? [
        'babel-polyfill',
        './index.js'
    ] : [
        'babel-polyfill',
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080",
        "./index.js"
    ],
    output: {
        path: path.join(__dirname, "public/build/"),
        publicPath: '/',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.styl$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!stylus-loader"
            })
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=public/fonts/[name].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: [
                "react-hot-loader/webpack",
                'babel-loader'
            ]
        }, {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            loaders: [
              'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack-loader'
            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.NamedModulesPlugin()
    ],
    resolve: {
        extensions: ['.css', '.js', '.styl', '.json', 'index.js']
    }
};

if (!isProduction) {
    config.plugins.push(new HtmlWebpackPlugin({
        title: 'Test',
        hash: true,
        template: '../index.html'
    }));
}

module.exports = config;
