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
        syntax: { before: '#', between: '', after: '' },
        properties: new Map([['red', { category: 'hexadecimal', maxlength: 2 }], ['green', { category: 'hexadecimal', maxlength: 2 }], ['blue', { category: 'hexadecimal', maxlength: 2 }]])
    }], ['rgb', {
        syntax: { before: 'rgb(', between: ',', after: ')' },
        properties: new Map([['red', { category: 'integer', range: [0, 255] }], ['green', { category: 'integer', range: [0, 255] }], ['blue', { category: 'integer', range: [0, 255] }]])
    }], ['hsl', {
        syntax: { before: 'hsl(', between: ',', after: ')' },
        properties: new Map([['hue', { category: 'integer', range: [0, 360] }], ['saturation', { category: 'integer', range: [0, 100] }], ['lightness', { category: 'integer', range: [0, 100] }]])
    }], ['hwb', {
        syntax: { before: 'hwb(', between: ',', after: ')' },
        properties: new Map([['hue', { category: 'integer', range: [0, 360] }], ['whiteness', { category: 'integer', range: [0, 100] }], ['blackness', { category: 'integer', range: [0, 100] }]])
    }]]));

    exports.default = spacesData;
});