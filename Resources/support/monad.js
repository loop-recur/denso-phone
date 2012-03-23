defMonad = function(defs) {
	return function() {
		var args = Array.prototype.slice.apply(arguments);

		var builder = function(vals, arg) {
			if(arg == args[args.length-1]){
				return defs.mResult(arg.apply(arg, vals));
			}
			
			return defs.mBind(arg, function(v) {
				vals.push(v);
				return builder(vals, args[args.indexOf(arg)+1]);
			});
		}
		
		return builder([], first(args));		
	}
}

liftM = defn(function(monad, fun) {
	return function() {
		var args = Array.prototype.slice.apply(arguments);
		args.push(fun.toFunction());
		return monad.apply(monad, args);
	}
});
