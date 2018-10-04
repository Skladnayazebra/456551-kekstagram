'use strict';

(function () {
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;
  var imgPreview = document.querySelector('.img-upload__preview img');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlField = document.querySelector('.scale__control--value');
  var currentScale = SCALE_DEFAULT;

  var decreaseSize = function () {
    if (currentScale > SCALE_MIN) {
      scaleControlField.value = (currentScale - SCALE_STEP) + '%';
      imgPreview.style.transform = 'scale(' + (currentScale - SCALE_STEP) / 100 + ')';
      currentScale -= SCALE_STEP;
    }
  };

  var increaseSize = function () {
    if (currentScale < SCALE_MAX) {
      scaleControlField.value = (currentScale + SCALE_STEP) + '%';
      imgPreview.style.transform = 'scale(' + (currentScale + SCALE_STEP) / 100 + ')';
      currentScale += SCALE_STEP;
    }
  };

  scaleControlSmaller.addEventListener('click', decreaseSize);
  scaleControlBigger.addEventListener('click', increaseSize);
})();
