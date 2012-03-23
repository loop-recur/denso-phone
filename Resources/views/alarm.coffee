Views.Alarm = () ->
	win = Ti.UI.createWindow({})
	
	view = Ti.UI.createView({
		backgroundImage:"/images/alarm_overlay.png",
		width: "100%",
		height: "100%",
		zIndex: 20
	})
	
	win.add(view)
	win.open()
