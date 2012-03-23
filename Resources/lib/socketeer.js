Socketeer = (function() {
	var SERVER = [];
	
	var closeAllSockets = function() {
		map(function(s){ s.close(); }, SERVER);
	}
	
	var _handleConnection = function(cb, e) {
	 if(cb) cb(true);
	 var socket = e.source ? e.source : e.socket;
	 var readBuffer = Ti.createBuffer({length:30});
	 var callback = function(e) {
	   var data = readBuffer.toString();
	   if(strip(data)) Dispatch(data);
	   readBuffer.clear();
	   Ti.Stream.read(socket, readBuffer, callback);
	 };
	   Ti.Stream.read(socket, readBuffer, callback);
	};
	
	var listen = function(port, cb) {
		var tries = 3;
		var listenSocket = Ti.Network.Socket.createTCP({
	    port: port,
	    accepted: function(e) {
				log("LISTENING");
				if(cb) cb(true);
				// e.inbound is client socket connecting
				SERVER.push(e.inbound);
				e.socket.accept({});
	    },
			error: function(e) {
				log("Error my homie");
				log(e);
				closeAllSockets();
				if(cb) cb(false);
	    }
	  });
		
		var _listen = function() {
			tries -= 1;
			try{
				listenSocket.listen();
				listenSocket.accept({});
			} catch(e) {
				log("error listening");
				log(e);
				if(tries > 0) {
					_listen();
				} else {
					closeAllSockets();
					cb(false);
				}
			}
		}

		_listen();

		return listenSocket;
	}

	var connect = function(ip, port, cb) {
	 var connectSocket = Ti.Network.Socket.createTCP({
	     host: ip,
	     port: port,
	     connected: _handleConnection.p(cb),
	     error: function(e) {log(JSON.stringify(e)); closeAllSockets(); cb(false); }
	 });
		connectSocket.connect();
		return connectSocket;
	};	

	var write = function(json) {
		if(!SERVER[0]) return log("Could not write since there's no connected servers.");
		var buffer = Ti.createBuffer({value: json});
		try{SERVER[0].write(buffer);}catch(e){log("error writing buffer"); closeAllSockets();}
		return json;
	}

	return {listen: listen, connect: connect, write: write};
})();
