UI.createWindow = function(props) {
	var win = Ti.UI.createWindow(props);
	
	// make functions first class instead of Ti symbols.
	var open = function(){ win.open(); }
	var close = function(){ win.close(); }
	var add = function(other){ win.add(other); }
	var addEventListener = function(name, fun){ win.addEventListener(name, fun); }
	var remove = function(other){ win.remove(other); }
	
	return {open: open, close: close, remove: remove, add: add, addEventListener: addEventListener}
}
