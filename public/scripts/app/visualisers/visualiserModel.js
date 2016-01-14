app.Visualiser = Backbone.Model.extend({
  defaults: {
    color: null,
    name: null
  },
  initialize: function() {
    this._observedSpace = 'hwb';
    this._setColor();
    return app.eventer.bind(window.eventsData.spaces.colorChanged, this._onColorChanged.bind(this));
  },
  _onColorChanged: function() {
    return this._setColor();
  },
  _setColor: function() {
    var hwbSpace;
    hwbSpace = app.Spaces.find((function(_this) {
      return function(space) {
        return space.attributes.slug === _this._observedSpace;
      };
    })(this));
    switch (this.attributes.type) {
      case 'hue':
        console.log('hue');
        break;
      case 'current':
        console.log('current');
        break;
      case 'guessed':
        console.log('guessed');
        break;
      default:
        console.warn("unknown visualiser type: " + this.attributes.type);
    }
    return this.color = hwbSpace.attributes.color;
  },
  getCssColor: function() {
    var colorValue;
    if (typeof this.color !== 'string') {
      console.warn("wrong color value: " + this.color);
      colorValue = 'none';
    } else {
      colorValue = this.color;
    }
    return "background-color: " + colorValue;
  }
});
