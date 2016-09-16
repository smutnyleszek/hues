import myAlt from '../myAlt';

class SomeActions {
    updateCurrentColor(color) {
        return color;
    }
}

export default myAlt.createActions(SomeActions);
