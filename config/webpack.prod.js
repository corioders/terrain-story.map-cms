const config = require('./config');
if (!config.IS_PRODUCTION) console.warn('Waring: using webpack prod config not in production env');

const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsMinimizerPlugin = require('terser-webpack-plugin');

const terser = require('terser');

const htmlWebpackPluginConfig = {
	minify: {
		caseSensitive: false,
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		useShortDoctype: false,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true,
		sortAttributes: true,
		sortClassName: true,
	},
};

module.exports = {
	mode: 'production',
	// use of es5 is needed as the webpack runtime is not transpiled by babel
	target: common.webpack.target,
	devtool: config.IS_DEBUG ? 'source-map' : false,

	context: common.webpack.context,
	entry: common.webpack.entry,
	output: common.webpack.output,
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
		minimizer: [new JsMinimizerPlugin({ extractComments: false, terserOptions: { toplevel: true, compress: { passes: 10 } } }), new CssMinimizerPlugin()],
	},

	devServer: config.IS_DEBUG ? common.webpack.devServer : undefined,
};
