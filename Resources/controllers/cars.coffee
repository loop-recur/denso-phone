win = Windows.Cars
self = {}
view = {}

_openPrefs = (e)->
	car = filterByProperty('id', e.source.id)(self.profile.cars)
	Controllers.Preferences.open(self.profile, car)

_makeRow = (car)->
	row = view.makeRow(car.id, car.name, car.image)
	row.addEventListener('click', _openPrefs)
	row

makeRows = compose(set(self, "rows"), map(_makeRow))

finishLoad = (cars)-> compose(view.init, makeRows)(cars)

init = (profile)->
	view = Views.Cars(self)
	self.profile = profile
	finishLoad(profile.cars)
	view

open = compose(win.open, win.add, init)

# delegates
self.getTableData = (cb)->
	cb(pluck('rows')(self))

Controllers.Cars = {open: open}
