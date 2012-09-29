var spawnPty = require('pty.js').spawn;

module.exports = setup;
setup.consumes = ["smith"];

function setup(config, imports, register) {
  var terminals = [];

  var command = config.command;
  var args = config.args || [];
  var options = config.options || {};

  imports.smith.on("setup", function (api) {
    api.spawn = spawn;
    api.write = write;
    api.end = end;
    api.resize = resize;
    api.life = life;
  });

  function life(callback) {}

  function spawn(callback) {
    var remote = this.remoteApi;
    var term = spawnPty(command, args, options);
    var fd = term.fd;
    console.log("Term created ", fd);
    remote.life(function (err) {
      term.kill();
    });
    terminals[fd] = term;
    term.on('data', function(chunk) {
      remote.onData(fd, chunk);
    });
    term.on('exit', function(code) {
      console.log("Term exited ", fd, code);
      delete terminals[fd];
      remote.onExit(fd, code);
    });
    callback(null, fd);
  }

  function write(fd, chunk) {
    var terminal = terminals[fd];
    if (!terminal) return;
    terminal.write(chunk);
  }

  function end(fd, chunk) {
    var terminal = terminals[fd];
    if (!terminal) return;
    terminal.end();
  }

  function resize(fd, width, height) {
    var terminal = terminals[fd];
    if (!terminal) return;
    terminal.resize(width, height);
  }

  register();
}

