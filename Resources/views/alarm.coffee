module.exports = (delegate) ->
	view = Ti.UI.createView({
		backgroundImage:"/images/alarm_overlay.png",
		width: "100%",
		height: "100%",
		opacity: 0.9,
		zIndex: 20
	})
	
	return view
