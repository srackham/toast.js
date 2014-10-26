QUnit.test('Sticky toast', function(assert) {
  Toast.info('Message', 'Title', {displayDuration: 0});
  var container = $('body div#toast-container div.toast-info');
  assert.ok(container.length > 0, 'Create toast container element');
  assert.ok(container.find('div.toast-title').text() === 'Title', 'Toast title');
  assert.ok(container.find('div.toast-message').text() === 'Message', 'Toast message');
  container.trigger('click');
  container = $('body div#toast-container div.toast-info');
  assert.ok(container.length === 0, 'Delete toast container element');
});
