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
        syntax: {
            before: '#',
            between: '',
            after: ''
        },
        properties: [{
            id: 'red',
            category: 'hexadecimal',
            maxlength: 2
        }, {
            id: 'green',
            category: 'hexadecimal',
            maxlength: 2
        }, {
            id: 'blue',
            category: 'hexadecimal',
            maxlength: 2
        }]
    }], ['rgb', {
        syntax: {
            before: 'rgb(',
            between: ',',
            after: ')'
        },
        properties: [{
            id: 'red',
            category: 'integer',
            range: [0, 255]
        }, {
            id: 'green',
            category: 'integer',
            range: [0, 255]
        }, {
            id: 'blue',
            category: 'integer',
            range: [0, 255]
        }]
    }], ['hsl', {
        syntax: {
            before: 'hsl(',
            between: ',',
            after: ')'
        },
        properties: [{
            id: 'hue',
            category: 'integer',
            range: [0, 360]
        }, {
            id: 'saturation',
            category: 'integer',
            range: [0, 100]
        }, {
            id: 'lightness',
            category: 'integer',
            range: [0, 100]
        }]
    }], ['hwb', {
        syntax: {
            before: 'hwb(',
            between: ',',
            after: ')'
        },
        properties: [{
            id: 'hue',
            category: 'integer',
            range: [0, 360]
        }, {
            id: 'whiteness',
            category: 'integer',
            range: [0, 100]
        }, {
            id: 'blackness',
            category: 'integer',
            range: [0, 100]
        }]
    }]]));

    exports.default = spacesData;
});