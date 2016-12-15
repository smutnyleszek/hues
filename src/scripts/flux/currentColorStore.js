import CurrentColorActions from './currentColorActions';
import myAlt from './myAlt';

class CurrentColorStore {
    constructor() {
        this.spaceName = null;
        this.colorValue = null;

        this.bindListeners({
            _handleCurrentColorChange: CurrentColorActions.UPDATE_CURRENT_COLOR
        });
    }

    _handleCurrentColorChange(newColor) {
        this.spaceName = newColor.name;
        this.colorValue = newColor.value;
    }
}

export default myAlt.createStore(CurrentColorStore, 'CurrentColorStore');
