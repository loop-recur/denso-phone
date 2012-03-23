(function() {
  Views.Connection = function(cb) {
    var connect_button, connect_view, view, win;
    win = Ti.UI.createWindow({});
    view = Ti.UI.createView({
      backgroundImage: "/images/connection/denso_connect_screen_bg.png"
    });
    win.add(view);
    connect_view = Ti.UI.createView({
      backgroundImage: "/images/connection/connect_btn_base.png",
      height: 200,
      width: 200,
      bottom: 40
    });
    connect_button = Ti.UI.createButton({
      backgroundImage: "/images/connection/connect_btn.png",
      backgroundSelectedImage: "/images/connection/connect_btn_p.png",
      backgroundActiveImage: "/images/connection/connect_btn_a.png",
      height: 126,
      width: 127,
      zIndex: 11
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
