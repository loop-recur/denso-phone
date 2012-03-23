Views.Connection = (cb) ->
	win = Ti.UI.createWindow({
	})
	
	view = Ti.UI.createView({
		backgroundImage: "/images/connect/denso_connect_screen_bg.png",
	})
	
	win.add(view)
	
	connect_view = Ti.UI.createView({
		backgroundImage:"/images/connect/connect_btn_base.png",
		width:183,
		height:183,
		top:400
	})

	connect_button = Ti.UI.createButton({
		backgroundImage:"/images/connect/connect_btn.png",
		backgroundSelectedImage:"/images/connect/connect_btn_p.png",
		backgroundActiveImage:"/images/connect/connect_btn_a.png",
		height:127,
		width:126
	})
	
	connect_button.addEventListener('click', ()->
		connect_button.backgroundImage = connect_button.backgroundActiveImage;
		
		ConnectSocket((ip)->
			Socketeer.connect(ip, 8888, (connected)->
				if connected
					cb();
				else
					connect_button.backgroundImage = "/images/connect/connect_btn.png";
					alert("Couldn't connect to denso app.");
			);
		)
	)

	connect_view.add(connect_button)
	view.add(connect_view)
	
		
	win.open()

