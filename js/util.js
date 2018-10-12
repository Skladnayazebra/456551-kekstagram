'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var main = document.querySelector('main');

  var generateNumber = function (min, max) {
    var number;
    number = Math.floor(Math.random() * (max + 1 - min) + min);
    return number;
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var showDialog = function (dialog) {
    main.appendChild(dialog);
  };

  var hideDialog = function (dialog) {
    main.removeChild(dialog);
  };

  var onEscPressClose = function (evt, element) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideElement(element);
    }
  };

  var onEscPressCloseDialog = function (evt, dialog) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideDialog(dialog);
    }
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    generateNumber: generateNumber,
    showElement: showElement,
    hideElement: hideElement,
    showDialog: showDialog,
    hideDialog: hideDialog,
    onEscPressClose: onEscPressClose,
    onEscPressCloseDialog: onEscPressCloseDialog,
    debounce: debounce
  };

})();
