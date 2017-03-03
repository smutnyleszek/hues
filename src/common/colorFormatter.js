// -----------------------------------------------------------------------------
// colorFormatter -- returns a CSS string representation of given space
// -----------------------------------------------------------------------------

class ColorFormatter {
    get(spaceData) {
        let stringValue = '';
        spaceData.properties.forEach((propertyData) => {
            if (propertyData.before) {stringValue += propertyData.before;}
            stringValue += propertyData.value;
            if (propertyData.after) {stringValue += propertyData.after;}
        });
        return stringValue;
    }
}

export default new ColorFormatter();
