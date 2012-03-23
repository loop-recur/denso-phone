Socketeer = (function() {
	var SERVER = [];
	
	var _handleConnection = function(e) {
	 log("Handling connection");
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
	
	var listen = function(port) {
		var tries = 3;
		var listenSocket = Ti.Network.Socket.createTCP({
	    port: port,
	    accepted: function(e) {
				log("LISTENING");
				// e.inbound is client socket connecting
				SERVER.push(e.inbound);
				e.socket.accept({});
	    },
			error: function(e) {
				log("Error my homie");
				log(e);
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
				if(tries > 0) _listen();
			}
		}

	  try {
			_listen();
	  } catch(e) {
	    log('Couldnt Listen');
			log(e);
			if(tries > 0) _listen();
	  }
	  

		return listenSocket;
	}

	var connect = function(ip, port) {
	 var connectSocket = Ti.Network.Socket.createTCP({
	     host: ip,
	     port: port,
	     connected: _handleConnection,
	     error: function(e) {log(JSON.stringify(e));}
	 });
		connectSocket.connect();
		return connectSocket;
	};	

	var write = function(json) {
		if(!SERVER[0]) return log("Could not write since there's no connected servers.");
		var buffer = Ti.createBuffer({value: json});
		SERVER[0].write(buffer);
		return json;
	}

	return {listen: listen, connect: connect, write: write};
})();
