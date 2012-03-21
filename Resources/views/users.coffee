module.exports = (delegate) ->
	view = Ti.UI.createView({
	})
	
	table = UI.createTableView({
		height: "100%",
		delegate: delegate
	})
	
	view.add(table)
	
	view.init = table.loadData
	
	view.makeRow = (id, name, image) ->
		img = Helpers.assetPath(image)
		row = Ti.UI.createTableViewRow({id: id, title: name, leftImage: img})
		return row
	
	return view
