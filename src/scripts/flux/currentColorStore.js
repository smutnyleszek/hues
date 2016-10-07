import CurrentColorActions from './currentColorActions';
import myAlt from 'myAlt';

class CurrentColorStore {
    constructor() {
        this.spaceId = null;
        this.colorValue = null;

        this.bindListeners({
            handleCurrentColorChange: CurrentColorActions.UPDATE_CURRENT_COLOR
        });
    }

    handleCurrentColorChange(newColor) {
        this.spaceId = newColor.spaceId;
        this.colorValue = newColor.value;
    }
}

export default myAlt.createStore(CurrentColorStore, 'CurrentColorStore');
