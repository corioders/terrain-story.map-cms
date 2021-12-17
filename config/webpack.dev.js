const config = require('./config');
if (config.IS_PRODUCTION) console.warn('Waring: using webpack dev config in production env');

const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	target: common.webpack.target,
	devtool: config.IS_FAST ? 'eval-cheap-module-source-map' : 'source-map',

	context: common.webpack.context,
	entry: common.webpack.entry,
	output: common.webpack.output,
	experiments: common.webpack.experiments,
	resolve: common.webpack.resolve,
	cache: common.webpack.cache,

	module: { rules: common.webpack.module.rules },

	plugins: [
		...common.webpack.plugins,
		new HtmlWebpackPlugin({
			template: common.paths.htmlWebpackPluginTemplate,
			favicon: common.paths.htmlWebpackPluginFavicon,
		}),
	],

	optimization: {
		runtimeChunk: 'single',
		splitChunks: config.IS_FAST ? false : undefined,
	},

	devServer: common.webpack.devServer,
};
