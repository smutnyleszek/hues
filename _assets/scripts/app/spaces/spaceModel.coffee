app.Space = Backbone.Model.extend(

    defaults:
        shortName: null
        color: null
        properties: []

    initialize: ->
        @_setShortNames()
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
            newValue = null
            switch property.type
                when 'hexadecimal'
                    newValue = app.colorsHelper.fromHex(newColorArray[index])
                when 'integer', 'radious', 'percentage'
                    newValue = newColorArray[index]
            property.value = newValue

        @_setColor()
        app.eventer.trigger( window.eventsData.spaces.colorConverted, @ )

    _findProperty: ( name ) ->
        for property in @attributes.properties
            if property.name is name
                return property
        throw new Error("nonexistent property #{name}")

    _setColor: ->
        newColor = ''

        for property in @attributes.properties

            value = property.value
            if property.type is 'hexadecimal'
                value = app.colorsHelper.toHex(value)

            before = property.syntaxBefore or ''
            after = property.syntaxAfter or ''

            newColor += "#{before}#{value}#{after}"

        @attributes.color = newColor

    _setShortNames: ->
        for property in @attributes.properties
            property.shortName = property.name[0]

    setProperty: ( name, value ) ->
        property = @_findProperty(name)
        property.value = Number(value)
        @_refresh()

    getColor: -> return @attributes.color

    getColorArray: ->
        colorArray = []
        for property in @attributes.properties
            switch property.type
                when 'hexadecimal'
                    colorArray.push(app.colorsHelper.toHex(property.value))
                when 'integer', 'radious', 'percentage'
                    colorArray.push(property.value)
        return colorArray

    getPropertyRange: ( name ) ->
        property = @_findProperty(name)
        return property.range

)
