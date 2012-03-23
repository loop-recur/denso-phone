(function() {
  var finishLoad, init, makeRows, open, self, view, win, _makeRow, _openPrefs;

  win = Windows.Cars;

  self = {};

  view = {};

  _openPrefs = function(e) {
    var car;
    car = filterByProperty('id', e.source.id)(self.profile.cars);
    return Controllers.Preferences.open(self.profile, car);
  };

  _makeRow = function(car) {
    var row;
    row = view.makeRow(car.id, car.name, car.image);
    row.addEventListener('click', _openPrefs);
    return row;
  };

  makeRows = compose(set(self, "rows"), map(_makeRow));

  finishLoad = function(cars) {
    return compose(view.init, makeRows)(cars);
  };

  init = function(profile) {
    view = Views.Cars(self);
    self.profile = profile;
    finishLoad(profile.cars);
    return view;
  };

  open = compose(win.open, win.add, init);

  self.getTableData = function(cb) {
    return cb(pluck('rows')(self));
  };

  Controllers.Cars = {
    open: open
  };

}).call(this);
