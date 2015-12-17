app.Space = Backbone.Model.extend(

    defaults:
        color: ''
        properties: []

    _refresh: ->
        @_setColor()

    _findProperty: ( name ) ->
        for property in @attributes.properties
            if property.name is name
                return property
        throw new Error("nonexistent property #{name}")

    _setColor: ->
        newColor = @attributes.syntax

        for property in @attributes.properties

            syntaxName = "[#{property.name}]"
            value = property.value

            if property.type is 'hexadecimal'
                value = app.colorsHelper.toHex(value)

            newColor = newColor.replace(syntaxName, value)

        @attributes.color = newColor

        # TODO dispatch color changed

    setProperty: ( name, value ) ->
        property = @_findProperty(name)
        property.value = value
        console.info("#{name} of #{@attributes.slug} set to #{value}")
        @_refresh()

    getColor: -> return @attributes.color

    getPropertyRange: ( name ) ->
        property = @_findProperty(name)
        return property.range

)
