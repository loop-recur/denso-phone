module.exports = (delegate) ->
	view = Ti.UI.createView({})
	
	table = UI.createTableView({
		top:0,
		height: "100%",
		delegate: delegate
	})

	view.add(table)

	view.init = table.loadData

	view.makeRow = (id, name, image) ->
		img = Helpers.assetPath(image)
		row = Ti.UI.createTableViewRow({height: 112, id: id, title: name, leftImage: img})
		return row

	return view
