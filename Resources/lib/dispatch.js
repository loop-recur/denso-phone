Dispatch = function(message){
	log("dispatching "+message);
	if(message.match(/alarm/)) {
		Views.Alarm();
	}
}
