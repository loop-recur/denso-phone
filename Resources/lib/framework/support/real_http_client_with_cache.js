RealHTTPClientWithCache = function() {
  /*
  ------> Client <------

  This class is a wrapper around the standard Titanium.Network.HTTPClient(), but it adds a
  few nice features:

    * A cache backed by a SQLite database. All Client instances use the same database table, with
      the primary cache key being a hash of the full URL (and any data parameters in a POST)
    * The cache is automatically pruned before each query
    * A retry mechanism, so that you can retry a particular query a number of times before failing.
    * Automatically fires a Titanium event ("show_activity_indicator") when a query is started, and another one
      when the query finishes ("hide_activity_indicator"), you can capture these events to show/hide an activity indicator

  (These code examples are written in CoffeeScript, which compiles down into plain Javascript.)

  First, we create a new instance of the class to connect to the CNN RSS feeds:

    cnn = new Client({
      baseURL: "http://rss.cnn.com/rss",
      retryCount: 2,
      cacheSeconds: 60,
      onload: (response) ->
        Ti.API.debug("Response Data: #{response.responseText}")
        Ti.API.debug("Is this cached data?: #{response.cached}")
    })

    cnn.get({url: "/cnn_topstories.rss"})

  Subsequent calls will return (via the onload callback) the cached data until the cacheSeconds time expires.
  You can use the same object to make calls to other URLs as well, like so:

    cnn.get({url: "/cnn_us.rss"})

  If you need to pass parameters (like for pagination) you can say:

    cnn.get({url: "/cnn_us.rss?page=1"})

  To POST data to a URL, do this:

    cnn.post({url: "/story/19912/edit", data: {param1: "value1", param2: "value2"}})

  To manually prune the cache, you can call the prune_cache method, and anything older than seconds will be
  deleted from the cache. For example, to remove anything older than 1 day (86,400 seconds) you would say this:

    cnn.prune_cache(86400)

  To completely clear the cache of every single entry, you can do this:

    cnn.prune_cache(0)


  */  var db, root;
  db = Titanium.Database.open('http_client_cache');
  db.execute('CREATE TABLE IF NOT EXISTS REQUESTS (URL_HASH STRING, RESPONSE TEXT, UPDATED_AT INTEGER)');
  db.close();

  function Client(opts) {
    var self;
    this.url_hash = "";
    this.request_headers = [];
    this.currentRetryCount = 0;
    this.options = {
      method: "GET",
      baseUrl: "",
      timeout: 2100000,
      retryCount: 0,
      cacheSeconds: 30,
      pruneSeconds: 2520000,
      showActivityEvent: "show_activity_indicator",
      hideActivityEvent: "hide_activity_indicator"
    };
    this.xhr = Titanium.Network.createHTTPClient();
    self = this;
    this.xhr.onload = function() {
      return self.onload_hook(self, {
        responseText: this.responseText,
        cached: false,
        status: this.status
      });
    };
    this.xhr.onerror = function() {
      return self.onerror_hook(self);
    };
    this.set_options(opts);
    // this.prune_cache();
  }
  Client.prototype.set_options = function(opts) {
    var attrname;
    for (attrname in opts) {
      this.options[attrname] = opts[attrname];
    }
    return this._compute_url_hash();
  };
  Client.prototype.get = function(opts) {
    this.set_options(opts);
    this.options.method = "GET";
    return this.send();
  };
  Client.prototype.post = function(opts) {
    this.set_options(opts);
    this.options.method = "POST";
    return this.send();
  };
  Client.prototype.open = function(meth, url) {
    this.options.method = meth;
    return this.options.url = url;
  };
  Client.prototype.setRequestHeader = function(key, value) {
    return this.request_headers.push([key, value]);
  };
  Client.prototype.send = function(opts) {
    var response, self;
    self = this;
    this.set_options(opts);
    if (!this._validate()) {
      return false;
    }

	if(this.options.preload && this.options.method == "GET") {
		var previous_response = this._get_cached_response(10000000);

		if(previous_response) {
			this.onload_hook(this, previous_response);
		}
	}
	
    this.prune_cache();
    if (response = this._get_cached_response()) {
      Ti.API.info("Client: Using cached response");
      return this.onload_hook(this, response);
    } else {
		try {
       this._reset_xhr();
       this.xhr.setTimeout(this.options.timeout);
       Ti.App.fireEvent(this.options.showActivityEvent);
			Ti.App.current_xhr = this.xhr;
			this.xhr.onsendstream = this.options.onsendstream;
       this.xhr.open(this.options.method, this.options.baseUrl + this.options.url);
       this._setRequestHeaders();
			return this.xhr.send(this.options.data != null ? this.options.data : void 0);
		} catch(e) {
			return this.onerror_hook.apply(this, [e]);
		}
    }
  };
  Client.prototype._setRequestHeaders = function() {
    var pair, _i, _len, _ref, _results;
    _ref = this.request_headers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pair = _ref[_i];
      _results.push(this.xhr.setRequestHeader(pair[0], pair[1]));
    }
    return _results;
  };
  Client.prototype.onload_hook = function(self, response) {
    if (response.status >= 400) {
      this.onerror_hook(self, response);
      return;
    }
    Ti.App.fireEvent(this.options.hideActivityEvent);
    this._save_to_cache(self, response);
    if (this.options.onload != null) {
      return this.options.onload(response);
    } else {
      return Ti.API.error("Client: Please specify an onload callback!");
    }
  };
  Client.prototype.onerror_hook = function(self, response) {
		Ti.API.info("Client: Failed on "+ this.options.url);
    Ti.App.fireEvent(this.options.hideActivityEvent);
    if (this.options.onerror != null) {
      if(this.options.method !== "POST") response = this._get_cached_response(9999999);
      return this.options.onerror(response);
    } else {
      return Ti.API.info("You might want to specify an onerror callback.");
    }
  };
  Client.prototype.prune_cache = function(seconds) {
    seconds != null ? seconds : seconds = this.options.pruneSeconds;
    db = Titanium.Database.open('http_client_cache');
    db.execute("DELETE FROM REQUESTS WHERE UPDATED_AT < DATETIME('now','-" + seconds + " seconds')");
    return db.close();
  };
  Client.prototype._validate = function() {
    if (this.options.url != null) {
      return true;
    } else {
      Ti.API.error("Client: Invalid options " + (JSON.stringify(this.options)));
      return false;
    }
  };
  Client.prototype._compute_url_hash = function() {
    return this.url_hash = Ti.Utils.md5HexDigest(this.options.method + this.options.baseUrl + this.options.url + this.options.data);
  };
  Client.prototype._save_to_cache = function(self, response) {
	if(self.options.method === "POST"){ return };
    var urlHash;
    if (response.status >= 400 || response.cached) {
      return;
    }
    db = Titanium.Database.open('http_client_cache');
    urlHash = self._compute_url_hash();
    if (self._exists_in_cache()) {
      db.execute("UPDATE REQUESTS SET RESPONSE=?, UPDATED_AT=CURRENT_TIMESTAMP WHERE URL_HASH=?", response.responseText, urlHash);
    } else {
      db.execute("INSERT INTO REQUESTS (RESPONSE, URL_HASH, UPDATED_AT) VALUES (?,?,CURRENT_TIMESTAMP)", response.responseText, urlHash);
    }
    return db.close();
  };
  Client.prototype._get_cached_response = function(seconds) {
    var cachedAt, responseText, row;
    db = Titanium.Database.open('http_client_cache');
    seconds != null ? seconds : seconds = this.options.cacheSeconds;
    row = db.execute("SELECT RESPONSE, UPDATED_AT FROM REQUESTS WHERE URL_HASH=? AND UPDATED_AT > DATETIME('now','-" + seconds + " seconds')", this.url_hash);
	try{ 
		if(row.isValidRow()) {
			responseText = row.field(0);
     	cachedAt = row.field(1);
		}

	} catch(e) {
		log(e);
	}
    row.close();
    db.close();
    if (responseText != null) {
      return {
        responseText: responseText,
        cached: true,
        cached_at: cachedAt,
        status: 200
      };
    }
  };
  Client.prototype._exists_in_cache = function() {
    var count, row, _ref;
    row = db.execute("SELECT COUNT(*) FROM REQUESTS WHERE URL_HASH=?", this.url_hash);
    count = row.field(0);
    row.close();
    return (_ref = count > 0) != null ? _ref : {
      "true": false
    };
  };
  Client.prototype._reset_xhr = function() {
    this.currentRetryCount = 0;
    return this.xhr.abort();
  };

	return Client;
}
