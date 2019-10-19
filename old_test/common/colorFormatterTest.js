import colorFormatter from 'common/colorFormatter';
import huesAppActions from 'flux/huesAppActions';
import huesAppStore from 'flux/huesAppStore';

const testHslColor = {
    hue: 340,
    saturation: 90,
    lightness: 50
};
const testHslString = 'hsl(340, 90%, 50%)';

describe('colorFormatter', () => {
    beforeEach(() => {
        // define each property of HSL space to get rid of random value
        huesAppActions.setSpacePropertyValue({
            spaceName: 'hsl',
            propertyName: 'hue',
            newValue: testHslColor.hue
        });
        huesAppActions.setSpacePropertyValue({
            spaceName: 'hsl',
            propertyName: 'saturation',
            newValue: testHslColor.saturation
        });
        huesAppActions.setSpacePropertyValue({
            spaceName: 'hsl',
            propertyName: 'lightness',
            newValue: testHslColor.lightness
        });
    });

    it('should return a pretty string', () => {
        const hslSpaceData = huesAppStore.state.spaces.get('hsl');
        expect(colorFormatter.get(hslSpaceData)).toBe(testHslString);
    });
});
