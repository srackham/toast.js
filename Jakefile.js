/*
 * Jakefile for toast.js (https://github.com/srackham/toast.js).
 */
'use strict';

var pkg = require('./package.json');
var shelljs = require('shelljs');
var child_process = require('child_process');


/* Inputs and outputs */

var TOAST_JS = './dist/toast.js';
var TOAST_TS = './src/toast.ts';
var TOAST_MIN_JS = './dist/toast.min.js';


/* Utility functions. */

/*
 Execute shell commands in parallel then run the callback when they have all finished.
 `callback` defaults to the Jake async `complete` function.
 Abort if an error occurs.
 Write command output to the inherited stdout (unless the Jake --quiet option is set).
 Print a status message when each command starts and finishes (unless the Jake --quiet option is set).

 NOTE: This function is similar to the built-in jake.exec function but is twice as fast.
 */
function exec(commands, callback) {
  if (typeof commands === 'string') {
    commands = [commands];
  }
  callback = callback || complete;
  var remaining = commands.length;
  if (remaining === 0) {
    callback();
  } else {
    commands.forEach(function(command) {
      jake.logger.log('Starting: ' + command);
      child_process.exec(command, function(error, stdout, stderr) {
        jake.logger.log('Finished: ' + command);
        if (!jake.program.opts.quiet) {
          process.stdout.write(stdout);
        }
        if (error !== null) {
          fail(error, error.code);
        }
        remaining--;
        if (remaining === 0) {
          callback();
        }
      });
    });
  }
}


/*
 Tasks

 All tasks are synchronous (another task will not run until the current task has completed).
 Consequently all task dependencies are executed asynchronously in declaration order.
 The `exec` function ensures shell commands within each task run in parallel.
 */

desc('Run test task.');
task('default', ['test']);

desc('compile, lint, test, validate HTML.');
task('build', ['test', 'validate-html']);

desc('Update version number, tag and push to Github. Use vers=x.y.z argument to set a new version number.');
task('release', ['build', 'version', 'tag', 'push']);

desc('Lint source files.');
task('lint', {async: true}, function() {
  var commands = [];
  commands.push('jsonlint --quiet package.json');
  commands.push('tslint -f ' + TOAST_TS);
  exec(commands);
});

desc('Run tests (see ./test/index.html for QUnit tests).');
task('test', ['compile', 'lint']);

desc('Compile Typescript to JavaScript then uglify.');
task('compile', [TOAST_JS, TOAST_MIN_JS]);

file(TOAST_JS, [TOAST_TS], {async: true}, function() {
  exec('tsc --noImplicitAny --out ' + TOAST_JS + ' ' + TOAST_TS);
});

file(TOAST_MIN_JS, [TOAST_JS], {async: true}, function() {
  var preamble = '/* ' + pkg.name + ' ' + pkg.version + ' (' + pkg.repository.url + ') */';
  var command = 'uglifyjs  --preamble "' + preamble + '" --output ' + TOAST_MIN_JS + ' ' + TOAST_JS;
  exec(command);
});

desc('Validate HTML documents with W3C Validator.');
task('validate-html', {async: true}, function() {
  var commands = [];
  commands.push('w3cjs validate ./doc/toast-examples.html');
  exec(commands);
});

desc('Display or update the project version number. Use vers=x.y.z argument to set a new version number.');
task('version', function() {
  var version = process.env.vers;
  if (!version) {
    console.log('\nversion: ' + pkg.version);
  }
  else {
    if (!version.match(/^\d+\.\d+\.\d+$/)) {
      fail('Invalid version number: ' + version + '\n');
    }
    shelljs.sed('-i', /(\n\s*"version"\s*:\s*)"\d+\.\d+\.\d+"/, '$1' + '"' + version + '"', 'package.json');
    pkg.version = version;
  }
});

desc('Create tag ' + pkg.version);
task('tag', ['test'], {async: true}, function() {
  exec('git tag -a -m "Tag ' + pkg.version + '" ' + pkg.version);
});

desc('Commit changes to local Git repo.');
task('commit', ['test'], {async: true}, function() {
  jake.exec('git commit -a', {interactive: true}, complete);
});

/*
desc('push, publish-npm.');
task('publish', ['push', 'publish-npm']);
*/

desc('Push local commits to Github.');
task('push', ['test'], {async: true}, function() {
  exec('git push -u --tags origin master');
});

/*
desc('Publish to npm.');
task('publish-npm', {async: true}, ['test'], function() {
  exec('npm publish');
});
*/

