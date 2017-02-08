import deepFreeze from '../helpers/deepFreeze';

const spacesData = deepFreeze(new Map([
    [
        'hex',
        {
            syntax: {before: '#', between: '', after: ''},
            properties: new Map([
                ['red', {category: 'hexadecimal', range: [0, 255]}],
                ['green', {category: 'hexadecimal', range: [0, 255]}],
                ['blue', {category: 'hexadecimal', range: [0, 255]}]
            ])
        }
    ],
    [
        'rgb',
        {
            syntax: {before: 'rgb(', between: ',', after: ')'},
            properties: new Map([
                ['red', {category: 'integer', range: [0, 255]}],
                ['green', {category: 'integer', range: [0, 255]}],
                ['blue', {category: 'integer', range: [0, 255]}]
            ])
        }
    ],
    [
        'hsl',
        {
            syntax: {before: 'hsl(', between: ',', after: ')'},
            properties: new Map([
                ['hue', {category: 'integer', range: [0, 360]}],
                ['saturation', {category: 'integer', range: [0, 100]}],
                ['lightness', {category: 'integer', range: [0, 100]}]
            ])
        }
    ],
    [
        'hwb',
        {
            syntax: {before: 'hwb(', between: ',', after: ')'},
            properties: new Map([
                ['hue', {category: 'integer', range: [0, 360]}],
                ['whiteness', {category: 'integer', range: [0, 100]}],
                ['blackness', {category: 'integer', range: [0, 100]}]
            ])
        }
    ]
]));

export default spacesData;
