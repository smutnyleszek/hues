var SpacesCollection;

SpacesCollection = Backbone.Collection.extend({
  model: app.Space
});

app.Spaces = new SpacesCollection(window.spacesData);
