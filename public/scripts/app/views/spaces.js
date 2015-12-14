app.SpacesView = Backbone.View.extend({
  el: 'div',
  template: _.template($('#space-template').html()),
  events: {
    'click button[js-space-button]': 'onButtonClick',
    'keypress input[js-space-input]': 'onInputKeypress'
  },
  initialize: function() {
    return this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    this.$input = this.$('input[js-space-input]');
    return this;
  },
  onButtonClick: function() {
    return console.log('button click');
  },
  onInputKeypress: function() {
    return console.log('key pressed');
  }
});
