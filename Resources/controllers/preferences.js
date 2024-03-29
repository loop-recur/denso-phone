(function() {
  var win = Windows.Preferences,

      PreferenceApi = RestApi("preferences"),

      self = {},

      view = {},

      current_seat = "",

      init = function(profile, car) {
        view = Views.Preferences(self);
        PreferenceApi.all(compose(view.init, set(self, 'preferences')), {
          profile_id: profile.id,
          car_id: car.id
        });
        return view;
      },

      open = compose(win.open, win.add, init);

  self.seatButtonClicked = function(cb, e) {
    current_seat = e.source.id;
    return cb(self.preferences[current_seat]);
  };

  Controllers.Preferences = { open: open };

}).call(this);

