var app;

app = app || {};

app.spacesData = {
  rgb: {
    label: 'RGB',
    color: 'rgb(255,255,255)'
  },
  hex: {
    label: 'hexadecimal',
    color: '#ffffff'
  },
  hwb: {
    label: 'HWB',
    color: 'hwb(0, 100%, 0%)'
  }
};

$(function() {
  return new app.AppView();
});
