const Webpack = require('webpack');
const path = require('path'); //?
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const release = !JSON.parse(process.env.DEBUG || false);

module.exports = {
	entry: {
		app: ['./polyfills', './src/index']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: {
			disableDotRule: true
		},
	},
	devtool: "source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			loader: "source-map-loader"
		}, {
			test: /\.(ts|tsx)?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
			include: resolveApp('src'),
		}, {
			test: /\.css/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader']
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}, {
			test: /\.(woff2?|ttf|eot|svg|gif)$/,
			loader: 'file-loader?name=[path][name].[ext]'
		}, {
			test: /\.png$/,
			loader: "url-loader?limit=100000"
		}, {
			test: /\.jpg$/,
			loader: "file-loader"
		}]
	},
	plugins: [
		new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': release ? JSON.stringify('production') : JSON.stringify('development')
            }
        }),
		new WebpackNotifierPlugin(),
		new HtmlPlugin({
			title: 'Test APP',
			filename: 'index.html',
			template: path.join('index.html')
		}),
		new ExtractTextPlugin('style.css')
	]
};