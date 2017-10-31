const webpack = require('webpack');
// Karma configuration for Unit testing

module.exports = function (config) {

	const configuration = {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-webpack'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('karma-sourcemap-loader'),
			require('karma-spec-reporter')
		],

		// list of files / patterns to load in the browser
		files: [
			{ pattern: './spec.bundle.js', watched: false }
		],

		// list of files to exclude
		exclude: [],

		client:{
      		clearContext: false // leave Jasmine Spec Runner output visible in browser
    	},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./spec.bundle.js': ['webpack', 'sourcemap']
		},

		// webpack
		webpack: {
			resolve: {
				extensions: ['.ts', '.js']
			},
			module: {
				rules: [
					{
						test: /\.ts/,
						loaders: ['ts-loader', 'source-map-loader'],
						exclude: /node_modules/
					},
					{
						test: /src\/.+\.ts$/,
						exclude: /(node_modules|\.spec\.ts$)/,
						loader: 'istanbul-instrumenter-loader',
						enforce: 'post',
						options: {
						  esModules: true
						}
					}
				],
			},
			plugins: [
				new webpack.SourceMapDevToolPlugin({
					filename: null,
					test: /\.(ts|js)($|\?)/i
				})
			],
			performance: { hints: false }
		},

		webpackServer: {
			noInfo: true
		},

		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly', 'text-summary'],
			dir: './coverage',
			'report-config': {
				html: {
					subdir: 'html'
				}
			},
			fixWebpackSourcePaths: true,
			skipFilesWithNoCoverage: true,
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'kjhtml', 'coverage-istanbul'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false

	};

	config.set(configuration);

}