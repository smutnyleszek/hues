import ReactTestRenderer from 'react-test-renderer';
import SpacesList from 'spaces/SpacesList';

describe('SpacesList', () => {
    it('should contain four spaces', () => {
        const result = ReactTestRenderer.create(SpacesList);

        expect(result.children).toBeDefined();
    });
});
