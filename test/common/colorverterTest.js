import colorverter from 'common/colorverter';

const spacesList = ['hex', 'rgb', 'hsl', 'hwb'];

// -----------------------------------------------------------------------------
// testing returned values
// -----------------------------------------------------------------------------

describe('colorverter.convert.*.to.*', () => {
    it('should only allow proper value input', () => {
        for (const spaceA of spacesList) {
            for (const spaceB of spacesList) {
                if (spaceA === spaceB) {
                    return;
                }
                const convert = colorverter.convert[spaceA].to[spaceB].bind(colorverter);

                let criminal = () => {convert('#fff');};
                expect(criminal).toThrow();

                criminal = () => {convert('red');};
                expect(criminal).toThrow();

                criminal = () => {convert(0, 0, 0);};
                expect(criminal).toThrow();

                criminal = () => {convert([0, 0, 0, 1]);};
                expect(criminal).toThrow();

                criminal = () => {convert([100, 100]);};
                expect(criminal).toThrow();
            }
        }
    });
});

describe('colorverter.convert.*.to.*', () => {
    it('should generate valid values', () => {
        for (const spaceA of spacesList) {
            for (const spaceB of spacesList) {
                if (spaceA === spaceB) {
                    return;
                }
                const convert = colorverter.convert[spaceA].to[spaceB].bind(colorverter);
                const generate = colorverter.getRandom[spaceA].bind(colorverter);
                const validate = colorverter.validate[spaceA].bind(colorverter);

                for (let i = 0; i < 999; i++) {
                    const newRandom = convert(generate());
                    const isValid = validate(newRandom);
                    expect(isValid).toBeTruthy();
                }
            }
        }
    });
});

// -----------------------------------------------------------------------------
// testing conversion
// -----------------------------------------------------------------------------

describe('colorverter.convert.*.to.*', () => {
    it('should convert colors to expected value', () => {
        const testPairs = [
            ['hex', ['00', '7f', 'ff'], 'rgb', [0, 127, 255]],
            ['hex', ['00', '7f', 'ff'], 'hsl', [210, 100, 50]],
            ['hex', ['00', '7f', 'ff'], 'hwb', [210, 0, 0]],
            ['hex', ['ab', 'cd', 'ef'], 'rgb', [171, 205, 239]],
            ['rgb', [0, 127, 255], 'hex', ['00', '7f', 'ff']],
            ['rgb', [0, 127, 255], 'hwb', [210, 0, 0]],
            ['hsl', [210, 100, 50], 'hex', ['00', '7f', 'ff']],
            ['hsl', [210, 100, 50], 'rgb', [0, 127, 255]],
            ['hsl', [210, 100, 50], 'hwb', [210, 0, 0]],
            ['hsl', [96, 48, 59], 'hwb', [96, 39, 21]],
            ['hwb', [210, 0, 0], 'hex', ['00', '80', 'ff']],
            ['hwb', [210, 0, 0], 'rgb', [0, 128, 255]],
            ['hwb', [210, 0, 0], 'hsl', [210, 100, 50]],
            ['hwb', [0, 0, 0], 'rgb', [255, 0, 0]],
            ['hwb', [0, 20, 40], 'rgb', [153, 51, 51]],
            ['hwb', [0, 40, 40], 'rgb', [153, 102, 102]],
            ['hwb', [0, 40, 20], 'rgb', [204, 102, 102]],
            ['hwb', [120, 0, 0], 'rgb', [0, 255, 0]],
            ['hwb', [120, 20, 40], 'rgb', [51, 153, 51]],
            ['hwb', [120, 40, 40], 'rgb', [102, 153, 102]],
            ['hwb', [120, 40, 20], 'rgb', [102, 204, 102]],
            ['hwb', [240, 0, 0], 'rgb', [0, 0, 255]],
            ['hwb', [240, 20, 40], 'rgb', [51, 51, 153]],
            ['hwb', [240, 40, 40], 'rgb', [102, 102, 153]],
            ['hwb', [240, 40, 20], 'rgb', [102, 102, 204]],
            // there are some RGB color variations
            // that can't be displayed with HSL:
            ['rgb', [0, 125, 255], 'hsl', [211, 100, 50]],
            ['rgb', [0, 126, 255], 'hsl', [210, 100, 50]],
            ['rgb', [0, 127, 255], 'hsl', [210, 100, 50]],
            ['rgb', [0, 128, 255], 'hsl', [210, 100, 50]],
            ['rgb', [0, 129, 255], 'hsl', [210, 100, 50]],
            ['rgb', [0, 130, 255], 'hsl', [209, 100, 50]]
        ];

        for (const testPair of testPairs) {
            const spaceA = testPair[0];
            const valA = testPair[1];
            const spaceB = testPair[2];
            const valB = testPair[3];

            const convert = colorverter.convert[spaceA].to[spaceB].bind(colorverter);
            const generated = convert(valA);

            const isSame = colorverter.isSameColor(generated, valB);
            expect(isSame).toBeTruthy(
                `From ${spaceA} to ${spaceB}: expected ${valB}, got ${generated}`
            );
        }
    });
});

describe('colorverter.convert.*.to.*', () => {
    it('should keep black black', () => {
        const black = {
            hex: ['00', '00', '00'],
            rgb: [0, 0, 0],
            hsl: [0, 0, 0],
            hwb: [0, 0, 100]
        };

        for (const spaceA of spacesList) {
            for (const spaceB of spacesList) {
                if (spaceA === spaceB) {
                    return;
                }
                const convert = colorverter.convert[spaceA].to[spaceB].bind(colorverter);
                const newColor = convert(black[sourceName]);
                const isSame = colorverter.isSameColor(
                    newColor,
                    black[targetName]
                );
                expect(isSame).toBeTruthy(
                    `expected ${black.targetName}, got ${newColor}`
                );
            }
        }
    });
});

describe('colorverter.convert.hwb.to.rgb', () => {
    it('should convert to black for extreme blackness', () => {
        for (let angle = 0; angle <= 360; angle++) {
            const newColor = colorverter.convert.hwb.to.rgb([angle, 0, 100]);
            const isSame = colorverter.isSameColor(newColor, [0, 0, 0]);
            expect(isSame).toBeTruthy();
        }
    });

    it('should convert to white for extreme whiteness', () => {
        for (let angle = 0; angle <= 360; angle++) {
            const newColor = colorverter.convert.hwb.to.rgb([angle, 100, 0]);
            const isSame = colorverter.isSameColor(newColor, [255, 255, 255]);
            expect(isSame).toBeTruthy();
        }
    });

    it('should convert to gray for extreme both parameters', () => {
        for (let angle = 0; angle <= 360; angle++) {
            const newColor = colorverter.convert.hwb.to.rgb([angle, 100, 100]);
            const isSame = colorverter.isSameColor(newColor, [128, 128, 128]);
            expect(isSame).toBeTruthy();
        }
    });
});

// -----------------------------------------------------------------------------
// testing random generators
// -----------------------------------------------------------------------------

describe('colorverter.getRandom.*', () => {
    it('should return proper HEX color', () => {
        for (let i = 0; i < 999; i++) {
            const newRandom = colorverter.getRandom.hex();
            const isValid = colorverter.validate.hex(newRandom);
            expect(isValid).toBeTruthy();
        }
    });

    it('should return proper RGB color', () => {
        for (let i = 0; i < 999; i++) {
            const newRandom = colorverter.getRandom.rgb();
            const isValid = colorverter.validate.rgb(newRandom);
            expect(isValid).toBeTruthy();
        }
    });

    it('should return proper HSL color', () => {
        for (let i = 0; i < 999; i++) {
            const newRandom = colorverter.getRandom.hsl();
            const isValid = colorverter.validate.hsl(newRandom);
            expect(isValid).toBeTruthy();
        }
    });

    it('should return proper HWB color', () => {
        for (let i = 0; i < 999; i++) {
            const newRandom = colorverter.getRandom.hwb();
            const isValid = colorverter.validate.hwb(newRandom);
            expect(isValid).toBeTruthy();
        }
    });
});

// -----------------------------------------------------------------------------
// testing validation
// -----------------------------------------------------------------------------

describe('colorverter.validate.hex', () => {
    it('should fail for invalid values', () => {
        expect(colorverter.validate.hex([0, 0, 0])).toBeFalsy();
        expect(colorverter.validate.hex(['zz', 'xx', 'yy'])).toBeFalsy();
        expect(colorverter.validate.hex(['ab', 'ab', 'a'])).toBeFalsy();
        expect(colorverter.validate.hex(['12', '34', '567'])).toBeFalsy();
    });
});

describe('colorverter.validate.rgb', () => {
    it('should fail for invalid values', () => {
        expect(colorverter.validate.rgb([0, 0, 256])).toBeFalsy();
        expect(colorverter.validate.rgb([0, 0, 125.5])).toBeFalsy();
    });
});

describe('colorverter.validate.hsl', () => {
    it('should fail for invalid values', () => {
        expect(colorverter.validate.hsl([900, 0, 0])).toBeFalsy();
        expect(colorverter.validate.hsl([125.5, 0, 0])).toBeFalsy();
        expect(colorverter.validate.hsl([360, 110, 0])).toBeFalsy();
        expect(colorverter.validate.hsl([360, 0, 110])).toBeFalsy();
        expect(colorverter.validate.hsl([-45, 0.5, 55.5])).toBeFalsy();
    });
});

describe('colorverter.validate.hwb', () => {
    it('should fail for invalid values', () => {
        expect(colorverter.validate.hwb([900, 0, 0])).toBeFalsy();
        expect(colorverter.validate.hwb([125.5, 0, 0])).toBeFalsy();
        expect(colorverter.validate.hwb([360, 110, 0])).toBeFalsy();
        expect(colorverter.validate.hwb([360, 0, 110])).toBeFalsy();
        expect(colorverter.validate.hwb([-45, 0.5, 55.5])).toBeFalsy();
    });
});

describe('colorverter.isSameColor', () => {
    it('should fail for invalid colors', () => {
        expect(colorverter.isSameColor('#fff', '#fff')).toBeFalsy();
    });

    it('should fail for different colors', () => {
        expect(colorverter.isSameColor([0, 0, 0], [0, 0, 1])).toBeFalsy();
    });
});
