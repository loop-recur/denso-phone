module.exports = (delegate) ->
	view = Ti.UI.createView({
		width: "100%",
		height: "100%",
		backgroundColor: "#000",
		opacity: 0.7,
		zIndex: 20
	})
	
	alarm_label = Ti.UI.createLabel({
		width: 100,
		height: 100,
		bottom: 220,
		text: "Car Alarm!"
	})
	
	view.add(alarm_label)
	
	return view
