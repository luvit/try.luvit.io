var spawn = require('pty.js').spawn;

module.exports = setup;
setup.consumes = ["smith"];
setup.provides = ["tty"];

function setup(config, imports, register) {
  var terminals = [];

  var service = {
    spawn: function (callback) {
      // TODO: honor config.shell
      var term = spawn("bash");
      var fd = term.fd;
      terminals[fd] = term;
      callback(null, {
        fd: fd,
        stream: term
      });
    },
    resize: function (fd, width, height) {
      var terminal = terminals[fd];
      if (!terminal) return;
      terminal.resize(width, height);
    }
  };

  register(null, { tty: service });
}

