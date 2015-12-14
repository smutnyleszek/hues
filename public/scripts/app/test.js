(function() {
  var TestView, test;

  TestView = Backbone.View.extend({
    el: '#test',
    initialize: function() {
      return this.render();
    },
    render: function() {
      var html, variables;
      variables = {
        label: 'color:'
      };
      html = $('#test-template').html();
      return this.$el.html(_.template(html)(variables));
    },
    events: function() {
      return {
        'click button#test-button': 'doConvert'
      };
    },
    doConvert: function() {
      var currentValue;
      currentValue = $('#test-input').val();
      return alert("This: " + currentValue);
    }
  });

  test = new TestView();

}).call(this);
