LoopRecur = {};

require('lib/framework/support/functional_async.js');
require('lib/framework/support/temp_id.js');
require('lib/framework/lib/cache.js');
require('lib/framework/support/http_client_with_cache_adapter.js');
require('lib/framework/support/real_http_client_with_cache.js');
require('lib/framework/support/http_client_with_cache.js');
require('lib/framework/lib/http_client.js');
require('lib/framework/lib/db.js');

App = require('lib/framework/lib/app.js');
require('lib/framework/lib/rest_api.js');

module.exports = App;
