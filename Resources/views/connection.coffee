Views.Connection = (cb) ->
	win = Ti.UI.createWindow({
	})

	view = Ti.UI.createView({
		backgroundImage: "/images/connection/denso_connect_screen_bg.png",
	})
	
	win.add(view)
	
	connect_view = Ti.UI.createView({
		backgroundImage:"/images/connection/connect_btn_base.png",
		height:200,
		width:200,
		bottom:40
	})
	
	connect_button = Ti.UI.createButton({
		backgroundImage:"/images/connection/connect_btn.png",
		backgroundSelectedImage:"/images/connection/connect_btn_p.png",
		backgroundActiveImage:"/images/connection/connect_btn_a.png",
		height:126,
		width:127,
		zIndex: 11
	})
	
	connect_button.addEventListener('click', ()->
		connect_button.backgroundImage = connect_button.backgroundActiveImage
		
		ConnectSocket((ip)->
			Socketeer.connect(ip, 8888, (connected)->
				if connected
					cb()
				else
					connect_button.backgroundImage = "/images/connection/connect_btn.png"
					alert("Couldn't connect to denso app.")
			)
		)
	)

	connect_view.add(connect_button)
	view.add(connect_view)
	
		
	win.open()

