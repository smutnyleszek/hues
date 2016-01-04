app.SpacesView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#space-template').html()),
  events: {
    'click button[js-space-button]': '_onButtonClick',
    'blur input[js-space-property]': '_onInputBlur'
  },
  initialize: function() {
    this._propertyAttr = 'js-space-property';
    this._colorAttr = 'js-space-color';
    this._styleAttr = 'gui-c-space';
    this.listenTo(this.model, 'change', this.render);
    return app.eventer.bind(window.eventsData.spaces.colorConverted, this._onColorConverted.bind(this));
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    this.$el[0].setAttribute(this._styleAttr, '');
    this.$colorInput = this.$("input[" + this._colorAttr + "]");
    this.$propertyInput0 = $(this.$("input[" + this._propertyAttr + "]")[0]);
    this.$propertyInput1 = $(this.$("input[" + this._propertyAttr + "]")[1]);
    this.$propertyInput2 = $(this.$("input[" + this._propertyAttr + "]")[2]);
    this._setInputsAttributes();
    this._setInputsValues();
    return this;
  },
  _onColorConverted: function() {
    return this._setInputsValues();
  },
  _onInputBlur: function(event) {
    var currentValue, propertyName, range, spaceName;
    propertyName = event.currentTarget.attributes[this._propertyAttr].value;
    currentValue = $(event.currentTarget).val();
    spaceName = this.model.attributes.slug;
    range = this.model.getPropertyRange(propertyName);
    if (range === void 0) {
      this.model.setProperty(propertyName, currentValue);
      return this.$colorInput.val(this.model.getColor());
    } else if (this._isValueValid(currentValue, range[0], range[1])) {
      this.model.setProperty(propertyName, currentValue);
      return this.$colorInput.val(this.model.getColor());
    } else {
      return console.warn("invalid value for " + propertyName + " of " + spaceName);
    }
  },
  _onButtonClick: function() {
    var copying, error, value;
    this.$colorInput.select();
    try {
      value = this.$colorInput.val();
      copying = document.execCommand('copy');
      if (copying) {
        app.notifier.notify("copied color: " + value);
      } else {
        console.warn("unable to copy to clipboard");
      }
    } catch (_error) {
      error = _error;
      console.warn("unable to copy to clipboard: " + error);
    }
  },
  _isValueValid: function(value, min, max) {
    var isInRange;
    isInRange = parseInt(value) >= min && parseInt(value) <= max;
    if (value.length > 0 && isInRange) {
      return true;
    } else {
      return false;
    }
  },
  _setInputsValues: function() {
    this.$colorInput.val(this.model.getColor());
    this.$propertyInput0.val(this.model.attributes.properties[0].value);
    this.$propertyInput1.val(this.model.attributes.properties[1].value);
    return this.$propertyInput2.val(this.model.attributes.properties[2].value);
  },
  _setInputsAttributes: function() {
    var el, index, property, _i, _len, _ref, _results;
    _ref = this.model.attributes.properties;
    _results = [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      property = _ref[index];
      el = this["$propertyInput" + index][0];
      if (property.range !== void 0) {
        el.setAttribute('min', property.range[0]);
        el.setAttribute('max', property.range[1]);
      }
      if (property.maxlength !== void 0) {
        _results.push(el.setAttribute('maxlength', property.maxlength));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
});
