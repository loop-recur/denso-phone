// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

isAndroid = Ti.Platform.osname == 'android';

Ti.include("/initializers/init.js");
init("/");

App.setHost("http://denso.herokuapp.com", "admin@denso.com:Secret123");

Socketeer.listen(8888, function(client_connected){
	if(client_connected) {
		alert("Client connected");
	} else {
		alert("Couldn't listen for clients.  Please restart app to reset tcp connections");
	}
});

Views.Connection(Controllers.Users.open);
