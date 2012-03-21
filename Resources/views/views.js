Views = {};

module.exports = function(from) {
	Views.Users = require(from+'views/users');
	Views.Alarm = require(from+'views/alarm');
	Views.Cars = require(from+'views/cars');
	Views.Preferences = require(from+'views/preferences');
}
