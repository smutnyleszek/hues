app.AppView = Backbone.View.extend({
  el: '#spaces',
  initialize: function() {
    this.listenTo(app.Spaces, 'add', this.addOne);
    this.listenTo(app.Spaces, 'reset', this.addAll);
    this.listenTo(app.Spaces, 'all', this.render);
    return this.render();
  },
  render: function() {
    this.$el.html('');
    return this.addAll();
  },
  addAll: function() {
    return app.Spaces.each(this.addOne, this);
  },
  addOne: function(space) {
    var instance;
    instance = new app.SpacesView({
      model: space
    });
    return this.$el.append(instance.render().el);
  }
});
