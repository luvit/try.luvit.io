var architect = require('architect');
var config = architect.loadConfig(__dirname + "/config.js");
architect.createApp(config, function (err, app) {
   if (err) throw err;
   var address = app.services.http.address();
   console.log("App listening as", address);
});
