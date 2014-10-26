var TOAST_SELECTOR = 'body div#toast-container div.toast-info';

QUnit.test('Sticky toast', function(assert) {
  Toast.info('Message', 'Sticky toast', {displayDuration: 0});
  var container = $(TOAST_SELECTOR);
  assert.ok(container.length > 0, 'Create toast container element');
  assert.ok(container.find('div.toast-title').text() === 'Sticky toast', 'Toast title');
  assert.ok(container.find('div.toast-message').text() === 'Message', 'Toast message');
  container.trigger('click');
  container = $(TOAST_SELECTOR);
  assert.ok(container.length === 0, 'Delete toast container element');
});

QUnit.test('Timeout toast', function(assert) {
  Toast.defaults.width = '600px';
  Toast.defaults.displayDuration = 1000;
  Toast.defaults.fadeOutDuration = 300;
  Toast.info('Message', 'Timeout toast');
  var container = $(TOAST_SELECTOR);
  assert.ok(container.length > 0, 'Create toast container element');
  assert.ok(container.find('div.toast-title').text() === 'Timeout toast', 'Toast title');
  assert.ok(container.find('div.toast-message').text() === 'Message', 'Toast message');
  assert.ok(container.parent().css('width') === Toast.defaults.width, 'Toast width');
  // Stop test and wait for toast to timeout and close.
  stop();
  setTimeout(function() {
    container = $(TOAST_SELECTOR);
    assert.ok(container.length > 0, 'Toast not yet timed out');
    setTimeout(function() {
      container = $(TOAST_SELECTOR);
      assert.ok(container.length === 0, 'Toast timed out');
      start();  // Restart test.
    }, 200);
  }, Toast.defaults.displayDuration + Toast.defaults.fadeOutDuration - 100);
});
