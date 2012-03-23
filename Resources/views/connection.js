(function() {
  Views.Connection = function(cb) {
    var connect_button, connect_view, view, win;
    win = Ti.UI.createWindow({});
    view = Ti.UI.createView({
      backgroundImage: "/images/connect/denso_connect_screen_bg.png"
    });
    win.add(view);
    connect_view = Ti.UI.createView({
      backgroundImage: "/images/connect/connect_btn_base.png",
      width: 183,
      height: 183,
      bottom: 100
    });
    connect_button = Ti.UI.createButton({
      backgroundImage: "/images/connect/connect_btn.png",
      backgroundSelectedImage: "/images/connect/connect_btn_p.png",
      backgroundActiveImage: "/images/connect/connect_btn_a.png",
      height: 127,
      width: 126
    });
    connect_button.addEventListener('click', function() {
      connect_button.backgroundImage = connect_button.backgroundActiveImage;
      return ConnectSocket(function(ip) {
        return Socketeer.connect(ip, 8888, function(connected) {
          if (connected) {
            return cb();
          } else {
            connect_button.backgroundImage = "/images/connection/connect_btn.png";
            return alert("Couldn't connect to denso app.");
          }
        });
      });
    });
    connect_view.add(connect_button);
    view.add(connect_view);
    return win.open();
  };
}).call(this);
