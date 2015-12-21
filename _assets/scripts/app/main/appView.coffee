app.AppView = Backbone.View.extend(

    el: '#spaces'

    initialize: ->
        @listenTo( app.Spaces, 'add', @addOne)
        @listenTo( app.Spaces, 'reset', @addAll)
        @listenTo(app.Spaces, 'all', @render);

        @render()

    render: ->
        # clear loading message
        @$el.html('')

        @addAll()

    addAll: ->
        app.Spaces.each(@addOne, this)

    addOne: ( space ) ->
        instance = new app.SpacesView({ model: space })
        @$el.append( instance.render().el )

)
