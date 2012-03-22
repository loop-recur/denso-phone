(function() {

  module.exports = function(delegate) {
    var table, view;
    view = Ti.UI.createView({});
    table = UI.createTableView({
      top: 0,
      height: "100%",
      delegate: delegate
    });
    view.add(table);
    view.init = table.loadData;
    view.makeRow = function(id, name, image) {
      var img, row;
      img = Helpers.assetPath(image);
      row = Ti.UI.createTableViewRow({
        height: 112,
        id: id,
        title: name,
        leftImage: img
      });
      return row;
    };
    return view;
  };

}).call(this);
