win = Windows.Preferences
PreferenceApi = RestApi("preferences")
self = {}
view = {}

init = (preferences)->
	self.preferences = preferences
	view = Views.Preferences(self)
	view

open = compose(win.open, win.add, init)

module.exports = {open: open}
