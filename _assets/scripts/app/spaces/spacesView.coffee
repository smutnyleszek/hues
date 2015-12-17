app.SpacesView = Backbone.View.extend(

    tagName: 'div'
    template: _.template( $('#space-template').html() )

    events:
        'click button[js-space-button]': 'onButtonClick'
        'blur input[js-space-property]': 'onInputBlur'

    initialize: ->
        @_propertyAttr = 'js-space-property'
        @_colorAttr = 'js-space-color'

        @listenTo(@model, 'change', @render)

    render: ->
        @$el.html(@template( @model.attributes ))
        @$colorInput= @$("input[#{@_colorAttr}]")
        return @

    onInputBlur: ( event ) ->
        propertyName = event.currentTarget.attributes[@_propertyAttr].value
        currentValue = $(event.currentTarget).val()

        spaceName = @model.attributes.slug
        range = @model.getPropertyRange(propertyName)

        # dont go any further if invalid value
        if @_isValueValid(currentValue, range[0], range[1])
            @model.setProperty(propertyName, currentValue)
            @$colorInput.val(@model.getColor())
        else
            console.warn("invalid value for #{propertyName} of #{spaceName}")

    onButtonClick: ->
        console.log('button click')

    _isValueValid: ( value, min, max ) ->
        isInRange = parseInt(value) >= min and parseInt(value) <= max

        if value.length > 0 and isInRange
            return true
        else
            return false
)
