
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js',
	},

	module: {
		rules: [
			{
				test: /\.vue$/i,
				loader: 'vue-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				//use: ['style-loader', 'css-loader', 'sass-loader'],
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		]
	},

	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin(),
	]
}