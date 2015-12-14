#-------------------------------------------------------------------------------
# main app file
#-------------------------------------------------------------------------------

AppView = Backbone.View.extend(
    el: '#app'
    initialize: -> @render()
    render: -> @$el.html("Huello world!")
)

app = new AppView()
