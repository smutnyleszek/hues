import colorverter from 'helpers/colorverter';

const mocks = Object.freeze({
    valid: Object.freeze({
        hex: ['00', '80', 'ff'],
        rgb: [0, 128, 255],
        hsl: [210, 100, 50],
        hwb: [210, 0, 0]
    })
});

// -----------------------------------------------------------------------------
// testing returned values
// -----------------------------------------------------------------------------

describe('colorverter *2hex', () => {
    it('should return hex color array', () => {
        const rgbToHexValue = colorverter.rgbToHex(mocks.valid.rgb);
        const hslToHexValue = colorverter.hslToHex(mocks.valid.hsl);
        const hwbToHexValue = colorverter.hwbToHex(mocks.valid.hwb);
        expect(rgbToHexValue instanceof Array).toBeTruthy();
        expect(hslToHexValue instanceof Array).toBeTruthy();
        expect(hwbToHexValue instanceof Array).toBeTruthy();
    });
});

describe('colorverter *2rgb', () => {
    it('should return rgb color array', () => {
        const hexToRgbValue = colorverter.hexToRgb(mocks.valid.hex);
        const hslToRgbValue = colorverter.hslToRgb(mocks.valid.hsl);
        const hwbToRgbValue = colorverter.hwbToRgb(mocks.valid.hwb);
        expect(hexToRgbValue instanceof Array).toBeTruthy();
        expect(hslToRgbValue instanceof Array).toBeTruthy();
        expect(hwbToRgbValue instanceof Array).toBeTruthy();
    });
});

describe('colorverter *2hsl', () => {
    it('should return hsl color array', () => {
        const hexToHslValue = colorverter.hexToHsl(mocks.valid.hex);
        const rgbToHslValue = colorverter.rgbToHsl(mocks.valid.rgb);
        const hwbToHslValue = colorverter.hwbToHsl(mocks.valid.hwb);
        expect(hexToHslValue instanceof Array).toBeTruthy();
        expect(rgbToHslValue instanceof Array).toBeTruthy();
        expect(hwbToHslValue instanceof Array).toBeTruthy();
    });
});

describe('colorverter *2hwb', () => {
    it('should return hwb color array', () => {
        const hexToHwbValue = colorverter.hexToHwb(mocks.valid.hex);
        const rgbToHwbValue = colorverter.rgbToHwb(mocks.valid.rgb);
        const hslToHwbValue = colorverter.hslToHwb(mocks.valid.hsl);
        expect(hexToHwbValue instanceof Array).toBeTruthy();
        expect(rgbToHwbValue instanceof Array).toBeTruthy();
        expect(hslToHwbValue instanceof Array).toBeTruthy();
    });
});

// -----------------------------------------------------------------------------
// testing conversion from hex
// -----------------------------------------------------------------------------

describe('colorverter.hexToRgb', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hexToRgb(mocks.valid.hex);
        expect(newValue[0]).toBe(mocks.valid.rgb[0]);
        expect(newValue[1]).toBe(mocks.valid.rgb[1]);
        expect(newValue[2]).toBe(mocks.valid.rgb[2]);
    });
});

describe('colorverter.hexToHsl', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hexToHsl(mocks.valid.hex);
        expect(newValue[0]).toBe(mocks.valid.hsl[0]);
        expect(newValue[1]).toBe(mocks.valid.hsl[1]);
        expect(newValue[2]).toBe(mocks.valid.hsl[2]);
    });
});

describe('colorverter.hexToHwb', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hexToHwb(mocks.valid.hex);
        expect(newValue[0]).toBe(mocks.valid.hwb[0]);
        expect(newValue[1]).toBe(mocks.valid.hwb[1]);
        expect(newValue[2]).toBe(mocks.valid.hwb[2]);
    });
});

// -----------------------------------------------------------------------------
// testing conversion from rgb
// -----------------------------------------------------------------------------

describe('colorverter.rgbToHex', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.rgbToHex(mocks.valid.rgb);
        expect(newValue[0]).toBe(mocks.valid.hex[0]);
        expect(newValue[1]).toBe(mocks.valid.hex[1]);
        expect(newValue[2]).toBe(mocks.valid.hex[2]);
    });
});

describe('colorverter.rgbToHsl', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.rgbToHsl(mocks.valid.rgb);
        expect(newValue[0]).toBe(mocks.valid.hsl[0]);
        expect(newValue[1]).toBe(mocks.valid.hsl[1]);
        expect(newValue[2]).toBe(mocks.valid.hsl[2]);
    });
});

describe('colorverter.rgbToHwb', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.rgbToHwb(mocks.valid.rgb);
        expect(newValue[0]).toBe(mocks.valid.hwb[0]);
        expect(newValue[1]).toBe(mocks.valid.hwb[1]);
        expect(newValue[2]).toBe(mocks.valid.hwb[2]);
    });
});

// -----------------------------------------------------------------------------
// testing conversion from hsl
// -----------------------------------------------------------------------------

describe('colorverter.hslToHex', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hslToHex(mocks.valid.hsl);
        expect(newValue[0]).toBe(mocks.valid.hex[0]);
        expect(newValue[1]).toBe(mocks.valid.hex[1]);
        expect(newValue[2]).toBe(mocks.valid.hex[2]);
    });
});

describe('colorverter.hslToRgb', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hslToRgb(mocks.valid.hsl);
        expect(newValue[0]).toBe(mocks.valid.rgb[0]);
        expect(newValue[1]).toBe(mocks.valid.rgb[1]);
        expect(newValue[2]).toBe(mocks.valid.rgb[2]);
    });
});

describe('colorverter.hslToHwb', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hslToHwb(mocks.valid.hsl);
        expect(newValue[0]).toBe(mocks.valid.hwb[0]);
        expect(newValue[1]).toBe(mocks.valid.hwb[1]);
        expect(newValue[2]).toBe(mocks.valid.hwb[2]);
    });
});

// -----------------------------------------------------------------------------
// testing conversion from hwb
// -----------------------------------------------------------------------------

describe('colorverter.hwbToHex', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hwbToHex(mocks.valid.hwb);
        expect(newValue[0]).toBe(mocks.valid.hex[0]);
        expect(newValue[1]).toBe(mocks.valid.hex[1]);
        expect(newValue[2]).toBe(mocks.valid.hex[2]);
    });
});

describe('colorverter.hwbToRgb', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hwbToRgb(mocks.valid.hwb);
        expect(newValue[0]).toBe(mocks.valid.rgb[0]);
        expect(newValue[1]).toBe(mocks.valid.rgb[1]);
        expect(newValue[2]).toBe(mocks.valid.rgb[2]);
    });
});

describe('colorverter.hwbToHsl', () => {
    it('should convert values properly', () => {
        const newValue = colorverter.hwbToHsl(mocks.valid.hwb);
        expect(newValue[0]).toBe(mocks.valid.hsl[0]);
        expect(newValue[1]).toBe(mocks.valid.hsl[1]);
        expect(newValue[2]).toBe(mocks.valid.hsl[2]);
    });
});
