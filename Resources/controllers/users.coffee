win = Windows.Users
ProfileApi = RestApi("profiles")
self = {}
view = {}


_openCars = (e)->
	profile = filterByProperty('id', e.source.id)(self.profiles)
	Controllers.Cars.open(profile)

_makeRow = (profile)->
	row = view.makeRow(profile.id, profile.name, profile.avatar)
	row.addEventListener('click', _openCars)
	row
	
makeRows = compose(set(self, "rows"), map(_makeRow))
	
finishLoad = (ps)-> compose(view.init, makeRows, set(self, "profiles"))(ps)

init = ()->
	view = Views.Users(self)
	ProfileApi.all(finishLoad)
	view

open = compose(win.open, win.add, init)

# delegates
self.getTableData = (cb)->
	cb(pluck('rows')(self))

module.exports = {open: open}
