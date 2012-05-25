Helpers = {};

Helpers.joinImage = defn(function(image, name) {
	return image+name+'.png';
});

Helpers.toggle = function(toggleable) {
	return function(e) { toggleable.visible = !toggleable.visible; }
}

Helpers.assetPath = function(path) {
	if(path[0] == "/"){ return App.download_url+path; }
	return path;
}

Helpers.downloadPath = function(path) {
	return (path.indexOf('amazonaws') < 0) ? App.download_url+path : path;
}

Helpers.adjustDial = function(path, level) {
	return replace(/_(\d+)\.png$/, "_"+level+".png", path);
}

Helpers.isActive = compose(toBool, match(/_a\.png$/));

Helpers.active = replace(/btn\.png$/, "btn_a.png");

Helpers.inactive = replace(/_a\.png$/, ".png");

Helpers.toggleActive = function(path) {
	return Helpers.isActive(path) ? Helpers.inactive(path) : Helpers.active(path);
}

