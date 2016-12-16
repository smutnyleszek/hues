import CurrentColorActions from './currentColorActions';
import colorverter from '../helpers/colorverter';
import myAlt from './myAlt';

const defaultSpace = 'rgb';

class CurrentColorStore {
    constructor() {
        this.name = defaultSpace;
        this.value = colorverter.getRandom[defaultSpace]();

        this.bindListeners({
            _handleCurrentColorChange: CurrentColorActions.UPDATE_CURRENT_COLOR
        });
    }

    _handleCurrentColorChange(newColor) {
        this.name = newColor.name;
        this.value = newColor.value;
    }
}

export default myAlt.createStore(CurrentColorStore, 'CurrentColorStore');
