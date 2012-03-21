RestApi = function(name) {
	pub_obj = {};
	
	function all(callbacks, params, options) {
		
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
						
		callbacks.error = function(r) {
			r ? oldError(r.responseText) : oldError();
		};
		
		callbacks.success = function(r) {
			if(!r || !r.responseText) return;
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		callApi("get", getPath(), callbacks, params, options);
	};
	
	function find(callbacks, id, params, options) {
		var oldSuccess = callbacks.success || callbacks;
				
		callbacks.error = function(r) {
			oldSuccess(null);
		};
		
		callbacks.success = function(r) {
			if(!r || !r.responseText) return oldSuccess();
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		callApi("get", getPath(id), callbacks, params, options);
	};
	
	function save(callbacks, obj, options) {
		options = options || {}
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			if(r) {
				oldError(r.responseText);
			} else {
				if(Cache[name]) {
					var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
					old_record ? Helpers.array_funs.replace(Cache[name], old_record, obj) : Cache[name].unshift(obj);
				}
				oldSuccess(old_record);
			}
		};
		
		callbacks.success = function(r) {
			if(!r) {
				log("no response came back");
				return oldSuccess({});
			}
			var json = JSON.parse(r.responseText);
			if(Cache[name]) {
				var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
				old_record ? Helpers.array_funs.replace(Cache[name], old_record, json) : Cache[name].unshift(json);
			}
			oldSuccess(json);
		};
		
		var path = options.path ? options.path : getPath(obj.id);
		callApi("post", path, callbacks, obj, options);
	};
	
	function destroy(callbacks, obj, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			if(r) {
				oldError(r.responseText);
			} else {
				if(Cache[name]) {
					var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
					if(old_record){ Helpers.array_funs.remove(Cache[name], old_record); };
				}
				oldSuccess(old_record);
			}
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			if(Cache[name]) {
				var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
				if(old_record){ Helpers.array_funs.remove(Cache[name], old_record); };
			}
			oldSuccess(json);
		};
		var path = (options && options.path) || getPath(obj.id);
		callApi("destroy", path, callbacks, obj, options);
	};

	
// private

	function getPath(id) {
		var base_path = "/"+name;
		if(id && !TempId.isTemp(id)) base_path = base_path +"/"+id;
		return base_path+".json";
	};
	
	function callApi(method, path, callbacks, params, options) {
		params = params || {};
		options = options || {};
		options.success = function(r) { if(callbacks.success) callbacks.success(r); };
		options.error = function(r) { if(callbacks.error) callbacks.error(r); };
		App.http_client[method](path, params, options);
	};
			
	pub_obj = {
		all: all,
		find: find,
		save: save,
		destroy: destroy
	};
	
	return pub_obj;
};
