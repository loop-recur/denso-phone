module.exports = (delegate) ->
	view = Ti.UI.createScrollView({
		height:800,
		width:480,
		top:0,
		contentWidth:480,
		contentHeight: 'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	})
	
	vehicle_settings = Ti.UI.createLabel({
		color:'#979797',
		text:"Vehicle Settings",
		font:{fontSize:20,fontFamily:'Droid Sans'},
		textAlign:'center',
		width:170,
		top: 10
	})
	
	view.add(vehicle_settings);
	
	# START ENGINE
	
	start_engine_view = Ti.UI.createView({
		backgroundImage:"/images/startengine/user_start_eng_base.png",
		height:234,
		width:234,
		top:50
	})
	
	start_engine_button = Ti.UI.createButton({
		backgroundImage:"/images/startengine/user_start_eng_btn.png",
		backgroundSelectedImage:"/images/startengine/user_start_eng_btn_p.png",
		backgroundActiveImage:"/images/startengine/user_start_eng_btn_a.png",
		height:145,
		width:145,
		top:40,
		left:44
	})
		
	start_engine_view.add(start_engine_button)
	view.add(start_engine_view)
	
	
	outside_temp = Ti.UI.createLabel({
		color:'white',
		text:"current outside temp: ",
		font:{fontSize:17,fontFamily:'Droid Sans'},
		textAlign:'center',
		width:190,
		top: 300
	})
	
	view.add(outside_temp);
	
	outside_temp_number = Ti.UI.createLabel({
		color:'#187A2C',
		text:"75",
		font:{fontSize:25,fontFamily:'Droid Sans'},
		textAlign:'center',
		width:60,
		top: 297,
		left: 340
	})
	
	view.add(outside_temp_number);
	
	# SEAT SELECTION
	
	seat_selection_view = Ti.UI.createView({
		backgroundImage:"/images/userselect/phone_toggle_base3.png",
		top: 355,
		width: 430,
		height: 52
	})
	
	driver_button = Ti.UI.createButton({
		backgroundImage:"/images/userselect/user_toggle_driver.png",
		backgroundSelectedImage:"/images/userselect/user_toggle_driver_p.png",
		backgroundActiveImage: '/images/userselect/user_toggle_driver_a.png',
		height:47,
		width:149,
		left:2,
		top:5,
		id: 'driver'
	})
	
	# driver_button.addEventListener('click', delegate.seatButtonClicked(_updatePreferences))
	
	seat_selection_view.add(driver_button);
	
	passenger_button = Ti.UI.createButton({
		backgroundImage:"/images/userselect/user_toggle_passenger.png",
		backgroundSelectedImage:"/images/userselect/user_toggle_passenger_p.png",
		backgroundActiveImage: '/images/userselect/user_toggle_passenger_a.png',
		height:47,
		width:149,
		left:147,
		top:5,
		id: 'passenger'
	})
	
	# passenger_button.addEventListener('click', delegate.seatButtonClicked(_updatePreferences))
	
	seat_selection_view.add(passenger_button);
	
	rear_button = Ti.UI.createButton({
		backgroundImage:"/images/userselect/user_toggle_rear.png",
		backgroundSelectedImage:"/images/userselect/user_toggle_rear_p.png",
		backgroundActiveImage: '/images/userselect/user_toggle_rear_a.png',
		height:47,
		width:149,
		left:284,
		top:5,
		id: 'rear'
	})

	# rear_button.addEventListener('click', delegate.seatButtonClicked(_updatePreferences))
	
	seat_selection_view.add(rear_button)
	
	# UI.ButtonGroup([driver_button, passenger_button, rear_button]);
	
	view.add(seat_selection_view)
	
	
	# AIR DIAL
	
	ac_view = Ti.UI.createView({
		backgroundImage:"/images/airdial/user_air_dial_1.png",
		height:338,
		width:338,
		top:410
	})
	
	ac_button = Ti.UI.createButton({
		backgroundImage:"/images/airdial/user_air_dial_ac_btn.png",
		backgroundSelectedImage:"/images/airdial/air/user_air_dial_ac_btn_p.png",
		backgroundActiveImage:"/images/airdial/air/user_air_dial_ac_btn_a.png",
		height:144,
		width:144,
		zIndex: 11
	});
	
	# ac_button.addEventListener('click', function(e) {
	# 	ac_button.backgroundImage = Helpers.images.toggleActive(ac_button.backgroundImage);
	# 	delegate.setCurrentPreference('ac_on', Helpers.images.isActive(ac_button.backgroundImage));
	# });
	
	ac_view.add(ac_button);
	view.add(ac_view)
	
	
	# TEMP DIAL
	
	temp_view = Ti.UI.createView({
		backgroundImage:"/images/tempdial/user_temp_dial_1.png",
		height:338,
		width:338,
		top:690
	})
	
	temp_button = Ti.UI.createButton({
		backgroundImage:"/images/tempdial/user_temp_dial_vent_btn.png",
		backgroundSelectedImage:"/images/tempdial/user_temp_dial_vent_btn_p.png",
		backgroundActiveImage:"/images/tempdial/user_temp_dial_vent_btn_a.png",
		height:144,
		width:144,
		zIndex: 11
	});
	
	# temp_button.addEventListener('click', function(e) {
	# 	temp_button.backgroundImage = Helpers.images.toggleActive(temp_button.backgroundImage);
	# 	delegate.setCurrentPreference('defrost_on', Helpers.images.isActive(temp_button.backgroundImage));
	# });
	
	temp_view.add(temp_button);
	view.add(temp_view)
	
	
	# TEMPERATURE SETTINGS
	
	desired_temp = Ti.UI.createLabel({
		color:'white',
		text:"desired inside temp",
		font:{fontSize:15,fontFamily:'Droid Sans'},
		textAlign:'center',
		width:110,
		top: 610,
		left:16
	})
	
	view.add(desired_temp);
	
	temp_circle1 = Ti.UI.createView({
		backgroundImage:"/images/temp_circle.png",
		height:138,
		width:138,
		left:15,
		top:660
	})
	
	view.add(temp_circle1);
	
	desired_temp_inside = Ti.UI.createLabel({
		color:'#187A2C',
		text:"87",
		font:{fontSize:65,fontFamily:'Droid Sans'},
		textAlign:'center',
		width:110,
		left:28
	})
	
	temp_circle1.add(desired_temp_inside);
	
	actual_temp = Ti.UI.createLabel({
		color:'white',
		text:"actual inside temp",
		font:{fontSize:15,fontFamily:'Helvetica', fontStyle:"italic"},
		textAlign:'center',
		width:110,
		top: 610,
		right:16
	})
	
	view.add(actual_temp);
	
	temp_circle2 = Ti.UI.createView({
		backgroundImage:"/images/temp_circle.png",
		height:138,
		width:138,
		right:15,
		top:660
	})
	
	view.add(temp_circle2);
	
	actual_temp_inside = Ti.UI.createLabel({
		color:'#187A2C',
		text:"87",
		font:{fontSize:65,fontFamily:'Helvetica'},
		textAlign:'center',
		width:110,
		left:28
	})
	
	temp_circle2.add(actual_temp_inside);
	
	# OTHER BUTTONS
	
	airbag = Ti.UI.createButton({
		backgroundImage:"/images/otherbuttons/user_temp_airbag_btn.png",
		backgroundSelectedImage:"/images/otherbuttons/user_temp_airbag_btn_p.png",
		backgroundActiveImage:"/images/otherbuttons/user_temp_airbag_btn_a.png",
		height:47,
		width:89,
		left: 30,
		top: 950
	})
		
	view.add(airbag)
	
	seatwarmer = Ti.UI.createButton({
		backgroundImage:"/images/otherbuttons/user_temp_heated_seat_btn.png",
		backgroundSelectedImage:"/images/otherbuttons/user_temp_heated_seat_btn_p.png",
		backgroundActiveImage:"/images/otherbuttons/user_temp_heated_seat_btn_a.png",
		height:47,
		width:89,
		right: 30,
		top: 950
	})
		
	view.add(seatwarmer)
	
	return view
