# TODO

Babel:
- https://babeljs.io/docs/learn-es2015/

React:
- http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome

React+bacon:
- https://medium.com/@milankinen/good-bye-flux-welcome-bacon-rx-23c71abfb1a7#.zb5kpwbtd
- https://github.com/milankinen/react-bacon-todomvc

CSS Modules: http://glenmaddern.com/articles/css-modules

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


## Architecture

Elments that tool should be made of:

1. **paster** - one component
    - an input for pasting strings
    - should interpret string and identify space from syntax
    - should update spaces after interpretation
    - should log error if couldn't identify space
2. **space** - one component for each color space (HEX, RGB, HSL, HWB)
    - multiple inputs for each property
    - button to copy syntaxed color
    - should update other spaces on change
3. **visualiser** - one component
    - rectangle for displaying current color
    - rectangle for displaying general color hue
    - general color hue name
    - should update when a space color changes
4. **guesser** - one component
    - rectangle for displaying guessed color
    - read-only input for color name string
    - "approximate" or "exact" sublabel
    - should update when a space color changes
5. **library** - one component
    - list of all colors from the library hue-sorted
    - **library item** - one component for each color
        - rectangle for displaying color
        - read-only input for color name string
        - button to load color in spaces
