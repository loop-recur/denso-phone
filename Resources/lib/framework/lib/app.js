var App = {};
App.http_client = LoopRecur.HttpClient();

App.setHost = function(url, credentials) {
	App.base_url = url+"/api";
	App.download_url = url;
	if(credentials) App.http_client.credentials = ('Basic ' + Titanium.Utils.base64encode(credentials));
}

module.exports = App;
