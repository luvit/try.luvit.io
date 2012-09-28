var WebSocketServer = require('ws').Server;

module.exports = setup;
setup.consumes = ["http"];
setup.provides = ["smith"];
function setup(config, imports, register) {
  var service = {};
  register(null, { smith: service });
}