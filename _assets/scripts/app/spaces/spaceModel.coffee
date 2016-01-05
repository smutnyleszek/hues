app.Space = Backbone.Model.extend(

    defaults:
        color: null
        properties: []

    initialize: ->
        @_setInputTypes()
        @_setColor()

        app.eventer.bind(
            window.eventsData.spaces.colorChanged,
            @_onColorChanged.bind(@)
        )

    _refresh: ->
        @_setColor()
        app.eventer.trigger( window.eventsData.spaces.colorChanged, @ )

    _onColorChanged: ( changedSpace ) ->
        return if changedSpace.attributes.slug is @attributes.slug
        @_convertFrom( changedSpace )

    _convertFrom: ( otherSpace ) ->
        thisSlug = @attributes.slug
        otherSlug = otherSpace.attributes.slug
        otherColorArray = otherSpace.getColorArray()

        # convert from other color to this one
        conversionLabel = "#{otherSlug}2#{thisSlug}"
        newColorArray = app.colorsHelper[conversionLabel](otherColorArray)
        newColorArray = app.colorsHelper.pacify(newColorArray)

        for property, index in @attributes.properties
            property.value = newColorArray[index]

        @_setColor()
        app.eventer.trigger( window.eventsData.spaces.colorConverted, @ )

    findProperty: ( name ) ->
        for property in @attributes.properties
            if property.name is name
                return property
        throw new Error("nonexistent property #{name}")

    _setColor: ->
        newColor = ''

        for property in @attributes.properties

            value = property.value
            before = property.syntaxBefore or ''
            after = property.syntaxAfter or ''

            newColor += "#{before}#{value}#{after}"

        @attributes.color = newColor

    _setInputTypes: ->
        for property in @attributes.properties
            switch property.type
                when 'integer', 'radious', 'percentage'
                    property.inputType = 'number'
                else
                    property.inputType = 'text'

    setProperty: ( name, value ) ->
        property = @findProperty(name)

        switch property.type
            when 'integer', 'radious', 'percentage'
                property.value = Number(value)
            else
                property.value = value

        @_refresh()

    getColor: -> return @attributes.color

    getColorArray: ->
        colorArray = []
        for property in @attributes.properties
            colorArray.push(property.value)
        return colorArray

)
