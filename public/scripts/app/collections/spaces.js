var SpacesCollection, defaultSpaces, properties, slug, _ref;

SpacesCollection = Backbone.Collection.extend({
  model: app.Space
});

defaultSpaces = [];

_ref = app.spacesData;
for (slug in _ref) {
  properties = _ref[slug];
  defaultSpaces.push(new app.Space({
    slug: slug,
    label: properties.label,
    color: properties.color
  }));
}

app.Spaces = new SpacesCollection(defaultSpaces);
