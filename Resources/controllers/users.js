(function() {
  var ProfileApi, finishLoad, init, makeRows, open, self, view, win, _makeRow, _openCars;

  win = Windows.Users;

  ProfileApi = RestApi("profiles");

  self = {};

  view = {};

  _openCars = function(e) {
    var profile;
    profile = filterByProperty('id', e.source.id)(self.profiles);
    return Controllers.Cars.open(profile);
  };

  _makeRow = function(profile) {
    var row;
    row = view.makeRow(profile.id, profile.name, profile.avatar);
    row.addEventListener('click', _openCars);
    return row;
  };

  makeRows = compose(set(self, "rows"), map(_makeRow));

  finishLoad = function(ps) {
    return compose(view.init, makeRows, set(self, "profiles"))(ps);
  };

  init = function() {
    view = Views.Users(self);
    ProfileApi.all(finishLoad);
    return view;
  };

  open = compose(win.open, win.add, init);

  self.getTableData = function(cb) {
    return cb(pluck('rows')(self));
  };

  Controllers.Users = {
    open: open
  };

}).call(this);
