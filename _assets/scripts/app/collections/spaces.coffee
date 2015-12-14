SpacesCollection = Backbone.Collection.extend(

    model: app.Space

)

defaultSpaces = []

for slug, properties of app.spacesData
    defaultSpaces.push( new app.Space({
        slug: slug
        label: properties.label
        color: properties.color
    }) )

app.Spaces = new SpacesCollection(defaultSpaces)
