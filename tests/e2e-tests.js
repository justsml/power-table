//const casper = require('casper').create()
const URL = 'http://0.0.0.0:1337/tests/index.html'
const VIEWPORT = {
  top: 0,
  left: 0,
  width: 1280,
  height: 900
};
const CAPTURE_FORMAT = {
  format: 'jpg',
  quality: 85
};

casper.options.verbose = true;
casper.options.viewportSize = { width: VIEWPORT.width, height: VIEWPORT.height };

casper.test.begin('has created PowerTable', 3, function (test) {
  // casper.on('complete.error', function(err) {
  //   this.die("Complete callback has failed: " + err);
  // });

  casper.start('http://0.0.0.0:1337/tests/index.html', function () {
    this.echo('Loaded')
  }).waitForText('Table', function () {
    test.assertTextExists('Table', 'page body contains "Table"')
    // this.echo('page body contains "Table"')
  }).waitUntilVisible('.power-table',
    function _then() { this.echo('Has power-table loaded...') },
    function _failed() { this.echo('Has power-table loaded...') }, 6000);

  casper.then(function () {
    test.assertExists('.power-table tbody');
    test.assertExists('.power-table thead');
  })
  casper.run(function () {
    test.done();
  });
  // this.capture('temp/scroll-test-2-1.jpg', VIEWPORT, CAPTURE_FORMAT);
});

