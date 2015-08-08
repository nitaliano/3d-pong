var webpack = require('webpack'),
	path = require('path');

var plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]))
];

var appConfig = {
	entry: './src/app.js',

	output: {
		path: './build/',
		publicPath: './',
		sourcePrefix: ' ',
		filename: 'app.js'
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.jpg/,
				loader: 'url-loader?limit=10000&mimetype=image/jpeg'
			},
			{
				test: /\.png/,
				loader: 'url-loader?limit=10000&mimetype=image/png'
			},
			{
				test: /\.ogg/,
				loader: 'url-loader?mimetype=audio/ogg'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},

	plugins: plugins,

	resolve: {
		root: [path.join(__dirname, "bower_components")],
		extensions: ['', '.js']
	}
};

module.exports = appConfig;