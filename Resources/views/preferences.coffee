module.exports = (delegate) ->
	view = Ti.UI.createView({})
	
	# SEAT SELECTION
	
	seat_selection_view = Ti.UI.createView({
		backgroundImage:"/images/userselect/toggle_base3.png",
		top: 15,
		width: 502,
		height: 53
	})
	
	driver_button = Ti.UI.createButton({
		backgroundImage:"/images/userselect/user_toggle_driver_btn.png",
		backgroundSelectedImage:"/images/userselect/user_toggle_driver_btn_p.png",
		backgroundActiveImage: '/images/userselect/user_toggle_driver_btn_a.png',
		height:46,
		width:163,
		left:5,
		top:4,
		id: 'driver'
	})
	
	# driver_button.addEventListener('click', delegate.seatButtonClicked(_updatePreferences))
	
	seat_selection_view.add(driver_button);
	
	passenger_button = Ti.UI.createButton({
		backgroundImage:"/images/userselect/user_toggle_passenger_btn.png",
		backgroundSelectedImage:"/images/userselect/user_toggle_passenger_btn_p.png",
		backgroundActiveImage: '/images/userselect/user_toggle_passenger_btn_a.png',
		height:46,
		width:163,
		left:113,
		top:4,
		id: 'passenger'
	})
	
	# passenger_button.addEventListener('click', delegate.seatButtonClicked(_updatePreferences))
	
	seat_selection_view.add(passenger_button);
	
	rear_button = Ti.UI.createButton({
		backgroundImage:"/images/userselect/user_toggle_rear_btn.png",
		backgroundSelectedImage:"/images/userselect/user_toggle_rear_btn_p.png",
		backgroundActiveImage: '/images/userselect/user_toggle_rear_btn_a.png',
		height:46,
		width:163,
		right:7,
		top:4,
		id: 'rear'
	})

	# rear_button.addEventListener('click', delegate.seatButtonClicked(_updatePreferences))
	
	seat_selection_view.add(rear_button)
	
	# UI.ButtonGroup([driver_button, passenger_button, rear_button]);
	
	view.add(seat_selection_view)
	
	
	
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
		width:145
	})
		
	start_engine_view.add(start_engine_button)
	view.add(start_engine_view)
	
	
	# AIR DIAL
	
	ac_view = Ti.UI.createView({
		backgroundImage:"/images/airdial/user_air_dial_1.png",
		height:338,
		width:338,
		top:350
	})
	
	# var ac_button = Ti.UI.createButton({
	# 	backgroundImage:"/images/userselect/air/user_air_dial_ac_btn.png",
	# 	backgroundSelectedImage:"/images/userselect/air/user_air_dial_ac_btn_p.png",
	# 	height:96,
	# 	width:96,
	# 	zIndex: 11
	# });
	# 
	# ac_button.addEventListener('click', function(e) {
	# 	ac_button.backgroundImage = Helpers.images.toggleActive(ac_button.backgroundImage);
	# 	delegate.setCurrentPreference('ac_on', Helpers.images.isActive(ac_button.backgroundImage));
	# });
	
	# ac_view.add(ac_button);
	view.add(ac_view)
	
	
	# TEMP DIAL
	
	temp_view = Ti.UI.createView({
		backgroundImage:"/images/tempdial/user_temp_dial_1.png",
		height:338,
		width:338,
		top:690
	})
	
	# var temp_button = Ti.UI.createButton({
	# 	backgroundImage:"/images/userselect/temp/user_temp_dial_vent_btn.png",
	# 	backgroundSelectedImage:"/images/userselect/temp/user_temp_dial_vent_btn_p.png",
	# 	height:96,
	# 	width:96,
	# 	zIndex: 11
	# });
	# 
	# temp_button.addEventListener('click', function(e) {
	# 	temp_button.backgroundImage = Helpers.images.toggleActive(temp_button.backgroundImage);
	# 	delegate.setCurrentPreference('defrost_on', Helpers.images.isActive(temp_button.backgroundImage));
	# });
	# 
	# temp_view.add(temp_button);
	view.add(temp_view)
	
	
	# TEMPERATURE SETTINGS
	
	
	
	return view
