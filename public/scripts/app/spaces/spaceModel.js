app.Space = Backbone.Model.extend({
  defaults: {
    shortName: null,
    color: null,
    properties: []
  },
  initialize: function() {
    this._setShortNames();
    this._setColor();
    return app.eventer.bind(window.eventsData.spaces.colorChanged, this._onColorChanged.bind(this));
  },
  _refresh: function() {
    this._setColor();
    return app.eventer.trigger(window.eventsData.spaces.colorChanged, this);
  },
  _onColorChanged: function(changedSpace) {
    if (changedSpace.attributes.slug === this.attributes.slug) {
      return;
    }
    return this._convertFrom(changedSpace);
  },
  _convertFrom: function(otherSpace) {
    var conversionLabel, index, newColorArray, newValue, otherColorArray, otherSlug, property, thisSlug, _i, _len, _ref;
    thisSlug = this.attributes.slug;
    otherSlug = otherSpace.attributes.slug;
    otherColorArray = otherSpace.getColorArray();
    conversionLabel = "" + otherSlug + "2" + thisSlug;
    newColorArray = app.colorsHelper[conversionLabel](otherColorArray);
    newColorArray = app.colorsHelper.pacify(newColorArray);
    _ref = this.attributes.properties;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      property = _ref[index];
      newValue = null;
      switch (property.type) {
        case 'hexadecimal':
          newValue = app.colorsHelper.fromHex(newColorArray[index]);
          break;
        case 'integer':
        case 'radious':
        case 'percentage':
          newValue = newColorArray[index];
      }
      property.value = newValue;
    }
    this._setColor();
    return app.eventer.trigger(window.eventsData.spaces.colorConverted, this);
  },
  _findProperty: function(name) {
    var property, _i, _len, _ref;
    _ref = this.attributes.properties;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      if (property.name === name) {
        return property;
      }
    }
    throw new Error("nonexistent property " + name);
  },
  _setColor: function() {
    var newColor, property, syntaxName, value, _i, _len, _ref;
    newColor = this.attributes.syntax;
    _ref = this.attributes.properties;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      syntaxName = "[" + property.name + "]";
      value = property.value;
      if (property.type === 'hexadecimal') {
        value = app.colorsHelper.toHex(value);
      }
      newColor = newColor.replace(syntaxName, value);
    }
    return this.attributes.color = newColor;
  },
  _setShortNames: function() {
    var property, _i, _len, _ref, _results;
    _ref = this.attributes.properties;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      _results.push(property.shortName = property.name[0]);
    }
    return _results;
  },
  setProperty: function(name, value) {
    var property;
    property = this._findProperty(name);
    property.value = Number(value);
    return this._refresh();
  },
  getColor: function() {
    return this.attributes.color;
  },
  getColorArray: function() {
    var colorArray, property, _i, _len, _ref;
    colorArray = [];
    _ref = this.attributes.properties;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      switch (property.type) {
        case 'hexadecimal':
          colorArray.push(app.colorsHelper.toHex(property.value));
          break;
        case 'integer':
        case 'radious':
        case 'percentage':
          colorArray.push(property.value);
      }
    }
    return colorArray;
  },
  getPropertyRange: function(name) {
    var property;
    property = this._findProperty(name);
    return property.range;
  }
});
