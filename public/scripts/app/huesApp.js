var Space, SpacesView, spaces, testSpace;

Space = Backbone.Model.extend({
  defaults: {
    label: 'foo bar:',
    slug: 'dupa'
  }
});

testSpace = new Space({
  slug: 'test1'
});

SpacesView = Backbone.View.extend({
  el: '#spaces',
  template: _.template($('#space-template').html()),
  events: {
    'click button[js-space-button]': 'onButtonClick',
    'keypress input[js-space-input]': 'onKeypress'
  },
  initialize: function() {
    this.$el = $(this.el);
    return this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    this.input = this.$('input[js-space-input]');
    return this;
  },
  onButtonClick: function() {
    return console.log('button click');
  },
  onKeypress: function() {
    return console.log('key pressed');
  }
});

spaces = new SpacesView({
  model: testSpace
});
