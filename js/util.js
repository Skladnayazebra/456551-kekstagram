'use strict';

(function () {
  var ESC_KEY = 'Escape';
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

  var onEscPressCloseDialog = function (evt, dialog) {
    if (evt.key === ESC_KEY) {
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
    ESC_KEY: ESC_KEY,
    generateNumber: generateNumber,
    showElement: showElement,
    hideElement: hideElement,
    showDialog: showDialog,
    hideDialog: hideDialog,
    onEscPressCloseDialog: onEscPressCloseDialog,
    debounce: debounce
  };

})();
