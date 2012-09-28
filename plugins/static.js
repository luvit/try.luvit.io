var send = require('send');

module.exports = setup;
setup.provides = ["static"];
setup.consumes = ["http"];

function setup(config, imports, register) {
  var wrap = imports.http.wrap;

  function mountFolder(options) {
    var mount = options.mount || "/";
    var root = options.root || process.cwd();
    if (mount[mount.length - 1] !== "/") mount += "/";
    if (root[root.length - 1] !== "/") root += "/";
    wrap(function (req, res, next) {
      // TODO: don't ignore mount
      send(req, req.uri.pathname)
        .root(root)
        .on('error', next)
        .on('directory', next)
        .pipe(res);
    });
  }

  config.folders && config.folders.forEach(function (options) {
    mountFolder(options);
  });

  register(null, { "static": {
    mountFolder: mountFolder
  }});
}