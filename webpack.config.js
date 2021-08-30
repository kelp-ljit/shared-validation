const path = require('path');
const config = require('config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
	const MODE = process.env.NODE_ENV || 'development';

	return {
		target: 'web',
		mode: MODE,
		entry: {
			'en-us': path.join(__dirname, 'src', 'frontend', 'languages', 'en-us.js'),
			web: path.join(__dirname, 'src', 'frontend', 'index.js'),
		},
		devServer: {
			host: config.WEBPACK_DEV_SERVER.HOST,
			port: config.WEBPACK_DEV_SERVER.PORT,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Max-Age': '3000',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Methods': 'GET',
			},
		},
		output: {
			path: path.join(__dirname, 'dist', 'frontend'),
			publicPath: `//${config.WEBPACK_DEV_SERVER.HOST}:${config.WEBPACK_DEV_SERVER.PORT}/`,
			filename: '[name].js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									'@babel/preset-env',
									'@babel/react',
								],
								plugins: [
									'@babel/plugin-syntax-dynamic-import',
									'@babel/plugin-proposal-class-properties',
								],
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: [
						{loader: MiniCssExtractPlugin.loader},
						{loader: 'css-loader'},
					],
				},
				{
					test: /\.scss$/,
					use: [
						{loader: MiniCssExtractPlugin.loader},
						{loader: 'css-loader'},
						{loader: 'sass-loader'},
					],
				},
				{
					test: /\.(jpg|png|gif|eot|svg|woff|woff2|ttf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								esModule: false,
								name: 'resources/[name].[hash:8].[ext]',
								publicPath: `//${config.WEBPACK_DEV_SERVER.HOST}:${config.WEBPACK_DEV_SERVER.PORT}/`,
							},
						},
					],
				},
			],
		},
		optimization: {
			splitChunks: {
				chunks: 'initial',
				minSize: 16000,
				maxSize: 0,
				minChunks: 1,
				maxAsyncRequests: 1,
				maxInitialRequests: 1,
				automaticNameDelimiter: '-',
				name: true,
			},
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[name]-[id].css',
			}),
		],
	};
};
