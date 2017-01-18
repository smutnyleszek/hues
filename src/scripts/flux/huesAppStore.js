import HuesAppActions from './huesAppActions';
import colorverter from '../helpers/colorverter';
import myAlt from './myAlt';
import spacesData from '../spaces/spacesData';

const initialSpaceName = 'rgb';
const initialSpaceValue = colorverter.getRandom[initialSpaceName]();

class HuesAppStore {
    constructor() {
        this._buildInitialState();
        this.bindListeners({
            _handleCurrentColorChange: HuesAppActions.UPDATE_CURRENT_COLOR
        });
    }

    _buildInitialState() {
        this.currentSpaceName = initialSpaceName;

        // create all spaces objects
        this.spaces = {};
        spacesData.forEach((spaceData, spaceName) => {
            this.spaces[spaceName] = spaceData;
            this.spaces[spaceName].value = null;
        });

        // apply initial color to all spaces
        this._applyColorValueToSpaces(initialSpaceName, initialSpaceValue);
    }

    _applyColorValueToSpaces(sourceSpaceName, sourceSpaceValue) {
        spacesData.forEach((spaceData, spaceName) => {
            if (spaceName === sourceSpaceName) {
                this.spaces[spaceName].value = sourceSpaceValue;
            } else {
                this.spaces[spaceName].value = colorverter.convert[sourceSpaceName].to[spaceName](sourceSpaceValue);
            }
        });
    }

    _handleCurrentColorChange(newColor) {
        this.currentSpaceName = newColor.name;
        this._applyColorValueToSpaces(newColor.name, newColor.value);
    }
}

export default myAlt.createStore(HuesAppStore, 'HuesAppStore');
