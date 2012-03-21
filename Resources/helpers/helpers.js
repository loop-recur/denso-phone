Helpers = {};

Helpers.joinImage = defn(function(image, name) {
	return image+name+'.png';
});

Helpers.toggle = function(toggleable) {
	return function(e) { toggleable.visible = !toggleable.visible; }
}

Helpers.assetPath = function(path) {
	if(path[0] == "/") return App.download_url+path;
	return path;
}

Helpers.downloadPath = function(path) {
	return (path.indexOf('amazonaws') < 0) ? App.download_url+path : path;
}


module.exports = function(from) {}
