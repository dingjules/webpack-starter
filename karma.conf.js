module.exports = function karmaConfig(config) {
    config.set({
      frameworks: [
        'jasmine'
      ],
  
      reporters: [
        'mocha',
        'coverage-istanbul'
      ],
  
      coverageIstanbulReporter: {
        reports: ['html', 'text-summary'],
        fixWebpackSourcePaths: true,
        dir: 'target/coverage'
      },
  
      mochaReporter: {
        showDiff: true,
        ignoreSkipped: true
      },
  
      files: [
        'node_modules/babel-polyfill/dist/polyfill.js',
        // Grab all files in the app folder that contain .spec.
        './app/tests.webpack.js'
      ],
  
      preprocessors: {
        './app/tests.webpack.js': ['webpack', 'sourcemap']
      },
  
      browsers: [
        'PhantomJS'
      ],
  
      singleRun: true,
  
      logLevel: config.LOG_DEBUG,
      client: {
        captureConsole: true,
        mocha: {
          bail: true
        }
      },
  
      webpack: require('./webpack.test.config'),
  
      // Hide webpack build information from output
      webpackMiddleware: {
        noInfo: 'errors-only'
      }
    });
  };
  