const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoPrefixer = require('autoprefixer');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!sass!postcss?sourceMap')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=img/[name]_2.[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css", {allChunks: true})
    ],
    postcss: [autoPrefixer({browsers: ['last 3 versions']})]
};
