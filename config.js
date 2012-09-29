module.exports = [
  {
    packagePath: "./plugins/http.js",
    port: process.env.PORT || null,
    host: process.env.IP || null
  },
  {
    packagePath: "./plugins/static.js",
    folders: [ {mount: "/", root: __dirname + "/public" } ]
  },
  {
    packagePath: "./plugins/smith.js",
    debug: process.env.DEBUG,
    url: "/smith"
  },
  {
    packagePath: "./plugins/tty.js",
    command: "cgexec",
    args: ["-g", "cpu,memory:luvit", "rlwrap", "-H", "/dev/null", "/usr/local/bin/luvit"],
    options: {
      uid: "luvit",
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: "/try.luvit.io",
      env: {
        HOME: "/try.luvit.io",
        TERM: "xterm-color"
      }
    }
  }
];