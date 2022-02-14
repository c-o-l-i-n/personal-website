const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	output: {
		filename: 'bundle.js',
		path: `${__dirname}/dist`,
		clean: true,
	},
	target: 'web',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/CNAME', to: 'CNAME', toType: 'file' },
				{ from: './src/assets', to: 'assets' },
				{ from: './src/redirects/*.html', to: '[name]/index.html' },
				{ from: './src/resume.pdf', to: 'Colin-Williams-Resume.pdf' },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
}
