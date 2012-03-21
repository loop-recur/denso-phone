var requireFrom = function(from, xs) {
	var from = from || "";
	xs.map(function(m){ require(from+m+"/"+m)(from); });
}
domain = function(from) {
	requireFrom(from, ['config', 'support', 'lib', 'models']);
}

application = function(from) {
	requireFrom(from, ['helpers', 'ui', 'windows', 'views', 'controllers']);
}

module.exports.init = function(from) {
	domain(from);
	application(from);
}

module.exports.domain = domain;
module.exports.application = application;
