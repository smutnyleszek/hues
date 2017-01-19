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
            _onSetSpacePropertyValue: HuesAppActions.SET_SPACE_PROPERTY_VALUE
        });
    }

    _buildInitialState() {
        this.currentSpaceName = initialSpaceName;

        // create all spaces objects
        this.spaces = new Map(spacesData);

        // apply initial color to all spaces
        this._applyColorValueToSpaces(initialSpaceName, initialSpaceValue);

        console.log('_buildInitialState', this);
    }

    _applyColorValueToSpaces(sourceSpaceName, sourceSpaceValue) {
        console.log('_applyColorValueToSpaces', sourceSpaceName, sourceSpaceValue);
        this.spaces.forEach((spaceData, spaceName) => {
            let newValue = sourceSpaceValue;
            if (spaceName !== sourceSpaceName) {
                newValue = colorverter.convert[sourceSpaceName].to[spaceName](sourceSpaceValue);
            }

            let propertyIndex = 0;
            spaceData.properties.forEach((propertyData) => {
                propertyData.value = newValue[propertyIndex];
                propertyIndex++;
            });
        });
    }

    _onSetSpacePropertyValue(data) {
        this.currentSpaceName = data.spaceName;

        const spaceData = this.spaces.get(data.spaceName);
        spaceData.properties.get(data.propertyName).value = data.newValue;

        const valueArray = [];
        spaceData.properties.forEach((propertyData, propertyName) => {
            valueArray.push(propertyData.value);
        });

        this._applyColorValueToSpaces(data.spaceName, valueArray);
    }
}

export default myAlt.createStore(HuesAppStore, 'HuesAppStore');
