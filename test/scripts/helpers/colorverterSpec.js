import colorverter from 'helpers/colorverter';

const testPairs = [
    ['hex', ['00', '7f', 'ff'], 'rgb', [0, 127, 255]],
    ['hex', ['00', '7f', 'ff'], 'hsl', [210, 100, 50]],
    ['hex', ['00', '7f', 'ff'], 'hwb', [210, 0, 0]],
    ['rgb', [0, 127, 255], 'hex', ['00', '7f', 'ff']],
    ['rgb', [0, 127, 255], 'hwb', [210, 0, 0]],
    ['hsl', [210, 100, 50], 'hex', ['00', '7f', 'ff']],
    ['hsl', [210, 100, 50], 'rgb', [0, 127, 255]],
    ['hsl', [210, 100, 50], 'hwb', [210, 0, 0]],
    ['hwb', [210, 0, 0], 'hex', ['00', '80', 'ff']],
    ['hwb', [210, 0, 0], 'rgb', [0, 128, 255]],
    ['hwb', [210, 0, 0], 'hsl', [210, 100, 50]],
    // there are some RGB color variations that can't be displayed with HSL:
    ['rgb', [0, 125, 255], 'hsl', [211, 100, 50]],
    ['rgb', [0, 126, 255], 'hsl', [210, 100, 50]],
    ['rgb', [0, 127, 255], 'hsl', [210, 100, 50]],
    ['rgb', [0, 128, 255], 'hsl', [210, 100, 50]],
    ['rgb', [0, 129, 255], 'hsl', [210, 100, 50]],
    ['rgb', [0, 130, 255], 'hsl', [209, 100, 50]]
];

const hexConvertersMap = new Map([
    ['rgb', 'hexToRgb'],
    ['hsl', 'hexToHsl'],
    ['hwb', 'hexToHwb']
]);
const rgbConvertersMap = new Map([
    ['hex', 'rgbToHex'],
    ['hsl', 'rgbToHsl'],
    ['hwb', 'rgbToHwb']
]);
const hslConvertersMap = new Map([
    ['rgb', 'hslToRgb'],
    ['hex', 'hslToHex'],
    ['hwb', 'hslToHwb']
]);
const hwbConvertersMap = new Map([
    ['hex', 'hwbToHex'],
    ['rgb', 'hwbToRgb'],
    ['hsl', 'hwbToHsl']
]);
const convertersMap = new Map([
    ['hex', hexConvertersMap],
    ['rgb', rgbConvertersMap],
    ['hsl', hslConvertersMap],
    ['hwb', hwbConvertersMap]
]);

const validatorsMap = new Map([
    ['hex', 'isHex'],
    ['rgb', 'isRgb'],
    ['hsl', 'isHsl'],
    ['hwb', 'isHwb']
]);

const generatorsMap = new Map([
    ['hex', 'getRandomHex'],
    ['rgb', 'getRandomRgb'],
    ['hsl', 'getRandomHsl'],
    ['hwb', 'getRandomHwb']
]);

function getConverter(from, to) {
    const targetsMap = convertersMap.get(from);
    return targetsMap.get(to);
}

// -----------------------------------------------------------------------------
// testing returned values
// -----------------------------------------------------------------------------

describe('colorverter.*To*', () => {
    it('should return color array', () => {
        convertersMap.forEach((targetsMap, sourceName) => {
            targetsMap.forEach((convertName, targetName) => {
                const convert = colorverter[convertName].bind(colorverter);

                const generateName = generatorsMap.get(sourceName);
                const generate = colorverter[generateName].bind(colorverter);

                const newColor = convert(generate());
                expect(newColor instanceof Array).toBeTruthy();
            });
        });
    });
});

describe('colorverter.*To*', () => {
    it('should generate valid values', () => {
        convertersMap.forEach((targetsMap, sourceName) => {
            targetsMap.forEach((convertName, targetName) => {
                const convert = colorverter[convertName].bind(colorverter);

                const generateName = generatorsMap.get(sourceName);
                const generate = colorverter[generateName].bind(colorverter);

                const validateName = validatorsMap.get(targetName);
                const validate = colorverter[validateName].bind(colorverter);

                for (let i = 0; i < 999; i++) {
                    const newRandom = convert(generate());
                    const isValid = validate(newRandom);
                    expect(isValid).toBeTruthy();
                }
            });
        });
    });
});

// -----------------------------------------------------------------------------
// testing conversion
// -----------------------------------------------------------------------------

describe('colorverter.*To*', () => {
    it('should convert colors to expected value', () => {
        for (const testPair of testPairs) {
            const from = testPair[0];
            const fromVal = testPair[1];
            const to = testPair[2];
            const toVal = testPair[3];

            const convertName = getConverter(from, to);
            const convert = colorverter[convertName].bind(colorverter);
            const generated = convert(fromVal);

            const isSame = colorverter.isSameColor(generated, toVal);
            expect(isSame).toBeTruthy(
                `From ${from} to ${to}: expected ${toVal}, got ${generated}`
            );
        }
    });
});

describe('colorverter.hwbToRgb', () => {
    it('should convert to black for extreme blackness', () => {
        for (let angle = 0; angle <= 360; angle++) {
            const newColor = colorverter.hwbToRgb([angle, 0, 100]);
            const isSame = colorverter.isSameColor(newColor, [0, 0, 0]);
            expect(isSame).toBeTruthy();
        }
    });

    it('should convert to white for extreme whiteness', () => {
        for (let angle = 0; angle <= 360; angle++) {
            const newColor = colorverter.hwbToRgb([angle, 100, 0]);
            const isSame = colorverter.isSameColor(newColor, [255, 255, 255]);
            expect(isSame).toBeTruthy();
        }
    });

    it('should convert to gray for extreme both parameters', () => {
        for (let angle = 0; angle <= 360; angle++) {
            const newColor = colorverter.hwbToRgb([angle, 100, 100]);
            const isSame = colorverter.isSameColor(newColor, [128, 128, 128]);
            expect(isSame).toBeTruthy();
        }
    });
});
