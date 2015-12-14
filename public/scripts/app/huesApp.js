(function() {
  var AppView, app;

  AppView = Backbone.View.extend({
    el: '#app',
    initialize: function() {
      return this.render();
    },
    render: function() {
      return this.$el.html("Huello world!");
    }
  });

  app = new AppView();

}).call(this);
