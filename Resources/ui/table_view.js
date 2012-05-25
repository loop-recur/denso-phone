UI.createTableView = function(props) {
	var view = Ti.UI.createTableView(props),
	
	    _setData = function(data) { view.setData(data); };
	
	view.loadData = props.delegate.getTableData.p(_setData);
	return view;
}

