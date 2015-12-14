app.SpacesView = Backbone.View.extend(

    el: 'div'
    template: _.template( $('#space-template').html() )

    events:
        'click button[js-space-button]': 'onButtonClick'
        'keypress input[js-space-input]': 'onInputKeypress'

    initialize: ->
        @listenTo(@model, 'change', @render)

    render: ->
        @$el.html(@template( @model.attributes ))
        @$input = @$('input[js-space-input]')
        return @

    onButtonClick: ->
        console.log('button click')

    onInputKeypress: ->
        console.log('key pressed')

)
