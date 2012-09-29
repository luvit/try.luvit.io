var WebSocketServer = require('ws').Server;
var WebSocketTransport = require('smith').WebSocketTransport;
var Agent = require('smith').Agent;
var EventEmitter = require('events').EventEmitter;

module.exports = setup;
setup.consumes = ["http"];
setup.provides = ["smith"];

function setup(config, imports, register) {

  var service = new EventEmitter();

  var server = new WebSocketServer({
    server: imports.http,
    path: config.url
  });

  server.on("connection", function (socket) {

    var api = {};
    service.emit("setup", api);
    var agent = new Agent(api);
    agent.on("error", function (err) {
      if (!err) {
        err = new Error("unknown");
      }
      console.error(err.stack);
    });

    agent.on("connect", function (remote) {
      service.emit("connect", remote);
    });

    agent.on("disconnect", function (err) {
      service.emit("disconnect", err);
    });

    var transport = new WebSocketTransport(socket, config.debug);
    agent.connect(transport);

  });

  register(null, { smith: service });
}