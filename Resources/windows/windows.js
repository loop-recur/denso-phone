Windows = {};

module.exports = function(from) {
	Windows.Users = require(from+'windows/users');
	Windows.Cars = require(from+'windows/cars');
	Windows.Preferences = require(from+'windows/preferences');
}
