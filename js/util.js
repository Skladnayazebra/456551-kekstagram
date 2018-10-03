'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var elementOpen = function (element) {
    element.classList.remove('hidden');
  };

  var elementClose = function (element) {
    element.classList.add('hidden');
  };

  var onEnterPressClose = function (evt, element) {
    if (evt.keyCode === ENTER_KEYCODE) {
      elementClose(element);
    }
  };

  var onEscPressClose = function (evt, element) {
    if (evt.keyCode === ESC_KEYCODE) {
      elementClose(element);
    }
  };

  window.util = {
    elementOpen: elementOpen,
    elementClose: elementClose,
    onEnterPressClose: onEnterPressClose,
    onEscPressClose: onEscPressClose
  };

})();
