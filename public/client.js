require(['architect'], function (architect) {
  architect.resolveConfig([
    {
      packagePath: "plugins/smith-transport.js",
      debug: true,
      url: "/smith"
    },
    "plugins/tty.js"
  ], function (err, config) {
    if (err) throw err;
    window.app = architect.createApp(config);
  });
});