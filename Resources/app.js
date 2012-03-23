// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

isAndroid = Ti.Platform.osname == 'android';

Ti.include("/initializers/init.js");
init("/");

App.setHost("http://denso.herokuapp.com", "admin@denso.com:Secret123");

Controllers.Users.open();
Socketeer.listen(8888);