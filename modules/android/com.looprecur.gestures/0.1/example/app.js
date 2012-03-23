Ti.API.info("STARTING");
var gestures = require('com.looprecur.gestures');
Ti.API.info("Required");

var window = Ti.UI.createWindow({backgroundColor: "black", width: "100%", height: "100%", orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]});
var left_view = gestures.createGesturesView({width: "50%", height: "100%", left: 0, backgroundColor:"red"});
var right_view = gestures.createGesturePredictionView({width: "100%", height: "50%", right: 0, backgroundColor:"blue"});

window.add(right_view);
window.add(left_view);

var right_label = Ti.UI.createLabel({top: 20, text: "EVENT GOES HERE", color: "white"});
right_view.add(right_label);

var left_label = Ti.UI.createLabel({top: 20, text: "EVENT GOES HERE", color: "white"});
left_view.add(left_label);

var notifyPrediction = function(name) {
	return function(e) {
	 left_label.text = e.name + " "+ JSON.stringify(e);
	}
}

var notifyGesture = function() {
	return function(e) {
		right_label.text = e.name + " "+ JSON.stringify(e);
	}
}

left_view.addEventListener("onSwipe", notifyGesture("onSwipe"));
left_view.addEventListener("onScroll", notifyGesture("onScroll"));
left_view.addEventListener("onFling", notifyGesture("onFling"));
left_view.addEventListener("onDown", notifyGesture("onDown"));
left_view.addEventListener("onSingleTapUp", notifyGesture("onSingleTapUp"));
left_view.addEventListener("onDoubleTap", notifyGesture("onDoubleTap"));

right_view.addEventListener("prediction", notifyPrediction());

window.open();
