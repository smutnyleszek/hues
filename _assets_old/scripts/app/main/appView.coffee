app.AppView = Backbone.View.extend(

    el: '#js-app'

    initialize: ->
        @listenTo(app.Spaces, 'add', @addOneSpace)
        @listenTo(app.Spaces, 'reset', @addAllSpaces)
        @listenTo(app.Spaces, 'all', @render);
        @listenTo(app.Visualisers, 'add', @addOneVisualiser)
        @listenTo(app.Visualisers, 'reset', @addAllVisualisers)
        @listenTo(app.Visualisers, 'all', @render);

        @render()

    render: ->
        # clear loading message
        @$el.html('')

        @addAllSpaces()
        @addAllVisualisers()

    addAllSpaces: ->
        app.Spaces.each(@addOneSpace, this)

    addOneSpace: ( space ) ->
        instance = new app.SpacesView({ model: space })
        @$el.append( instance.render().el )

    addAllVisualisers: ->
        app.Visualisers.each(@addOneVisualiser, this)

    addOneVisualiser: ( visualiser ) ->
        instance = new app.VisualisersView({ model: visualiser })
        @$el.append( instance.render().el )

)
