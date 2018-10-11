'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 200; // ms

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

  var onEnterPressClose = function (evt, element) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideElement(element);
    }
  };

  var onEscPressClose = function (evt, element) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideElement(element);
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
    generateNumber: generateNumber,
    showElement: showElement,
    hideElement: hideElement,
    onEnterPressClose: onEnterPressClose,
    onEscPressClose: onEscPressClose,
    debounce: debounce
  };

})();
