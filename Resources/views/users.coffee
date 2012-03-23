Views.Users = (delegate) ->
	view = Ti.UI.createView({})
	
	table = UI.createTableView({
		top:0,
		height:"100%",
		delegate: delegate
	})
	
	# view.add(table)
	
	view.init = ()->
	
	view.makeRow = (id, name, image) ->
		img = Helpers.assetPath(image)
		row = Ti.UI.createTableViewRow({height:110, id: id})
		
		img = Ti.UI.createImageView({
			image:img,
			left: 45,
			width: 80,
			height: 80,
			id: id
		})
		
		label = Ti.UI.createLabel({
			text: name,
			color: "white",
			left:135,
			font:{
				fontFamily:'Droid Sans',
				fontSize:20
			},
			width:300,
			touchEnabled: true,
			id: id
		})
		
		row.add(label)
		row.add(img)
		
		return row
		
	connect_btn = Ti.UI.createButton({
		height: 100,
		width: 100,
		title: "connect"
		top: 20,
		zIndex: 999
	})
	
	view.add(connect_btn)
	
	connect_btn.addEventListener('click', ()->
		ConnectSocket((ip)->
			Socketeer.connect("http://"+ip, 8888);
		)
	)
	
	
	return view
