![coverage-shield-badge-1](https://img.shields.io/badge/coverage-90.76%25-brightgreen.svg)

# Hues

A tool for working with colors.

Features:

- ES6 (with Babel)
- React
- Alt
- RequireJS
- Karma tests
- SVG icons
- postcss/cssnext
- MADCSS

Requirements:

1. [Jekyll](http://jekyllrb.com/)
2. [Node](https://nodejs.org)

## Building

To preview the project, you need to do three things:

1. `npm install`
2. `npm run serve`
3. open [127.0.0.1:4000](http://127.0.0.1:4000/) in the browser

## Development

What you want is to basically have two terminals:

1. `npm run serve` -- this is providing the [127.0.0.1:4000](http://127.0.0.1:4000/) "server" and watching changes on Jekyll
2. `npm run watch` -- this is watching all source files and producing dist ones

## Notes

CSS Modules:
- http://glenmaddern.com/articles/css-modules

Color names inspiration:
- http://chir.ag/projects/name-that-color
- https://www.npmjs.org/package/color-namer
- http://viget.com/inspire/naming-colors

Color identify:
- https://github.com/surfacecurve/sc-color/blob/master/lib/surfacecurve-color.js
