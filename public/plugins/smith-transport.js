define(["smith"], function (smith) {

  setup.provides = ["smith"];

  function setup(options, imports, register) {
    var service = {};
    register(null, { smith: service });
  }

  return setup;

});