define(["tty"], function (tty) {

  setup.consumes = ["smith"];
  setup.provides = ["tty"];

  function setup(options, imports, register) {
    var service = {};
    register(null, { tty: service });
  }

  return setup;

});