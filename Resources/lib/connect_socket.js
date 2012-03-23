var ConnectSocket = function(cb) {
	options = (options || {});
	
	var init = function() {
		var stored_ip = FileCache.read("connect_ip");
		(!options.redo && stored_ip) ? _loadApp(stored_ip) : IpWizard(_loadApp);
	}

	var canConnect = function(success, error) {
		App.http_client.get("/apps.json", {
			success: success,
			error: error
		});
	}

	var failConnect = function() {
		FileCache.destroy('connect_ip');
		init();
	}

	var successfulConnect = function(ip) {
		FileCache.set("connect_ip", ip);
		cb(ip);
	}

	var _loadApp = function(ip) {
		successfulConnect(ip);
	}
	
	init();
}
