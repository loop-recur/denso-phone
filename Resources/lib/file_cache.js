FileCache = (function() {
	
var data_dir = Ti.Filesystem.applicationDataDirectory;
	
var get = function(name) {
	return Ti.Filesystem.getFile(data_dir, name);
}

var read = function(name) {
	var file = get(name);
	if(file.exists()) return file.read().toString();
}

var set = function(name, data) {
	var file = Ti.Filesystem.getFile(data_dir,name);
	file.write(data);
	return data;
};

var destroy = function(name) {
	var file = Ti.Filesystem.getFile(data_dir,name);
	if(file.exists()) file.deleteFile();
}

return {get : get, set: set, read: read, destroy : destroy}

})();
