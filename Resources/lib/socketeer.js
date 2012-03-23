Socketeer = (function() {
	var SERVER = [];
	
	var _handleConnection = function(e) {
	 var socket = e.source ? e.source : e.socket;
	 var readBuffer = Ti.createBuffer({length:30});
	 var callback = function(e) {
	   var data = readBuffer.toString();
	   alert(data);
	   readBuffer.clear();
	   Ti.Stream.read(socket, readBuffer, callback);
	 };
	   Ti.Stream.read(socket, readBuffer, callback);
	};
	
	var listen = function(port) {
		var listenSocket = Ti.Network.Socket.createTCP({
	    port: port,
	    accepted: function(e) {
				// e.inbound is client socket connecting
				SERVER.push(e.inbound);
				e.socket.accept({});
	    },
			error: function(e) {
				log("Error my homie");
				log(e);
	    }
	  });

	  try {
	    listenSocket.listen();
	  } catch(e) {
	    log('Couldnt Listen');
			log(e);
	  }
	  listenSocket.accept({});

		return listenSocket;
	}

	var connect = function(ip, port) {
	 var connectSocket = Ti.Network.Socket.createTCP({
	     host: ip,
	     port: port,
	     connected: _handleConnection,
	     error: function(e) {alert(JSON.stringify(e));}
	 });
		connectSocket.connect();
		return connectSocket;
	};	

	var write = function(json) {
		var buffer = Ti.createBuffer({value: json});
		SERVER[0].write(buffer);
		return json;
	}

	return {listen: listen, connect: connect, write: write};
})();
