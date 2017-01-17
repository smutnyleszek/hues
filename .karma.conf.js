module.exports = function (config) {
    config.set({
        basePath: '',
        port: 9876,
        autoWatch: false,
        singleRun: true,

        reporters: ['spec', 'coverage'],
        logLevel: config.LOG_INFO,
        colors: true,

        specReporter: {
            showSpecTiming: true
        },

        frameworks: ['jasmine', 'requirejs'],
        browsers: ['PhantomJS'],

        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-polyfill/dist/polyfill.min.js',
            {pattern: 'src/scripts/**/*.js', included: false},
            {pattern: 'test/scripts/**/*Test.js', included: false},
            'test/scripts/init.js'
        ],
        exclude: [
            'src/scripts/main.js'
        ],

        // preprocess matching files before serving them to the browser
        // https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/scripts/**/*.js': ['babel', 'coverage'],
            'test/scripts/**/*Test.js': ['babel']
        },

        coverageReporter: {
            dir: 'test/coverage',
            reporters: [
                {
                    type: 'html',
                    includeAllSources: true
                },
                {
                    type: 'text-summary',
                    file: 'text-summary.txt',
                    includeAllSources: true
                }
            ]
        }
    });
};
