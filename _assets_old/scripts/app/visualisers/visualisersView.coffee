app.VisualisersView = Backbone.View.extend(

    tagName: 'div'
    template: _.template( $('#visualiser-template').html() )

    initialize: ->
        @_colorAttr = 'js-visualiser-color'
        @_styleAttr = 'gui-c-visualiser'

        @listenTo(@model, 'change', @render)
        app.eventer.bind(
            window.eventsData.spaces.colorChanged,
            @_onColorChanged.bind(@)
        )

    render: ->
        @$el.html(@template( @model.attributes ))

        @$el[0].setAttribute(@_styleAttr, @model.type)

        @$colorElement = @$("[#{@_colorAttr}]")

        @_setColor()

        return @

    _onColorChanged: -> @_setColor()

    _setColor: ->
        @$colorElement[0].setAttribute('style', @model.getCssColor())

)
