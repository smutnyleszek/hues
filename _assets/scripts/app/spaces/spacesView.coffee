app.SpacesView = Backbone.View.extend(

    tagName: 'div'
    template: _.template( $('#space-template').html() )

    events:
        'click button[js-space-button]': '_onButtonClick'
        'blur input[js-space-property]': '_onInputBlur'

    initialize: ->
        @_propertyAttr = 'js-space-property'
        @_colorAttr = 'js-space-color'
        @_styleAttr = 'gui-c-space'

        @listenTo(@model, 'change', @render)
        app.eventer.bind(
            window.eventsData.spaces.colorConverted,
            @_onColorConverted.bind(@)
        )

    render: ->
        @$el.html(@template( @model.attributes ))

        @$el[0].setAttribute(@_styleAttr, '')

        @$colorInput = @$("input[#{@_colorAttr}]")
        @$propertyInput0 = $(@$("input[#{@_propertyAttr}]")[0])
        @$propertyInput1 = $(@$("input[#{@_propertyAttr}]")[1])
        @$propertyInput2 = $(@$("input[#{@_propertyAttr}]")[2])

        @_setInputsAttributes()
        @_setInputsValues()

        return @

    _onColorConverted: -> @_setInputsValues()

    _onInputBlur: ( event ) ->
        # get property name and value
        propertyName = event.currentTarget.attributes[@_propertyAttr].value
        currentValue = $(event.currentTarget).val()

        # get current space and property range
        spaceName = @model.attributes.slug
        property = @model.findProperty(propertyName)

        # validate property value and save it with syntax in color input
        switch property.type
            when 'hexadecimal'
                if app.colorsHelper.isHex(currentValue)
                    @model.setProperty(propertyName, currentValue)
                    @$colorInput.val(@model.getColor())
                    return
            else
                min = null
                max = null
                if property.range isnt undefined
                    min = property.range[0]
                    max = property.range[1]
                if @_isValueInRange(currentValue, min, max)
                    @model.setProperty(propertyName, currentValue)
                    @$colorInput.val(@model.getColor())
                    return

        console.warn("invalid value for #{spaceName} #{propertyName}:
        #{currentValue}")

    _onButtonClick: ->
        # select input and execute copy command on it
        @$colorInput.select()
        try
            value = @$colorInput.val()
            copying = document.execCommand('copy');
            if copying
                app.notifier.notify("copied color: #{value}")
            else
                console.warn("unable to copy to clipboard");
        catch error
            console.warn("unable to copy to clipboard: #{error}");
        return

    _isValueInRange: ( value, min, max ) ->
        isInRange = parseInt(value) >= min and parseInt(value) <= max

        if value.length > 0 and isInRange
            return true
        else
            return false

    _setInputsValues: ->
        @$colorInput.val(@model.getColor())
        @$propertyInput0.val(@model.attributes.properties[0].value)
        @$propertyInput1.val(@model.attributes.properties[1].value)
        @$propertyInput2.val(@model.attributes.properties[2].value)

    _setInputsAttributes: ->
        for property, index in @model.attributes.properties
            el = @["$propertyInput#{index}"][0]
            if property.range isnt undefined
                el.setAttribute('min', property.range[0])
                el.setAttribute('max', property.range[1])
            if property.maxlength isnt undefined
                el.setAttribute('maxlength', property.maxlength)
                el.setAttribute('size', property.maxlength)

)
