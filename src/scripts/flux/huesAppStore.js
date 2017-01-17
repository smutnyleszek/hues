import HuesAppActions from './huesAppActions';
import colorverter from '../helpers/colorverter';
import myAlt from './myAlt';
import spacesData from '../spaces/spacesData';

const defaultSpace = 'rgb';

class HuesAppStore {
    constructor() {
        this.name = defaultSpace;
        this.value = colorverter.getRandom[defaultSpace]();

        // TODO check if keep current space name?
        // TODO loop over spacesData map, keep all spaces values here

        this.bindListeners({
            _handleCurrentColorChange: HuesAppActions.UPDATE_CURRENT_COLOR
        });
    }

    _handleCurrentColorChange(newColor) {
        // TODO update all color spaces
        this.name = newColor.name;
        this.value = newColor.value;
    }
}

export default myAlt.createStore(HuesAppStore, 'HuesAppStore');
