app.Visualiser = Backbone.Model.extend(

    defaults:
        color: null
        name: null

    initialize: ->
        @_observedSpace = 'hwb'

        @_setColor()

        app.eventer.bind(
            window.eventsData.spaces.colorChanged,
            @_onColorChanged.bind(@)
        )

    _onColorChanged: -> @_setColor()

    _setColor: ->
        hwbSpace = app.Spaces.find( ( space ) =>
            space.attributes.slug is @_observedSpace
        )

        switch @attributes.type
            when 'hue'
                console.log('hue')
            when 'current'
                console.log('current')
            when 'guessed'
                console.log('guessed')
            else
                console.warn("unknown visualiser type: #{@attributes.type}")

        @color = hwbSpace.attributes.color

    getCssColor: ->
        if typeof @color isnt 'string'
            console.warn("wrong color value: #{@color}")
            colorValue = 'none'
        else
            colorValue = @color

        return "background-color: #{colorValue}"

)
