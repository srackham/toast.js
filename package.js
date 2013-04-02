Package.describe({
  summary: 'Popup notifications library'
});

Package.on_use(function (api) {
  api.use('jquery', 'client');
  api.add_files([
    'toast.js',
    'toast.css'
  ], 'client');
});
