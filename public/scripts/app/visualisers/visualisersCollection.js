var VisualisersCollection;

VisualisersCollection = Backbone.Collection.extend({
  model: app.Visualiser
});

app.Visualisers = new VisualisersCollection(window.visualisersData);
