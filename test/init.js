// NOTE: this file is pure JavaScript and doesn't go through Babel
// inspired by http://monicalent.com/blog/2015/02/11/karma-tests-angular-js-require-j/

var allTestFiles = [];

for (var file in window.__karma__.files) {
    if (/Test\.js$/.test(file)) {
        allTestFiles.push(file);
    }
}

require.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        alt: '../dist/npmdeps/alt',
        react: '../dist/npmdeps/react',
        'react-dom': '../dist/npmdeps/react-dom',
        'react-test-renderer': '../node_modules/react-test-renderer/index'
    },

    shim: {
        alt: {exports: 'alt'},
        react: {exports: 'react'},
        'react-dom': {exports: 'react-dom'},
        'react-test-renderer': {exports: 'react-test-renderer'}
    },

    // ask Require.js to load these files (all our allTestFiles)
    deps: allTestFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
