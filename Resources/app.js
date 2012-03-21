// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

require("initializers/init").init();

App.setHost("http://localhost:3000", "admin@denso.com:Secret123");

Controllers.Users.open();
