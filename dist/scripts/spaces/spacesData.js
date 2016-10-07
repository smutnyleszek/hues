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
            syntax: {
                before: '#',
                between: '',
                after: ''
            },
            properties: [{
                name: 'red',
                type: 'hexadecimal',
                length: 2
            }, {
                name: 'green',
                type: 'hexadecimal',
                length: 2
            }, {
                name: 'blue',
                type: 'hexadecimal',
                length: 2
            }]
        },
        rgb: {
            syntax: {
                before: 'rgb(',
                between: ',',
                after: ')'
            },
            properties: [{
                name: 'red',
                type: 'integer',
                range: [0, 255]
            }, {
                name: 'green',
                type: 'integer',
                range: [0, 255]
            }, {
                name: 'blue',
                type: 'integer',
                range: [0, 255]
            }]
        },
        hsl: {
            syntax: {
                before: 'hsl(',
                between: ',',
                after: ')'
            },
            properties: [{
                name: 'hue',
                type: 'integer',
                range: [0, 360]
            }, {
                name: 'saturation',
                type: 'integer',
                range: [0, 100]
            }, {
                name: 'lightness',
                type: 'integer',
                range: [0, 100]
            }]
        },
        hwb: {
            syntax: {
                before: 'hwb(',
                between: ',',
                after: ')'
            },
            properties: [{
                name: 'hue',
                type: 'integer',
                range: [0, 360]
            }, {
                name: 'whiteness',
                type: 'integer',
                range: [0, 100]
            }, {
                name: 'blackness',
                type: 'integer',
                range: [0, 100]
            }]
        }
    });

    exports.default = spacesData;
});