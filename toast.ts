//
// Toast popup notifier
//
// By: Stuart Rackham
// https://github.com/srackham/toast.js
//
// Inspired by: https://github.com/Srirangan/notifer.js
//              https://github.com/CodeSeven/toastr
//

/// <reference path="jquery.d.ts" />

module Toast {

  /**
   * Optional parameters passed to Toast popups.
   * @type {{width: string, displayDuration: number, fadeOutDuration: number}}
   */
  export interface Options {
    width?: string;             // CSS length, overrides CSS file.
    displayDuration?: number;   // In milliseconds, set to 0 to make sticky.
    fadeOutDuration?: number;   // In milliseconds.
  };

  // Modifiable defaults.
  export var defaults: Options = {
    width: '',
    displayDuration: 2000,
    fadeOutDuration: 800
  };

  /* Popup functions */

  /**
   * Popup informational message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  export function info(message:string, title?:string, options?:Options) {
    _toast('info', message, title, options);
  }

  /**
   * Popup warning message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  export function warning(message:string, title?:string, options?:Options) {
    _toast('warning', message, title, options);
  }

  /**
   * Popup error message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  export function error(message:string, title?:string, options?:Options) {
    _toast('error', message, title, options);
  }

  /**
   * Popup success message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  export function success(message:string, title?:string, options?:Options) {
    _toast('success', message, title, options);
  }


  /* Private variables and functions */

  var _container; // Toast container DOM element.

  function _toast(
      type:     string,     // 'info', 'success', 'error', 'warning'
      message:  string,
      title?:   string,
      options: Options = {}
      ): void
  {
    options = $.extend({}, defaults, options);
    if (!_container) {
      _container = $('#toast-container');
      if (_container.length === 0) {
        // Create container element if it is not in the static HTML.
        _container = $('<div>')
            .attr('id', 'toast-container')
            .appendTo($('body'));
      }
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
      setTimeout(function () {
        toastElement.fadeOut(options.fadeOutDuration, function () {
          toastElement.remove();
        });
      }, options.displayDuration);
    }
    toastElement.on('click', function () {
      toastElement.remove();
    });
    _container.prepend(toastElement);
  }

}
this.Toast = Toast; // Fix Meteor 0.6.0 var scope incompatibility.
