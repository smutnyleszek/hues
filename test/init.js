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
        alt: '../node_modules/alt/dist/alt',
        react: '../node_modules/react/dist/react-with-addons',
        'react-dom': '../node_modules/react-dom/dist/react-dom'
    },

    shim: {
        alt: {exports: 'alt'},
        react: {exports: 'react'},
        'react-dom': {exports: 'react-dom'}
    },

    // ask Require.js to load these files (all our allTestFiles)
    deps: allTestFiles,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
