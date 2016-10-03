import deepFreeze from 'helpers/deepFreeze';

describe('deepFreeze', () => {
    it('should froze all nested object\'s properties', () => {
        const sampleObj = deepFreeze({
            a: {
                b: {
                    c: 'hi!'
                }
            }
        });
        expect(Object.isFrozen(sampleObj.a)).toBe(true);
        expect(Object.isFrozen(sampleObj.a.b)).toBe(true);
        expect(Object.isFrozen(sampleObj.a.b.c)).toBe(true);
    });
});
