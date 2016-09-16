define(['exports', '../helpers/deepFreeze'], function (exports, _deepFreeze) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var spacesData = (0, _deepFreeze2.default)({
        hex: {
            slug: 'hex',
            properties: [{
                name: 'red',
                value: '00',
                type: 'hexadecimal',
                maxlength: 2,
                syntaxBefore: '#'
            }, {
                name: 'green',
                value: '00',
                type: 'hexadecimal',
                maxlength: 2
            }, {
                name: 'blue',
                value: '00',
                type: 'hexadecimal',
                maxlength: 2
            }]
        },
        rgb: {
            slug: 'rgb',
            properties: [{
                name: 'red',
                value: 0,
                type: 'integer',
                range: [0, 255],
                maxlength: 3,
                syntaxBefore: 'rgb(',
                syntaxAfter: ', '
            }, {
                name: 'green',
                value: 0,
                type: 'integer',
                range: [0, 255],
                maxlength: 3,
                syntaxAfter: ', '
            }, {
                name: 'blue',
                value: 0,
                type: 'integer',
                range: [0, 255],
                maxlength: 3,
                syntaxAfter: ')'
            }]
        },
        hsl: {
            slug: 'hsl',
            properties: [{
                name: 'hue',
                value: 0,
                type: 'integer',
                range: [0, 360],
                maxlength: 3,
                syntaxBefore: 'hsl(',
                syntaxAfter: ', '
            }, {
                name: 'saturation',
                value: 0,
                type: 'percentage',
                range: [0, 100],
                maxlength: 3,
                syntaxAfter: '%, '
            }, {
                name: 'lightness',
                value: 0,
                type: 'percentage',
                range: [0, 100],
                maxlength: 3,
                syntaxAfter: '%)'
            }]
        },
        hwb: {
            slug: 'hwb',
            properties: [{
                name: 'hue',
                value: 0,
                type: 'integer',
                range: [0, 360],
                maxlength: 3,
                syntaxBefore: 'hwb(',
                syntaxAfter: ', '
            }, {
                name: 'whiteness',
                value: 0,
                type: 'percentage',
                range: [0, 100],
                maxlength: 3,
                syntaxAfter: '%, '
            }, {
                name: 'blackness',
                value: 0,
                type: 'percentage',
                range: [0, 100],
                maxlength: 3,
                syntaxAfter: '%)'
            }]
        }
    });

    exports.default = spacesData;
});