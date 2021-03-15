const path = require('path');
const webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: "node",
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"]}
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }

        ]
    },
    resolve: { extensions: ["*", "*.js", "*.jsx"] },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "/dist/",
        clean: true
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        // hotOnly: true
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ],
    externals: [nodeExternals()]
};