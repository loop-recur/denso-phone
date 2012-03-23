Dispatch = function(message){
	log("dispatching "+message);
	if(message == "alarm") Views.Alarm();
}
