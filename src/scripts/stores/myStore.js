import SomeActions from '../actions/myActions';
import myAlt from '../myAlt';

class ColorStore {
    constructor() {
        this.currentColor = null;
        this.bindListeners({
            handleCurrentColorChange: SomeActions.UPDATE_CURRENT_COLOR
        });
    }

    handleCurrentColorChange(currentColor) {
        this.currentColor = currentColor;
    }
}

export default myAlt.createStore(ColorStore, 'ColorStore');
