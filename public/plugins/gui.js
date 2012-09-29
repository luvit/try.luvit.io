define(["tty"], function (tty) {

  setup.consumes = ["tty"];

  function setup(config, imports, register) {

    var termDiv = document.getElementById("terminal");
    if ((/\bugly\b/).test(window.location.search)) {
      termDiv.style.fontFamily = "Programmer Font";
      termDiv.style.fontSize = "20pt";
    }


    imports.tty.spawn(function (err, terminal) {
      if (err) throw err;


      var box = new tty.Terminal(80, 24, function (chunk) {
          terminal.write(chunk);
      });
      box.open(termDiv);
      terminal.onData = box.write.bind(box);
      terminal.onExit = function (code) {
        alert("Exited with code " + code);
      };
      function resize() {
          var w = box.element.clientWidth / box.cols;
          var h = box.element.clientHeight / box.rows;
          var cols = (window.innerWidth / w) | 0;
          var rows = (window.innerHeight / h) | 0;
          terminal.resize(cols, rows);
          box.resize(cols, rows);
      }
      window.addEventListener('resize', resize, true);
      resize();
      box.on("title", function (title) {
          document.title = title;
      });

    });

    register();
  }

  return setup;

});