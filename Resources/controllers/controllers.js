Controllers = {};

module.exports = function(from) {
  Controllers.Users = require(from + 'controllers/users');
	Controllers.Cars = require(from + 'controllers/cars');
	Controllers.Preferences = require(from + 'controllers/preferences');
};
