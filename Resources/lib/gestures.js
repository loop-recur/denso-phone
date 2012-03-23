Gestures = (function() {
	var lib = isAndroid ? require('com.looprecur.gestures') : HtmlGestures();
	
	var createView = function() {		
		return lib.createGesturesView();
	}
	
	var createPredictionView = function(props) {
		return lib.createGesturePredictionView(merge({width: "100%", height: "100%", backgroundColor:"black", opacity: 0.6}, props));
	}
		
	var detect = function(e) {
		var x_delta = Math.abs(e.start_coords_x - e.end_coords_x)
		, y_delta = Math.abs(e.start_coords_y - e.end_coords_y)
		, right = e.start_coords_x < e.end_coords_x
		, up = e.start_coords_y > e.end_coords_y;
		
		if(!(x_delta > 5) || !((y_delta > 5))) return;
		return {up: up, down: !up, right: right, left: !right}
	}
	
	return {detect: detect, createView: createView, createPredictionView: createPredictionView}
})();
