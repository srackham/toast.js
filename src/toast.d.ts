/// <reference path="jquery.d.ts" />
declare module Toast {
  /**
   * Optional parameters passed to Toast popups.
   * @type {{width: string, displayDuration: number, fadeOutDuration: number}}
   */
  interface Options {
    width?: string;
    displayDuration?: number;
    fadeOutDuration?: number;
  }
  var defaults: Options;

  /**
   * Popup informational message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  function info(message: string, title?: string, options?: Options): void;

  /**
   * Popup warning message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  function warning(message: string, title?: string, options?: Options): void;

  /**
   * Popup error message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  function error(message: string, title?: string, options?: Options): void;

  /**
   * Popup success message.
   * @param message A message string.
   * @param title An optional title string.
   * @param options An optional map of {@link Options}.
   */
  function success(message: string, title?: string, options?: Options): void;
}
