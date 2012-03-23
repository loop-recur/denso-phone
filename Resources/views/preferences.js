(function() {
  Views.Preferences = function(delegate) {
    var ac_button, ac_gesture_view, ac_view, actual_temp, actual_temp_inside, airbag, desired_temp, desired_temp_inside, driver_button, outside_temp, outside_temp_number, passenger_button, rear_button, seat_selection_view, seatwarmer, start_engine_button, start_engine_view, temp_button, temp_circle1, temp_circle2, temp_gesture_view, temp_view, vehicle_settings, view, _toggleActive, _updateDesiredTemp, _updateDial, _updatePreferences;
    _updateDial = function(prefix, prop, v) {
      var current_level;
      current_level = 1;
      return function(e) {
        var directions;
        directions = Gestures.detect(e);
        if (!directions) {
          return;
        }
        if (directions.right || directions.up) {
          current_level += 2;
          if (current_level >= 26) {
            current_level = 26;
          }
        } else {
          current_level -= 2;
          if (current_level <= 1) {
            current_level = 1;
          }
        }
        v.backgroundImage = Helpers.adjustDial(v.backgroundImage, current_level);
        Socketeer.write(prefix + "_" + current_level);
        return current_level;
      };
    };
    _updateDesiredTemp = function(temp) {
      if (temp) {
        return desired_temp_inside.text = (temp + 60).toString();
      }
    };
    _toggleActive = function(bool, image) {
      if (bool) {
        return Helpers.active(image);
      } else {
        return Helpers.inactive(image);
      }
    };
    _updatePreferences = function(prefs) {
      airbag.backgroundImage = _toggleActive(prefs.airbags, airbag.backgroundImage);
      seatwarmer.backgroundImage = _toggleActive(prefs.seat_heater, seatwarmer.backgroundImage);
      ac_button.backgroundImage = _toggleActive(prefs.ac_on, ac_button.backgroundImage);
      temp_button.backgroundImage = _toggleActive(prefs.defrost_on, temp_button.backgroundImage);
      temp_view.backgroundImage = Helpers.adjustDial(temp_view.backgroundImage, prefs.temp_level || 1);
      ac_view.backgroundImage = Helpers.adjustDial(ac_view.backgroundImage, prefs.ac_level || 1);
      return _updateDesiredTemp(prefs.temp_level);
    };
    view = Ti.UI.createScrollView({
      height: 800,
      width: 480,
      top: 0,
      contentWidth: 480,
      contentHeight: 'auto',
      showHorizontalScrollIndicator: false,
      showVerticalScrollIndicator: true
    });
    vehicle_settings = Ti.UI.createLabel({
      color: '#979797',
      text: "Vehicle Settings",
      font: {
        fontSize: 20,
        fontFamily: 'Droid Sans'
      },
      textAlign: 'center',
      width: 170,
      top: 10
    });
    view.add(vehicle_settings);
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
      width: 145,
      top: 40,
      left: 44
    });
    start_engine_button.addEventListener('click', function() {
      Socketeer.write("start_engine");
      return start_engine_button.backgroundImage = Helpers.toggleActive(start_engine_button.backgroundImage);
    });
    start_engine_view.add(start_engine_button);
    view.add(start_engine_view);
    outside_temp = Ti.UI.createLabel({
      color: 'white',
      text: "current outside temp: ",
      font: {
        fontSize: 17,
        fontFamily: 'Droid Sans'
      },
      textAlign: 'center',
      width: 190,
      top: 300
    });
    view.add(outside_temp);
    outside_temp_number = Ti.UI.createLabel({
      color: '#187A2C',
      text: "75",
      font: {
        fontSize: 25,
        fontFamily: 'Droid Sans'
      },
      textAlign: 'center',
      width: 60,
      top: 297,
      left: 340
    });
    view.add(outside_temp_number);
    seat_selection_view = Ti.UI.createView({
      backgroundImage: "/images/userselect/phone_toggle_base3.png",
      top: 355,
      width: 430,
      height: 52
    });
    driver_button = Ti.UI.createButton({
      backgroundImage: "/images/userselect/user_toggle_driver.png",
      backgroundSelectedImage: "/images/userselect/user_toggle_driver_p.png",
      backgroundActiveImage: '/images/userselect/user_toggle_driver_a.png',
      height: 47,
      width: 149,
      left: 2,
      top: 5,
      id: 'driver'
    });
    driver_button.addEventListener('click', delegate.seatButtonClicked.p(_updatePreferences));
    seat_selection_view.add(driver_button);
    passenger_button = Ti.UI.createButton({
      backgroundImage: "/images/userselect/user_toggle_passenger.png",
      backgroundSelectedImage: "/images/userselect/user_toggle_passenger_p.png",
      backgroundActiveImage: '/images/userselect/user_toggle_passenger_a.png',
      height: 47,
      width: 149,
      left: 147,
      top: 5,
      id: 'passenger'
    });
    passenger_button.addEventListener('click', delegate.seatButtonClicked.p(_updatePreferences));
    seat_selection_view.add(passenger_button);
    rear_button = Ti.UI.createButton({
      backgroundImage: "/images/userselect/user_toggle_rear.png",
      backgroundSelectedImage: "/images/userselect/user_toggle_rear_p.png",
      backgroundActiveImage: '/images/userselect/user_toggle_rear_a.png',
      height: 47,
      width: 149,
      left: 284,
      top: 5,
      id: 'rear'
    });
    rear_button.addEventListener('click', delegate.seatButtonClicked.p(_updatePreferences));
    seat_selection_view.add(rear_button);
    UI.ButtonGroup([driver_button, passenger_button, rear_button]);
    view.add(seat_selection_view);
    ac_view = Ti.UI.createView({
      backgroundImage: "/images/airdial/user_air_dial_1.png",
      height: 338,
      width: 338,
      top: 410
    });
    ac_button = Ti.UI.createButton({
      backgroundImage: "/images/airdial/user_air_dial_ac_btn.png",
      backgroundSelectedImage: "/images/airdial/user_air_dial_ac_btn_p.png",
      backgroundActiveImage: "/images/airdial/user_air_dial_ac_btn_a.png",
      height: 144,
      width: 144,
      zIndex: 11
    });
    ac_button.addEventListener('click', function(e) {
      return ac_button.backgroundImage = Helpers.toggleActive(ac_button.backgroundImage);
    });
    ac_view.add(ac_button);
    view.add(ac_view);
    temp_view = Ti.UI.createView({
      backgroundImage: "/images/tempdial/user_temp_dial_1.png",
      height: 338,
      width: 338,
      top: 690
    });
    temp_button = Ti.UI.createButton({
      backgroundImage: "/images/tempdial/user_temp_dial_vent_btn.png",
      backgroundSelectedImage: "/images/tempdial/user_temp_dial_vent_btn_p.png",
      backgroundActiveImage: "/images/tempdial/user_temp_dial_vent_btn_a.png",
      height: 144,
      width: 144,
      zIndex: 11
    });
    temp_button.addEventListener('click', function(e) {
      return temp_button.backgroundImage = Helpers.toggleActive(temp_button.backgroundImage);
    });
    temp_view.add(temp_button);
    view.add(temp_view);
    desired_temp = Ti.UI.createLabel({
      color: 'white',
      text: "desired inside temp",
      font: {
        fontSize: 15,
        fontFamily: 'Droid Sans'
      },
      textAlign: 'center',
      width: 110,
      top: 610,
      left: 16
    });
    view.add(desired_temp);
    temp_circle1 = Ti.UI.createView({
      backgroundImage: "/images/temp_circle.png",
      height: 138,
      width: 138,
      left: 10,
      top: 660
    });
    view.add(temp_circle1);
    desired_temp_inside = Ti.UI.createLabel({
      color: '#187A2C',
      text: "87",
      font: {
        fontSize: 65,
        fontFamily: 'Droid Sans'
      },
      textAlign: 'center',
      width: 110,
      left: 23
    });
    temp_circle1.add(desired_temp_inside);
    actual_temp = Ti.UI.createLabel({
      color: 'white',
      text: "actual inside temp",
      font: {
        fontSize: 15,
        fontFamily: 'Helvetica',
        fontStyle: "italic"
      },
      textAlign: 'center',
      width: 110,
      top: 610,
      right: 16
    });
    view.add(actual_temp);
    temp_circle2 = Ti.UI.createView({
      backgroundImage: "/images/temp_circle.png",
      height: 138,
      width: 138,
      right: 15,
      top: 660
    });
    view.add(temp_circle2);
    actual_temp_inside = Ti.UI.createLabel({
      color: '#187A2C',
      text: "87",
      font: {
        fontSize: 65,
        fontFamily: 'Helvetica'
      },
      textAlign: 'center',
      width: 110,
      left: 28
    });
    temp_circle2.add(actual_temp_inside);
    airbag = Ti.UI.createButton({
      backgroundImage: "/images/otherbuttons/user_temp_airbag_btn.png",
      backgroundSelectedImage: "/images/otherbuttons/user_temp_airbag_btn_p.png",
      backgroundActiveImage: "/images/otherbuttons/user_temp_airbag_btn_a.png",
      height: 47,
      width: 89,
      left: 30,
      top: 950
    });
    airbag.addEventListener('click', function(e) {
      return airbag.backgroundImage = Helpers.toggleActive(airbag.backgroundImage);
    });
    view.add(airbag);
    seatwarmer = Ti.UI.createButton({
      backgroundImage: "/images/otherbuttons/user_temp_heated_seat_btn.png",
      backgroundSelectedImage: "/images/otherbuttons/user_temp_heated_seat_btn_p.png",
      backgroundActiveImage: "/images/otherbuttons/user_temp_heated_seat_btn_a.png",
      height: 47,
      width: 89,
      right: 30,
      top: 950
    });
    seatwarmer.addEventListener('click', function(e) {
      return seatwarmer.backgroundImage = Helpers.toggleActive(seatwarmer.backgroundImage);
    });
    view.add(seatwarmer);
    ac_gesture_view = Gestures.createView();
    ac_view.add(ac_gesture_view);
    ac_gesture_view.addEventListener("onScroll", _updateDial("ac", 'ac_level', ac_view));
    temp_gesture_view = Gestures.createView();
    temp_view.add(temp_gesture_view);
    temp_gesture_view.addEventListener("onScroll", compose(_updateDesiredTemp, _updateDial("temp", 'temp_level', temp_view)));
    view.init = function(prefs) {
      return driver_button.fireEvent('click', {
        source: driver_button
      });
    };
    return view;
  };
}).call(this);
