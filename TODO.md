# TODO

bugs:
- add missing % to hsl and hwb syntax!

- stage 1: start with simple color converter
    - four spaces components that updates on currentColor
    - store with current values
    - converter service
    - initial styles
    - maybe logo of some kind
- stage 2:
    - add copy syntax buttons to spaces
- stage 3: add visualiser
    - square with current color
    - tool for calculating general hue and getting name for it
    - square with current color general hue (with name)
    - shows current from rgb space (same space as colors in library later?)
- stage 4: interpreter
    - interpreter service that receives a string and guesses if this is:
        - #abcdef
        - rgb(1,2,3)
        - hsl(1,2,3)
        - hwb(1,2,3)
    - input for pasting stuff that will be interpreted ("interpret" button)
    - after interpretation we should validate if values are proper?
    - after interpretation, apply values to given space (if makes sense)
- stage 5: add library
    - squares with names
    - grouped by hues?
    - displayed alphabetically?
    - onClick set current color value
    - add checking color names in interpreter
    - Library color should have these informations:
        - name
        - value (decide whether base should be HEX, RGB or HWB)
        - general hue group (or calculate? rgb.to.hwb and read "h"?)
        - source? (if it has one; could be Crayola, Resene, etc.)
        - additional information/short description (?)
    - library sorted by hue and then what? or alphabetically
- stage 6: add guesser
    - watches only the base color space (rgb?)
    - guesser service that finds closest color from library (returns color and similarity score - 1 for exact, >1 for approximate)
    - guessed color square
    - guessed color general hue square (with name)
    - similarity label (only show if exact? or only approx?)
    - button to copy name?

## Notes

Babel:
- https://babeljs.io/docs/learn-es2015/

React:
- http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome

React+bacon:
- https://medium.com/@milankinen/good-bye-flux-welcome-bacon-rx-23c71abfb1a7#.zb5kpwbtd
- https://github.com/milankinen/react-bacon-todomvc

CSS Modules:
- http://glenmaddern.com/articles/css-modules
- https://jakearchibald.com/2016/link-in-body/

Color names inspiration:
- http://chir.ag/projects/name-that-color
- https://www.npmjs.org/package/color-namer
- http://viget.com/inspire/naming-colors

Converter tools:
- https://github.com/MoOx/color-convert
- https://github.com/imathis/hsl-picker
- https://drafts.csswg.org/css-color/#the-hwb-notation

Color identify:
- https://github.com/surfacecurve/sc-color/blob/master/lib/surfacecurve-color.js
