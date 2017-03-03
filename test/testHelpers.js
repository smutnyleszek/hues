class TestHelpers {
    getClassName(ClassConstructor) {
        if (typeof ClassConstructor === 'undefined') {
            return null;
        }
        const instance = new ClassConstructor();
        return instance.constructor.name;
    }
}

export default new TestHelpers();
