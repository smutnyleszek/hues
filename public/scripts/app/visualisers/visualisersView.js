app.VisualisersView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#visualiser-template').html()),
  initialize: function() {
    this._colorAttr = 'js-visualiser-color';
    this._styleAttr = 'gui-c-visualiser';
    this.listenTo(this.model, 'change', this.render);
    return app.eventer.bind(window.eventsData.spaces.colorChanged, this._onColorChanged.bind(this));
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    this.$el[0].setAttribute(this._styleAttr, this.model.type);
    this.$colorElement = this.$("[" + this._colorAttr + "]");
    this._setColor();
    return this;
  },
  _onColorChanged: function() {
    return this._setColor();
  },
  _setColor: function() {
    return this.$colorElement[0].setAttribute('style', this.model.getCssColor());
  }
});
