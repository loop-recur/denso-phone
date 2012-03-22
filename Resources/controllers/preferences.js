(function() {
  var PreferenceApi, init, open, self, view, win;

  win = Windows.Preferences;

  PreferenceApi = RestApi("preferences");

  self = {};

  view = {};

  init = function(preferences) {
    self.preferences = preferences;
    view = Views.Preferences(self);
    return view;
  };

  open = compose(win.open, win.add, init);

  module.exports = {
    open: open
  };

}).call(this);
