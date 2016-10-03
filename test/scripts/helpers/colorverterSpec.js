import colorverter from 'helpers/colorverter';
import deepFreeze from 'helpers/deepFreeze';

const mocks = deepFreeze({
    validOne: {
        hex: ['00', '80', 'ff'],
        rgb: [0, 128, 255],
        hsl: [210, 100, 50],
        hwb: [210, 0, 0]
    },
    validTwo: {
        hex: ['00', '7f', 'ff'],
        rgb: [0, 127, 255],
        hsl: [210, 100, 50],
        hwb: [210, 0, 0]
    }
});

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

// -----------------------------------------------------------------------------
// testing returned values
// -----------------------------------------------------------------------------

describe('colorverter.*To*', () => {
    it('should return color array', () => {
        convertersMap.forEach((targetsMap, sourceName) => {
            targetsMap.forEach((convertName, targetName) => {
                const convert = colorverter[convertName].bind(colorverter);
                const newColor = convert(mocks.validOne[sourceName]);
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
        convertersMap.forEach((targetsMap, sourceName) => {
            targetsMap.forEach((convertName, targetName) => {
                const convert = colorverter[convertName].bind(colorverter);

                let generated = convert(mocks.validOne[sourceName]);
                let expected = mocks.validOne[targetName];
                let isSame = colorverter.isSameColor(generated, expected);
                expect(isSame).toBeTruthy(`${generated} is not ${expected}`);

                generated = convert(mocks.validTwo[sourceName]);
                expected = mocks.validTwo[targetName];
                isSame = colorverter.isSameColor(generated, expected);
                expect(isSame).toBeTruthy(`${generated} is not ${expected}`);
            });
        });
    });
});
