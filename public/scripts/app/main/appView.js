app.AppView = Backbone.View.extend({
  el: '#js-app',
  initialize: function() {
    this.listenTo(app.Spaces, 'add', this.addOneSpace);
    this.listenTo(app.Spaces, 'reset', this.addAllSpaces);
    this.listenTo(app.Spaces, 'all', this.render);
    this.listenTo(app.Visualisers, 'add', this.addOneVisualiser);
    this.listenTo(app.Visualisers, 'reset', this.addAllVisualisers);
    this.listenTo(app.Visualisers, 'all', this.render);
    return this.render();
  },
  render: function() {
    this.$el.html('');
    this.addAllSpaces();
    return this.addAllVisualisers();
  },
  addAllSpaces: function() {
    return app.Spaces.each(this.addOneSpace, this);
  },
  addOneSpace: function(space) {
    var instance;
    instance = new app.SpacesView({
      model: space
    });
    return this.$el.append(instance.render().el);
  },
  addAllVisualisers: function() {
    return app.Visualisers.each(this.addOneVisualiser, this);
  },
  addOneVisualiser: function(visualiser) {
    var instance;
    instance = new app.VisualisersView({
      model: visualiser
    });
    return this.$el.append(instance.render().el);
  }
});
