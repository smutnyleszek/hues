#-------------------------------------------------------------------------------
# hues app
#-------------------------------------------------------------------------------

Space = Backbone.Model.extend(
    defaults:
        label: 'foo bar:'
        slug: 'dupa'
)

testSpace = new Space(
    slug: 'test1'
)

SpacesView = Backbone.View.extend(

    el: '#spaces'
    template: _.template( $('#space-template').html() )

    events:
        'click button[js-space-button]': 'onButtonClick'
        'keypress input[js-space-input]': 'onKeypress'


    initialize: ->
        @$el = $(@el)
        @render()

    render: ->
        @$el.html(@template( @model.attributes ))
        @input = @$('input[js-space-input]')
        return @

    onButtonClick: ->
        console.log('button click')

    onKeypress: ->
        console.log('key pressed')

)

spaces = new SpacesView({ model: testSpace })
