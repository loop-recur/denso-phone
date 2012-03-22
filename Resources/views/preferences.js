(function() {

  module.exports = function(delegate) {
    var ac_view, driver_button, passenger_button, rear_button, seat_selection_view, start_engine_button, start_engine_view, temp_view, view;
    view = Ti.UI.createView({});
    seat_selection_view = Ti.UI.createView({
      backgroundImage: "/images/userselect/toggle_base3.png",
      top: 15,
      width: 502,
      height: 53
    });
    driver_button = Ti.UI.createButton({
      backgroundImage: "/images/userselect/user_toggle_driver_btn.png",
      backgroundSelectedImage: "/images/userselect/user_toggle_driver_btn_p.png",
      backgroundActiveImage: '/images/userselect/user_toggle_driver_btn_a.png',
      height: 46,
      width: 163,
      left: 5,
      top: 4,
      id: 'driver'
    });
    seat_selection_view.add(driver_button);
    passenger_button = Ti.UI.createButton({
      backgroundImage: "/images/userselect/user_toggle_passenger_btn.png",
      backgroundSelectedImage: "/images/userselect/user_toggle_passenger_btn_p.png",
      backgroundActiveImage: '/images/userselect/user_toggle_passenger_btn_a.png',
      height: 46,
      width: 163,
      left: 113,
      top: 4,
      id: 'passenger'
    });
    seat_selection_view.add(passenger_button);
    rear_button = Ti.UI.createButton({
      backgroundImage: "/images/userselect/user_toggle_rear_btn.png",
      backgroundSelectedImage: "/images/userselect/user_toggle_rear_btn_p.png",
      backgroundActiveImage: '/images/userselect/user_toggle_rear_btn_a.png',
      height: 46,
      width: 163,
      right: 7,
      top: 4,
      id: 'rear'
    });
    seat_selection_view.add(rear_button);
    view.add(seat_selection_view);
    start_engine_view = Ti.UI.createView({
      backgroundImage: "/images/startengine/user_start_eng_base.png",
      height: 234,
      width: 234,
      top: 50
    });
    start_engine_button = Ti.UI.createButton({
      backgroundImage: "/images/startengine/user_start_eng_btn.png",
      backgroundSelectedImage: "/images/startengine/user_start_eng_btn_p.png",
      backgroundActiveImage: "/images/startengine/user_start_eng_btn_a.png",
      height: 145,
      width: 145
    });
    start_engine_view.add(start_engine_button);
    view.add(start_engine_view);
    ac_view = Ti.UI.createView({
      backgroundImage: "/images/airdial/user_air_dial_1.png",
      height: 338,
      width: 338,
      top: 350
    });
    view.add(ac_view);
    temp_view = Ti.UI.createView({
      backgroundImage: "/images/tempdial/user_temp_dial_1.png",
      height: 338,
      width: 338,
      top: 690
    });
    view.add(temp_view);
    return view;
  };

}).call(this);
