define(["smith", "events"], function (smith, events) {

  var BrowserTransport = smith.BrowserTransport;
  var Agent = smith.Agent;
  var EventEmitter = events.EventEmitter;

  setup.provides = ["smith"];

  function setup(config, imports, register) {
    var service = new EventEmitter();

    var url = document.location.origin.replace(/^http/, "ws") + config.url;
    var socket = new WebSocket(url);

    socket.onopen = function () {

      var api = {};
      service.emit("setup", api);
      var agent = new Agent(api);

      agent.on("connect", function (remote) {
        service.emit("connect", remote);
      });

      agent.on("disconnect", function (err) {
        service.emit("disconnect", err);
      });

      var transport = new BrowserTransport(socket, config.debug);
      agent.connect(transport);

    };

    register(null, { smith: service });
  }

  return setup;

});