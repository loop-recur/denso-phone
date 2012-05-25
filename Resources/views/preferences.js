(function() {

Views.Preferences = function(delegate) {
  var _updateDial = function(prefix, prop, v) {
        var current_level = 1;

        return function(e) {
          var directions = Gestures.detect(e);
          if (!directions){ return; }
          if (directions.right || directions.up) {
            current_level += 2;
            if (current_level >= 26){ current_level = 26; }
          } else {
            current_level -= 2;
            if (current_level <= 1){ current_level = 1; }
          }
          v.backgroundImage = Helpers.adjustDial(v.backgroundImage, current_level);
          Socketeer.write(prefix + "_" + current_level);
          return current_level;
        };
      },

      _updateDesiredTemp = function(temp) {
        if (temp){ return desired_temp_inside.text = (temp + 60).toString(); }
      },

      _toggleActive = function(bool, image) {
        return bool ? Helpers.active(image) : Helpers.inactive(image);
      },

      _updatePreferences = function(prefs) {
        airbag.backgroundImage = _toggleActive(prefs.airbags, airbag.backgroundImage);
        seatwarmer.backgroundImage = _toggleActive(prefs.seat_heater, seatwarmer.backgroundImage);
        ac_button.backgroundImage = _toggleActive(prefs.ac_on, ac_button.backgroundImage);
        temp_button.backgroundImage = _toggleActive(prefs.defrost_on, temp_button.backgroundImage);
        temp_view.backgroundImage = Helpers.adjustDial(temp_view.backgroundImage, prefs.temp_level || 1);
        ac_view.backgroundImage = Helpers.adjustDial(ac_view.backgroundImage, prefs.ac_level || 1);
        return _updateDesiredTemp(prefs.temp_level);
      },

      view = Ti.UI.createScrollView({
        height: '100%',
        width: '100%',
        top: 0,
        contentWidth: 'auto',
        contentHeight: 'auto',
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: true
      }),

      vehicle_settings = Ti.UI.createLabel({
        color: '#979797',
        text: "Vehicle Settings",
        font: { fontSize: 20, fontFamily: 'Droid Sans' },
        textAlign: 'center',
        width: 170,
        top: 10
      }),

      start_engine_view = Ti.UI.createView({
        backgroundImage: "/images/startengine/user_start_eng_base.png",
        height: 234,
        width: 234,
        top: 50
      }),

      start_engine_button = Ti.UI.createButton({
        backgroundImage: "/images/startengine/user_start_eng_btn.png",
        backgroundSelectedImage: "/images/startengine/user_start_eng_btn_p.png",
        backgroundActiveImage: "/images/startengine/user_start_eng_btn_a.png",
        height: 145,
        width: 145,
        top: 40,
        left: 44
      }),

      currentOutsideTempView = Ti.UI.createView({
        height: 30,
        layout: 'horizontal',
        top: 300,
        width: '100%'
      }),

      outside_temp = Ti.UI.createLabel({
        color: 'white',
        text: "current outside temp: ",
        font: { fontSize: 17, fontFamily: 'Droid Sans' },
        left: 240,
        width: 190
      }),

      outside_temp_number = Ti.UI.createLabel({
        color: '#187A2C',
        text: "75",
        font: { fontSize: 25, fontFamily: 'Droid Sans' },
        width: 60
      }),

      seat_selection_view = Ti.UI.createView({
        backgroundImage: "/images/userselect/phone_toggle_base3.png",
        top: 355,
        width: 430,
        height: 52
      }),

      driver_button = Ti.UI.createButton({
        backgroundImage: "/images/userselect/user_toggle_driver.png",
        backgroundSelectedImage: "/images/userselect/user_toggle_driver_p.png",
        backgroundActiveImage: '/images/userselect/user_toggle_driver_a.png',
        height: 47,
        width: 149,
        left: 2,
        top: 5,
        id: 'driver'
      }),

      passenger_button = Ti.UI.createButton({
        backgroundImage: "/images/userselect/user_toggle_passenger.png",
        backgroundSelectedImage: "/images/userselect/user_toggle_passenger_p.png",
        backgroundActiveImage: '/images/userselect/user_toggle_passenger_a.png',
        height: 47,
        width: 149,
        left: 147,
        top: 5,
        id: 'passenger'
      }),

      rear_button = Ti.UI.createButton({
        backgroundImage: "/images/userselect/user_toggle_rear.png",
        backgroundSelectedImage: "/images/userselect/user_toggle_rear_p.png",
        backgroundActiveImage: '/images/userselect/user_toggle_rear_a.png',
        height: 47,
        width: 149,
        left: 284,
        top: 5,
        id: 'rear'
      }),

      ac_view = Ti.UI.createView({
        backgroundImage: "/images/airdial/user_air_dial_1.png",
        height: 338,
        width: 338,
        top: 410
      }),

      ac_button = Ti.UI.createButton({
        backgroundImage: "/images/airdial/user_air_dial_ac_btn.png",
        backgroundSelectedImage: "/images/airdial/user_air_dial_ac_btn_p.png",
        backgroundActiveImage: "/images/airdial/user_air_dial_ac_btn_a.png",
        height: 144,
        width: 144,
        zIndex: 11
      }),

      temp_view = Ti.UI.createView({
        backgroundImage: "/images/tempdial/user_temp_dial_1.png",
        height: 338,
        width: 338,
        top: 690
      }),

      temp_button = Ti.UI.createButton({
        backgroundImage: "/images/tempdial/user_temp_dial_vent_btn.png",
        backgroundSelectedImage: "/images/tempdial/user_temp_dial_vent_btn_p.png",
        backgroundActiveImage: "/images/tempdial/user_temp_dial_vent_btn_a.png",
        height: 144,
        width: 144,
        zIndex: 11
      }),

      desired_temp = Ti.UI.createLabel({
        color: 'white',
        text: "desired inside temp",
        font: { fontSize: 15, fontFamily: 'Droid Sans' },
        textAlign: 'center',
        width: 110,
        top: 610,
        left: 16
      }),

      temp_circle1 = Ti.UI.createView({
        backgroundImage: "/images/temp_circle.png",
        height: 138,
        width: 138,
        left: 10,
        top: 660
      }),

      desired_temp_inside = Ti.UI.createLabel({
        color: '#187A2C',
        text: "87",
        font: { fontSize: 65, fontFamily: 'Droid Sans' },
        textAlign: 'center',
        width: 110,
        left: 23
      }),

      actual_temp = Ti.UI.createLabel({
        color: 'white',
        text: "actual inside temp",
        font: { fontSize: 15, fontFamily: 'Helvetica', fontStyle: "italic" },
        textAlign: 'center',
        width: 110,
        top: 610,
        right: 16
      }),

      temp_circle2 = Ti.UI.createView({
        backgroundImage: "/images/temp_circle.png",
        height: 138,
        width: 138,
        right: 15,
        top: 660
      }),

      actual_temp_inside = Ti.UI.createLabel({
        color: '#187A2C',
        text: "87",
        font: { fontSize: 65, fontFamily: 'Helvetica' },
        textAlign: 'center',
        width: 110,
        left: 28
      }),

      airbag = Ti.UI.createButton({
        backgroundImage: "/images/otherbuttons/user_temp_airbag_btn.png",
        backgroundSelectedImage: "/images/otherbuttons/user_temp_airbag_btn_p.png",
        backgroundActiveImage: "/images/otherbuttons/user_temp_airbag_btn_a.png",
        height: 47,
        width: 89,
        left: 30,
        top: 950
      }),

      seatwarmer = Ti.UI.createButton({
        backgroundImage: "/images/otherbuttons/user_temp_heated_seat_btn.png",
        backgroundSelectedImage: "/images/otherbuttons/user_temp_heated_seat_btn_p.png",
        backgroundActiveImage: "/images/otherbuttons/user_temp_heated_seat_btn_a.png",
        height: 47,
        width: 89,
        right: 30,
        top: 950
      }),

      ac_gesture_view = Gestures.createView(),

      temp_gesture_view = Gestures.createView();


  view.init = function(prefs) {
    return driver_button.fireEvent('click', { source: driver_button });
  };

  temp_view.add(temp_gesture_view);
  start_engine_view.add(start_engine_button);
  currentOutsideTempView.add(outside_temp);
  currentOutsideTempView.add(outside_temp_number);
  seat_selection_view.add(driver_button);
  seat_selection_view.add(passenger_button);
  seat_selection_view.add(rear_button);
  UI.ButtonGroup([driver_button, passenger_button, rear_button]);
  ac_view.add(ac_button);
  temp_view.add(temp_button);
  temp_circle1.add(desired_temp_inside);
  temp_circle2.add(actual_temp_inside);
  ac_view.add(ac_gesture_view);
  ac_gesture_view.addEventListener("onScroll", _updateDial("ac", 'ac_level', ac_view));

  view.add(start_engine_view);
  view.add(vehicle_settings);
  view.add(currentOutsideTempView);
  view.add(seat_selection_view);
  view.add(ac_view);
  view.add(temp_view);
  view.add(desired_temp);
  view.add(temp_circle1);
  view.add(actual_temp);
  view.add(temp_circle2);
  view.add(airbag);
  view.add(seatwarmer);

  temp_gesture_view.addEventListener("onScroll", compose(_updateDesiredTemp, _updateDial("temp", 'temp_level', temp_view)));
  driver_button.addEventListener('click', delegate.seatButtonClicked.p(_updatePreferences));
  passenger_button.addEventListener('click', delegate.seatButtonClicked.p(_updatePreferences));
  rear_button.addEventListener('click', delegate.seatButtonClicked.p(_updatePreferences));

  start_engine_button.addEventListener('click', function() {
    Socketeer.write("start_engine");
    return start_engine_button.backgroundImage = Helpers.toggleActive(start_engine_button.backgroundImage);
  });

  ac_button.addEventListener('click', function(e) {
    return ac_button.backgroundImage = Helpers.toggleActive(ac_button.backgroundImage);
  });

  temp_button.addEventListener('click', function(e) {
    return temp_button.backgroundImage = Helpers.toggleActive(temp_button.backgroundImage);
  });

  airbag.addEventListener('click', function(e) {
    return airbag.backgroundImage = Helpers.toggleActive(airbag.backgroundImage);
  });

  seatwarmer.addEventListener('click', function(e) {
    return seatwarmer.backgroundImage = Helpers.toggleActive(seatwarmer.backgroundImage);
  });

  return view;
};

}).call(this);

