win = Windows.Preferences
PreferenceApi = RestApi("preferences")
self = {}
view = {}
current_seat = ""

init = (profile, car)->
	view = Views.Preferences(self)
	PreferenceApi.all(compose(view.init, set(self, 'preferences')), {profile_id: profile.id, car_id: car.id})
	view

open = compose(win.open, win.add, init)

self.seatButtonClicked = (cb, e) ->
	current_seat = e.source.id
	log("self.preferences");
	log(self.preferences);
	log(current_seat);
	log(self.preferences[current_seat])
	cb(self.preferences[current_seat])

Controllers.Preferences = {open: open}
