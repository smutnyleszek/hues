import clipboardier from 'common/clipboardier';

describe('clipboardier', () => {
    it('should copy text to clipboard', () => {
        const testText = 'Conan the Barbarian';
        expect(() => {clipboardier.copy(testText);}).not.toThrow();
    });
});
