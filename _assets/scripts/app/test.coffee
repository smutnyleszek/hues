#-------------------------------------------------------------------------------
# test input file
#-------------------------------------------------------------------------------

TestView = Backbone.View.extend(
    el: '#test'
    initialize: -> @render()
    render: ->
        variables =
            label: 'color:'
        html = $('#test-template').html()
        @$el.html( _.template(html)(variables) )
    events: ->
        'click button#test-button': 'doConvert'
    doConvert: ->
        currentValue = $('#test-input').val()
        alert( "This: #{currentValue}")
)

test = new TestView()
