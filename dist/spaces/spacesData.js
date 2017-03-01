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

    var spacesData = (0, _deepFreeze2.default)(new Map([['hex', {
        properties: new Map([['red', {
            category: 'hexadecimal',
            range: [0, 255],
            before: '#'
        }], ['green', {
            category: 'hexadecimal',
            range: [0, 255]
        }], ['blue', {
            category: 'hexadecimal',
            range: [0, 255]
        }]])
    }], ['rgb', {
        properties: new Map([['red', {
            category: 'integer',
            range: [0, 255],
            before: 'rgb(',
            after: ', '
        }], ['green', {
            category: 'integer',
            range: [0, 255],
            after: ', '
        }], ['blue', {
            category: 'integer',
            range: [0, 255],
            after: ')'
        }]])
    }], ['hsl', {
        properties: new Map([['hue', {
            category: 'integer',
            range: [0, 360],
            before: 'hsl(',
            after: ', '
        }], ['saturation', {
            category: 'integer',
            range: [0, 100],
            after: '%, '
        }], ['lightness', {
            category: 'integer',
            range: [0, 100],
            after: '%)'
        }]])
    }], ['hwb', {
        properties: new Map([['hue', {
            category: 'integer',
            range: [0, 360],
            before: 'hwb(',
            after: ', '
        }], ['whiteness', {
            category: 'integer',
            range: [0, 100],
            after: '%, '
        }], ['blackness', {
            category: 'integer',
            range: [0, 100],
            after: '%)'
        }]])
    }]]));

    exports.default = spacesData;
});