import deepFreeze from '../helpers/deepFreeze';

const spacesData = deepFreeze(new Map([
    ['hex', {
        properties: new Map([
            ['red', {
                category: 'hexadecimal',
                range: [0, 255],
                before: '#'
            }],
            ['green', {
                category: 'hexadecimal',
                range: [0, 255]
            }],
            ['blue', {
                category: 'hexadecimal',
                range: [0, 255]
            }]
        ])
    }],
    ['rgb', {
        properties: new Map([
            ['red', {
                category: 'integer',
                range: [0, 255],
                before: 'rgb(',
                after: ', '
            }],
            ['green', {
                category: 'integer',
                range: [0, 255],
                after: ', '
            }],
            ['blue', {
                category: 'integer',
                range: [0, 255],
                after: ')'
            }]
        ])
    }],
    ['hsl', {
        properties: new Map([
            ['hue', {
                category: 'integer',
                range: [0, 360],
                before: 'hsl(',
                after: ', '
            }],
            ['saturation', {
                category: 'integer',
                range: [0, 100],
                after: '%, '
            }],
            ['lightness', {
                category: 'integer',
                range: [0, 100],
                after: '%)'
            }]
        ])
    }],
    ['hwb', {
        properties: new Map([
            ['hue', {
                category: 'integer',
                range: [0, 360],
                before: 'hwb(',
                after: ', '
            }],
            ['whiteness', {
                category: 'integer',
                range: [0, 100],
                after: '%, '
            }],
            ['blackness', {
                category: 'integer',
                range: [0, 100],
                after: '%)'
            }]
        ])
    }]
]));

export default spacesData;
