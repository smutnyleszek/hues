import CurrentColorActions from './currentColorActions';
import colorverter from '../helpers/colorverter';
import myAlt from './myAlt';

class CurrentColorStore {
    constructor() {
        this.name = 'rgb';
        this.value = colorverter.getRandomRgb();

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
