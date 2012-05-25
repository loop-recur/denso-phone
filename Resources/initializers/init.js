function init(from) {
	var fancyRequire = function(path) {
        return function(module_name) {
          Ti.API.info("requiring "+module_name+" from "+path+"/"+module_name);
          return require(path+"/"+module_name);
        }
      },

	    requireFrom = function(from, xs) {
        var from = from || "";
        xs.map(function(m){ Ti.include(from+m+"/"+m+".js")});
      },

      domain = function(from) {
        requireFrom(from, ['config', 'support', 'lib', 'models']);
      },

      application = function(from) {
        requireFrom(from, ['helpers', 'ui', 'windows', 'views', 'controllers']);
      };

	domain(from);
	application(from);
}

