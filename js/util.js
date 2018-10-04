'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  window.util = {
    showElement: showElement,
    hideElement: hideElement,
    onEnterPressClose: onEnterPressClose,
    onEscPressClose: onEscPressClose
  };

})();
