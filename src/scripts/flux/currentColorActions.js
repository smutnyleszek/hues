import myAlt from './myAlt';

class CurrentColorActions {
    updateCurrentColor(color) {
        return color;
    }
}

export default myAlt.createActions(CurrentColorActions);
