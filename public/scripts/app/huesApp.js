var app;

app = app || {};

app.init = function() {
  return new app.AppView();
};

$(app.init);
