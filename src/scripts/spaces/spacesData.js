import deepFreeze from '../helpers/deepFreeze';

const spacesData = deepFreeze(new Map([
    [
        'hex',
        {
            syntax: {
                before: '#',
                between: '',
                after: ''
            },
            properties: [
                {
                    name: 'red',
                    category: 'hexadecimal',
                    maxlength: 2
                },
                {
                    name: 'green',
                    category: 'hexadecimal',
                    maxlength: 2
                },
                {
                    name: 'blue',
                    category: 'hexadecimal',
                    maxlength: 2
                }
            ]
        }
    ],
    [
        'rgb',
        {
            syntax: {
                before: 'rgb(',
                between: ',',
                after: ')'
            },
            properties: [
                {
                    name: 'red',
                    category: 'integer',
                    range: [0, 255]
                },
                {
                    name: 'green',
                    category: 'integer',
                    range: [0, 255]
                },
                {
                    name: 'blue',
                    category: 'integer',
                    range: [0, 255]
                }
            ]
        }
    ],
    [
        'hsl',
        {
            syntax: {
                before: 'hsl(',
                between: ',',
                after: ')'
            },
            properties: [
                {
                    name: 'hue',
                    category: 'integer',
                    range: [0, 360]
                },
                {
                    name: 'saturation',
                    category: 'integer',
                    range: [0, 100]
                },
                {
                    name: 'lightness',
                    category: 'integer',
                    range: [0, 100]
                }
            ]
        }
    ],
    [
        'hwb',
        {
            syntax: {
                before: 'hwb(',
                between: ',',
                after: ')'
            },
            properties: [
                {
                    name: 'hue',
                    category: 'integer',
                    range: [0, 360]
                },
                {
                    name: 'whiteness',
                    category: 'integer',
                    range: [0, 100]
                },
                {
                    name: 'blackness',
                    category: 'integer',
                    range: [0, 100]
                }
            ]
        }
    ]
]));

export default spacesData;
