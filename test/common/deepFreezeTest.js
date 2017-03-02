import deepFreeze from 'common/deepFreeze';

describe('deepFreeze', () => {
    it('should freeze all nested object\'s properties', () => {
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

    it('should freeze Map properly', () => {
        const sampleMap = deepFreeze(new Map([
            ['myFavActivity', 'chimney snuffer']
        ]));

        const criminalSet = () => {
            sampleMap.set('anotherThing', 'yes!');
        };
        expect(criminalSet).toThrow();

        const criminalDelete = () => {
            sampleMap.delete('myFavActivity');
        };
        expect(criminalDelete).toThrow();

        const criminalClear = () => {
            sampleMap.clear();
        };
        expect(criminalClear).toThrow();
    });

    it('should freeze Set properly', () => {
        const sampleSet = deepFreeze(new Set(['pen0r', 'va-jj']));

        const criminalAdd = () => {
            sampleSet.add('anotherThing');
        };
        expect(criminalAdd).toThrow();

        const criminalDelete = () => {
            sampleSet.delete('pen0r');
        };
        expect(criminalDelete).toThrow();

        const criminalClear = () => {
            sampleSet.clear();
        };
        expect(criminalClear).toThrow();
    });
});
