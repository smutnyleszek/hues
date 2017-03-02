import colorverter from '../common/colorverter';
import huesAppActions from './huesAppActions';
import myAlt from './myAlt';
import spacesData from '../spaces/spacesData';

const initialSpaceName = 'hsl';
const initialSpaceValue = colorverter.getRandom[initialSpaceName]();

class HuesAppStore {
    constructor() {
        this._buildInitialState();
        this.bindListeners({
            _onSetSpacePropertyValue: huesAppActions.SET_SPACE_PROPERTY_VALUE
        });
    }

    _buildInitialState() {
        // create all spaces objects
        this.spaces = new Map(spacesData);

        // apply initial value to spaces
        this._applyValuesToSpace(initialSpaceName, initialSpaceValue);
        this._applySpaceValueToOtherSpaces(initialSpaceName);
    }

    _applyValuesToSpace(targetSpaceName, valuesArray) {
        const targetSpaceData = this.spaces.get(targetSpaceName);

        let propertyIndex = 0;
        targetSpaceData.properties.forEach((propertyData) => {
            propertyData.value = valuesArray[propertyIndex];
            propertyIndex++;
        });
    }

    _applySpaceValueToOtherSpaces(sourceSpaceName) {
        const sourceValuesArray = [];
        const sourceSpaceData = this.spaces.get(sourceSpaceName);
        sourceSpaceData.properties.forEach((propertyData) => {
            sourceValuesArray.push(propertyData.value);
        });

        this.spaces.forEach((spaceData, spaceName) => {
            if (spaceName === sourceSpaceName) {
                return;
            }
            const newValuesArray = colorverter.convert[sourceSpaceName].to[spaceName](sourceValuesArray);
            this._applyValuesToSpace(spaceName, newValuesArray);
        });
    }

    _onSetSpacePropertyValue(data) {
        const spaceData = this.spaces.get(data.spaceName);
        spaceData.properties.get(data.propertyName).value = data.newValue;
        this._applySpaceValueToOtherSpaces(data.spaceName);
    }
}

export default myAlt.createStore(HuesAppStore, 'HuesAppStore');
