app.Space = Backbone.Model.extend({
  defaults: {
    shortName: null,
    color: null,
    properties: []
  },
  initialize: function() {
    this._setShortNames();
    return this._setColor();
  },
  _refresh: function() {
    return this._setColor();
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
    property.value = value;
    console.info("" + name + " of " + this.attributes.slug + " set to " + value);
    return this._refresh();
  },
  getColor: function() {
    return this.attributes.color;
  },
  getPropertyRange: function(name) {
    var property;
    property = this._findProperty(name);
    return property.range;
  }
});
