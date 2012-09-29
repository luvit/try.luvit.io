define(function () {

  setup.consumes = ["smith"];
  setup.provides = ["tty"];

  function setup(config, imports, register) {
    var service = {};

    var terminals = service.terminals = [];

    imports.smith.on("setup", function (api) {
      api.onData = onData;
      api.onExit = onExit;
      api.life = life;
    });

    function life(callback) {}

    function onData(fd, chunk) {
      var terminal = terminals[fd];
      if (!terminal) return;
      terminal.onData && terminal.onData(chunk);
    }

    function onExit(fd, code) {
      var terminal = terminals[fd];
      if (!terminal) return;
      delete terminals[fd];
      terminal.onExit && terminal.onExit(code);
    }

    imports.smith.once("connect", function (remote) {
      service.spawn = function (callback) {
        remote.spawn(function (err, fd) {
          if (err) return callback(err);
          var terminal = new Terminal(fd, remote);
          terminals[fd] = terminal;
          callback(null, terminal);
          remote.life(function (err) {
            onExit(fd, err.code);
          });
        });
      };

      register(null, {tty: service });
    });

    function Terminal(fd, remote) {
      this.fd = fd;
      this.remote = remote;
    }

    Terminal.prototype.write = function (chunk) {
      this.remote.write(this.fd, chunk);
    };

    Terminal.prototype.end = function () {
      this.remote.end(this.fd);
    };

    Terminal.prototype.resize = function (cols, rows) {
      this.remote.resize(this.fd, cols, rows);
    };
  }

  return setup;

});