import huesAppActions from 'flux/huesAppActions';
import huesAppStore from 'flux/huesAppStore';

describe('huesAppStore', () => {
    it('should have initial state set', () => {
        expect(huesAppStore.state.spaces).toBeDefined();
    });

    it('should apply value to other space on setting space property', () => {
        // we test with HWB vs HSL, as hue is the same for both
        const hwbHueSetBefore = 67;
        huesAppActions.setSpacePropertyValue({
            spaceName: 'hwb',
            propertyName: 'hue',
            newValue: hwbHueSetBefore
        });
        const hslBefore = huesAppStore.state.spaces.get('hsl');
        const hslHueBefore = hslBefore.properties.get('hue').value;

        const hwbHueSetAfter = 194;
        huesAppActions.setSpacePropertyValue({
            spaceName: 'hwb',
            propertyName: 'hue',
            newValue: hwbHueSetAfter
        });
        const hslAfter = huesAppStore.state.spaces.get('hsl');
        const hslHueAfter = hslAfter.properties.get('hue').value;

        expect(hslHueBefore).toBe(hwbHueSetBefore);
        expect(hslHueAfter).toBe(hwbHueSetAfter);
    });
});
