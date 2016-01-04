# Hues

A yet-nonexistent tool for working with colors in CSS (SCSS).


## WIP

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

Color names inspiration:

1. http://chir.ag/projects/name-that-color
2. https://www.npmjs.org/package/color-namer
3. http://viget.com/inspire/naming-colors

Converter tools:

1. https://github.com/MoOx/color-convert
2. https://github.com/imathis/hsl-picker
3. https://drafts.csswg.org/css-color/#the-hwb-notation

Backbone links:
- http://addyosmani.com/backbone-fundamentals/
- http://ricostacruz.com/backbone-patterns/
- http://backbonejs.org/docs/todos.html

Event dispatcher: https://lostechies.com/derickbailey/2011/07/19/references-routing-and-the-event-aggregator-coordinating-views-in-backbone-js/


## Development


### Grunt

Just use default grunt command:

```
grunt
```


### Jekyll

To serve local version of the site:

```
jekyll serve --watch --baseurl ''
```

To build site on disk:

```
jekyll build --watch
```
