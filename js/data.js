'use strict';

(function () {
  var generateNumber = function (min, max) {
    var number;
    number = Math.floor(Math.random() * (max + 1 - min) + min);
    return number;
  };
  // сейчас генератор используется только при рандомизации аватарок комментариев
  window.data = {
    generateNumber: generateNumber
  };
})();
