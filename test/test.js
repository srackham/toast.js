QUnit.test('Sticky toast', function(assert) {
  Toast.info('Message', 'Sticky toast', {displayDuration: 0});
  var container = $('body div#toast-container div.toast-info');
  assert.ok(container.length > 0, 'Create toast container element');
  assert.ok(container.find('div.toast-title').text() === 'Sticky toast', 'Toast title');
  assert.ok(container.find('div.toast-message').text() === 'Message', 'Toast message');
  container.trigger('click');
  container = $('body div#toast-container div.toast-info');
  assert.ok(container.length === 0, 'Delete toast container element');
});

QUnit.test('Timeout toast', function(assert) {
  Toast.info('Message', 'Timeout toast');
  var container = $('body div#toast-container div.toast-info');
  assert.ok(container.length > 0, 'Create toast container element');
  assert.ok(container.find('div.toast-title').text() === 'Timeout toast', 'Toast title');
  assert.ok(container.find('div.toast-message').text() === 'Message', 'Toast message');
  // Stop test and wait for toast to fade away.
  stop();
  setTimeout(function() {
    container = $('body div#toast-container div.toast-info');
    assert.ok(container.length === 0, 'Delete toast container element');
    start();  // Restart test.
  }, Toast.defaults.displayDuration + Toast.defaults.fadeOutDuration + 100);
});
