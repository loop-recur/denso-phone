HtmlGestures = function(){
	var view, oldAddEventListener;
	
	var listenForScroll = function(fun) {
		var start_coords_x, start_coords_y, end_coords_x, end_coords_y;
		
		oldAddEventListener.call(view, 'touchstart', function(e){
			start_coords_x = e.x;
			start_coords_y = e.y;
		});
		
		oldAddEventListener.call(view, 'touchmove', function(e){
			end_coords_x = e.x;
			end_coords_y = e.y;
			fun({start_coords_x: start_coords_x, start_coords_y: start_coords_y, end_coords_x: end_coords_x, end_coords_y: end_coords_y});
		});
		
		oldAddEventListener.call(view, 'touchend', function(e){
			end_coords_x = e.x;
			end_coords_y = e.y;
			fun({start_coords_x: start_coords_x, start_coords_y: start_coords_y, end_coords_x: end_coords_x, end_coords_y: end_coords_y});
		});
	}
	
	var createGesturesView = function() {
		view = Ti.UI.createView({});
		oldAddEventListener = view.addEventListener;
		
		view.addEventListener = function(name, fun) {
			if(name == "onScroll") listenForScroll(fun);
			if(name == "onSwipe") oldAddEventListener.call(view, 'swipe', fun);
		}
		return view;
	}
	
	return {createGesturesView: createGesturesView}
}
