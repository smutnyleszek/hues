app.SpacesView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#space-template').html()),
  events: {
    'click button[js-space-button]': 'onButtonClick',
    'blur input[js-space-property]': 'onInputBlur'
  },
  initialize: function() {
    this._propertyAttr = 'js-space-property';
    this._colorAttr = 'js-space-color';
    return this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    this.$colorInput = this.$("input[" + this._colorAttr + "]");
    return this;
  },
  onInputBlur: function(event) {
    var currentValue, propertyName, range, spaceName;
    propertyName = event.currentTarget.attributes[this._propertyAttr].value;
    currentValue = $(event.currentTarget).val();
    spaceName = this.model.attributes.slug;
    range = this.model.getPropertyRange(propertyName);
    if (this._isValueValid(currentValue, range[0], range[1])) {
      this.model.setProperty(propertyName, currentValue);
      return this.$colorInput.val(this.model.getColor());
    } else {
      return console.warn("invalid value for " + propertyName + " of " + spaceName);
    }
  },
  onButtonClick: function() {
    return console.log('button click');
  },
  _isValueValid: function(value, min, max) {
    var isInRange;
    isInRange = parseInt(value) >= min && parseInt(value) <= max;
    if (value.length > 0 && isInRange) {
      return true;
    } else {
      return false;
    }
  }
});
