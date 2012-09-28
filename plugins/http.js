var urlParse = require('url').parse;

module.exports = setup;
setup.provides = ["http"];
function setup(config, imports, register) {

  // Our app-wide list of middleware layers
  var middlewares = [];

  // Default error handler to show stack traces
  var errorHandler = config.errorHandler || function (req, res, err) {
    res.statusCode = 500;
    if (err.code === "ENOENT") res.statusCode = 404;
    if (err.code === "EBADREQUEST") res.statusCode = 400;
    var body = err.stack + "\n";
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Length", Buffer.byteLength(body));
    res.end(body);
  };

  // Default inner config to error out with ENOENT
  middlewares[0] = config.inner || function (req, res) {
    var err = new Error("No matching route for " + req.url);
    err.code = "ENOENT";
    errorHandler(req, res, err);
  };

  var server;
  if (config.secure) {
    server = require('https').createServer(config.secure, onRequest);
  }
  else {
    server = require('http').createServer(onRequest);
  }

  function onRequest(req, res) {
    // Pre-parse the url since nearly everyone needs this
    req.uri = urlParse(req.url);
    // Run through the middleware layers in reverse order.
    var i = middlewares.length - 1;
    (function next(err) {
      if (err) return errorHandler(req, res, err);
      middlewares[i--](req, res, next);
    })();
  }

  // Wrap the app by adding another layer of middleware
  server.wrap = function (middleware) {
    return middlewares.push(middleware);
  };

  // Un-register a middleware
  server.removeMiddleware = function (middleware) {
    var index = middlewares.indexOf(middleware);
    if (index >= 0) {
      return middlewares.splice(index, 1);
    }
  };

  // Start the http server and register the http service.
  server.listen(config.port, config.host, function () {
    register(null, { http: server });
  });
}