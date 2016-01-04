app.Space = Backbone.Model.extend({
  defaults: {
    color: null,
    properties: []
  },
  initialize: function() {
    this._setInputTypes();
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
    var conversionLabel, index, newColorArray, otherColorArray, otherSlug, property, thisSlug, _i, _len, _ref;
    thisSlug = this.attributes.slug;
    otherSlug = otherSpace.attributes.slug;
    otherColorArray = otherSpace.getColorArray();
    conversionLabel = "" + otherSlug + "2" + thisSlug;
    newColorArray = app.colorsHelper[conversionLabel](otherColorArray);
    newColorArray = app.colorsHelper.pacify(newColorArray);
    _ref = this.attributes.properties;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      property = _ref[index];
      property.value = newColorArray[index];
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
    var after, before, newColor, property, value, _i, _len, _ref;
    newColor = '';
    _ref = this.attributes.properties;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      value = property.value;
      before = property.syntaxBefore || '';
      after = property.syntaxAfter || '';
      newColor += "" + before + value + after;
    }
    return this.attributes.color = newColor;
  },
  _setInputTypes: function() {
    var property, _i, _len, _ref, _results;
    _ref = this.attributes.properties;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      switch (property.type) {
        case 'integer':
        case 'radious':
        case 'percentage':
          _results.push(property.inputType = 'number');
          break;
        default:
          _results.push(property.inputType = 'text');
      }
    }
    return _results;
  },
  setProperty: function(name, value) {
    var property;
    property = this._findProperty(name);
    switch (property.type) {
      case 'integer':
      case 'radious':
      case 'percentage':
        property.value = Number(value);
        break;
      default:
        property.value = value;
    }
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
      colorArray.push(property.value);
    }
    return colorArray;
  },
  getPropertyRange: function(name) {
    var property;
    property = this._findProperty(name);
    return property.range;
  }
});
