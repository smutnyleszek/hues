import deepFreeze from '../helpers/deepFreeze';

const spacesData = deepFreeze({
    hex: {
        syntax: {
            before: '#',
            between: '',
            after: ''
        },
        properties: [
            {
                name: 'red',
                type: 'hexadecimal',
                length: 2
            },
            {
                name: 'green',
                type: 'hexadecimal',
                length: 2
            },
            {
                name: 'blue',
                type: 'hexadecimal',
                length: 2
            }
        ]
    },
    rgb: {
        syntax: {
            before: 'rgb(',
            between: ',',
            after: ')'
        },
        properties: [
            {
                name: 'red',
                type: 'integer',
                range: [0, 255]
            },
            {
                name: 'green',
                type: 'integer',
                range: [0, 255]
            },
            {
                name: 'blue',
                type: 'integer',
                range: [0, 255]
            }
        ]
    },
    hsl: {
        syntax: {
            before: 'hsl(',
            between: ',',
            after: ')'
        },
        properties: [
            {
                name: 'hue',
                type: 'integer',
                range: [0, 360]
            },
            {
                name: 'saturation',
                type: 'integer',
                range: [0, 100]
            },
            {
                name: 'lightness',
                type: 'integer',
                range: [0, 100]
            }
        ]
    },
    hwb: {
        syntax: {
            before: 'hwb(',
            between: ',',
            after: ')'
        },
        properties: [
            {
                name: 'hue',
                type: 'integer',
                range: [0, 360]
            },
            {
                name: 'whiteness',
                type: 'integer',
                range: [0, 100]
            },
            {
                name: 'blackness',
                type: 'integer',
                range: [0, 100]
            }
        ]
    }
});

export default spacesData;
