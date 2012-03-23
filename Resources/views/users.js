(function() {
  Views.Users = function(delegate) {
    var connect_btn, table, view;
    view = Ti.UI.createView({});
    table = UI.createTableView({
      top: 0,
      height: "100%",
      delegate: delegate
    });
    view.init = function() {};
    view.makeRow = function(id, name, image) {
      var img, label, row;
      img = Helpers.assetPath(image);
      row = Ti.UI.createTableViewRow({
        height: 110,
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
    connect_btn = Ti.UI.createButton({
      height: 100,
      width: 100,
      title: "connect",
      top: 20,
      zIndex: 999
    });
    view.add(connect_btn);
    connect_btn.addEventListener('click', function() {
      return ConnectSocket(function(ip) {
        return Socketeer.connect("http://" + ip, 8888);
      });
    });
    return view;
  };
}).call(this);
