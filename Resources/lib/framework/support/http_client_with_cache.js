HTTPClientWithCache = (function() {
	return (Ti.Platform.osname == 'android') ? RealHTTPClientWithCache() : HTTPClientWithCacheAdapater();
})();
