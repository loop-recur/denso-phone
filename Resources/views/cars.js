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
      var img, label, row;
      img = Helpers.assetPath(image);
      row = Ti.UI.createTableViewRow({
        height: 112,
        id: id
      });
      img = Ti.UI.createImageView({
        image: img,
        left: 45,
        width: 80,
        height: 80,
        id: id
      });
      label = Ti.UI.createLabel({
        text: name,
        color: "white",
        left: 135,
        font: {
          fontFamily: 'Droid Sans',
          fontSize: 20
        },
        width: 300,
        touchEnabled: true,
        id: id
      });
      row.add(label);
      row.add(img);
      return row;
    };
    return view;
  };

}).call(this);
