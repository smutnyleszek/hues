import colorverter from 'helpers/colorverter';

const mocks = Object.freeze({
    colorOne: Object.freeze({
        hexValue: ['00', '80', 'ff'],
        rgbValue: [0, 128, 255]
    })
});

describe('colorverter.hex2rgb', () => {
    it('should return an array', () => {
        const newValue = colorverter.hex2rgb(mocks.colorOne.hexValue);
        expect(newValue instanceof Array).toBeTruthy();
    });

    it('should convert values properly', () => {
        const newValue = colorverter.hex2rgb(mocks.colorOne.hexValue);
        expect(newValue[0]).toBe(mocks.colorOne.rgbValue[0]);
        expect(newValue[1]).toBe(mocks.colorOne.rgbValue[1]);
        expect(newValue[2]).toBe(mocks.colorOne.rgbValue[2]);
    });
});
