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
                    id: 'red',
                    category: 'hexadecimal',
                    maxlength: 2
                },
                {
                    id: 'green',
                    category: 'hexadecimal',
                    maxlength: 2
                },
                {
                    id: 'blue',
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
                    id: 'red',
                    category: 'integer',
                    range: [0, 255]
                },
                {
                    id: 'green',
                    category: 'integer',
                    range: [0, 255]
                },
                {
                    id: 'blue',
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
                    id: 'hue',
                    category: 'integer',
                    range: [0, 360]
                },
                {
                    id: 'saturation',
                    category: 'integer',
                    range: [0, 100]
                },
                {
                    id: 'lightness',
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
                    id: 'hue',
                    category: 'integer',
                    range: [0, 360]
                },
                {
                    id: 'whiteness',
                    category: 'integer',
                    range: [0, 100]
                },
                {
                    id: 'blackness',
                    category: 'integer',
                    range: [0, 100]
                }
            ]
        }
    ]
]));

export default spacesData;
