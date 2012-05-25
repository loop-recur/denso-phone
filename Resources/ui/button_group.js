UI.ButtonGroup = function(buttons) {	
	var buttons = (buttons || argsToList(arguments)),

	    registry = {},

	    makeActivatable = function(button) {
        registry[button.id] = {};
        registry[button.id].backgroundImage = button.backgroundImage;
        registry[button.id].backgroundActiveImage = button.backgroundActiveImage;
        return button;
      },
	
      setInactive = function(button) {
        button.backgroundImage = registry[button.id].backgroundImage;
      },
	
      setActive = function(button) {
        button.backgroundImage = registry[button.id].backgroundActiveImage;
      },

      toggleButtonState = function(e) {
        map(setInactive, buttons);
        if(e.source){ setActive(e.source); }
      },

      addListeners = function(button) {
        button.addEventListener('click', toggleButtonState);
      },
	
      activeButton = function() {
        return filter(isActive, buttons)[0];
      },
	
      isActive = function(button) {
        return button.backgroundImage == registry[button.id].backgroundActiveImage;
      },

	    init = map(compose(addListeners, makeActivatable));

	init(buttons);
	return {isActive : isActive, activeButton: activeButton};
}

