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
    packagePath: "./plugins/smith-transport.js",
    debug: true,
    url: "/smith"
  },
  {
    packagePath: "./plugins/tty.js",
    shell: [""]
  }
];