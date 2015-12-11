# Hues

A yet-nonexistent tool for working with colors in CSS (SCSS).

Things to do:

1. User input of color in any format (HEX, RGB, RGBA, HSL and HSLA)
    1. text boxes for color strings: HEX, RGB and HSL
    2. visual color picker
    3. text boxes (input type number) for basic values of those three formats
2. Conversion to HEX, RGB and HSL (dropping alpha)
3. Paring given color with a label and general hue from predefined color-names-library (approximate or exact)
4. List of all colors from the library hue-sorted
5. Variables live output for SASS and CSS4:
    - `$c-colorName: hsl(0, 0%, 0%);`
    - '--c-colorName: hsl(0, 0%, 0%);'
6. Visual color overview:
    1. current color
    2. color pair
    3. color pair hue
7. Create a whole palette of colors


Color names inspiration:

1. http://chir.ag/projects/name-that-color
2. https://www.npmjs.org/package/color-namer
3. http://viget.com/inspire/naming-colors

Converter tools:

1. https://github.com/MoOx/color-convert
2. https://github.com/imathis/hsl-picker
3. https://drafts.csswg.org/css-color/#the-hwb-notation

Framework to test: https://github.com/tastejs/todomvc/tree/master/examples/backbone
