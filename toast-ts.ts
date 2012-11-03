//
// Toast popup notifier
//
// TypeScript port of toast.js
//
// By: Stuart Rackham
// https://github.com/srackham/toast.js
//
// Inspired by: https://github.com/Srirangan/notifer.js
//              https://github.com/CodeSeven/toastr
//

/// <reference path="jquery.d.ts" />

module Toast {

  /* Public API */

  // Modifiable default parameters.
  export var defaults = {
    width: '',                // CSS length, overrides CSS file.
    displayDuration: 2000,    // In milliseconds, set to 0 to make sticky.
    fadeOutDuration: 800      // In milliseconds.
  };

  // Popup functions:
  //
  // Toast.info    (message [,title [, options]])
  // Toast.warning (message [,title [, options]])
  // Toast.error   (message [,title [, options]])
  // Toast.success (message [,title [, options]])
  //
  // message: String
  // title:   String
  // options: Object with properties to override Toast.defaults

  export function info(message:string, title:string, options:any) {
    _notify('info', message, title, options);
  }

  export function warning(message:string, title:string, options:any) {
    _notify('warning', message, title, options);
  }

  export function error(message:string, title:string, options:any) {
    _notify('error', message, title, options);
  }

  export function success(message:string, title:string, options:any) {
    _notify('success', message, title, options);
  }


  /* Private variables and functions */

  var _container; // Toast container DOM element.

  /**
   * Display popup.
   *
   * @param {string} type 'info', 'success', 'error', 'warning'
   * @param {string} message
   * @param {string} [title]
   * @param {Object} [options] Properties override Toast.defaults.
   */
  function _notify(type:string, message:string, title:string, options:any) {
    options = $.extend({}, defaults, options);
    if (!_container) {
      _container = $('<div>')
        .attr('id', 'toast-container')
        .appendTo($('body'));
    }
    if (options.width) {
      _container.css({width: options.width});
    }
    var toastElement = $('<div>')
      .addClass('toast')
      .addClass('toast-' + type);
    if (title) {
      var titleElement = $('<div>').addClass('toast-title').append(title);
      toastElement.append(titleElement);
    }
    if (message) {
      var messageElement = $('<div>').addClass('toast-message').append(message);
      toastElement.append(messageElement);
    }
    if (options.displayDuration > 0) {
      setTimeout(function() {
        toastElement.fadeOut(options.fadeOutDuration, function() {
          toastElement.remove();
        });
      }, options.displayDuration);
    }
    toastElement.on('click', function() {
      toastElement.remove();
    });
    _container.prepend(toastElement);
  }

}
