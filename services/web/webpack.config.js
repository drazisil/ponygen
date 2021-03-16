const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }

        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public/"),
        headers: {
            'Cache-Control': 'no-cache'
        },
        port: 3000,
        writeToDisk: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'PonyGen 2',
            template: './src/index.html'
        })]
};