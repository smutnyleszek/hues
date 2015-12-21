var Notifier;

Notifier = (function() {
  function Notifier() {
    this._title = window.globalsData.appName;
    this._icon = window.globalsData.notifierIcon;
    this._closeDelay = window.globalsData.delays.notification;
    this._isSupported = false;
    this._isPermissed = false;
    this._checkSupport();
    this._askPermission();
  }

  Notifier.prototype.notify = function(message) {
    var instance, options;
    if (!this._isSupported) {
      return;
    }
    if (!this._isPermissed) {
      return;
    }
    options = {
      icon: this._icon,
      body: message,
      requireInteraction: false
    };
    instance = new Notification(this._title, options);
    return setTimeout(instance.close.bind(instance), this._closeDelay);
  };

  Notifier.prototype._checkSupport = function() {
    this._isSupported = window.Notification !== void 0;
    if (!this._isSupported) {
      return console.warn('notifications API not supported');
    }
  };

  Notifier.prototype._askPermission = function() {
    var isDenied, isGranted;
    if (!this._isSupported) {
      return;
    }
    isGranted = window.Notification.permission === 'granted';
    isDenied = window.Notification.permission === 'denied';
    if (isGranted) {
      return this._isPermissed = true;
    } else if (isDenied) {
      return console.warn('notifications permission denied');
    } else {
      return Notification.requestPermission(this._onRequestPermission.bind(this));
    }
  };

  Notifier.prototype._onRequestPermission = function(permission) {
    this._isPermissed = permission === 'granted';
    if (this._isPermissed) {
      return console.warn('notifications permission granted :-*');
    }
  };

  return Notifier;

})();

app.notifier = new Notifier();
