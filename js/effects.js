'use strict';

(function () {
  // работает корректно, но на этапе доработки проекта нужно:
  // 1) сделать единую функцию для применения эффекта,
  // 2) вместо отдельных обработчков использовать общий с делегированием.
  var EFFECT_LEVEL_DEFAULT = 100;
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;

  var imgPreview = document.querySelector('.img-upload__preview img');
  var imgContainer = document.querySelector('.img-upload__preview');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlField = document.querySelector('.scale__control--value');

  var currentScale = SCALE_DEFAULT;

  var onScaleSmallerClick = function () {
    if (currentScale > SCALE_MIN) {
      scaleControlField.value = (currentScale - SCALE_STEP) + '%';
      imgContainer.style.transform = 'scale(' + (currentScale - SCALE_STEP) / 100 + ')';
      currentScale -= SCALE_STEP;
    }
  };

  var onScaleBiggerClick = function () {
    if (currentScale < SCALE_MAX) {
      scaleControlField.value = (currentScale + SCALE_STEP) + '%';
      imgContainer.style.transform = 'scale(' + (currentScale + SCALE_STEP) / 100 + ')';
      currentScale += SCALE_STEP;
    }
  };

  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelField = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value').value;

  var effectIdToImgClass = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };

  var effectLevelReset = function () {
    effectLevelPin.style.left = EFFECT_LEVEL_DEFAULT + '%';
    effectLevelDepth.style.width = EFFECT_LEVEL_DEFAULT + '%';
    effectLevelValue = String(EFFECT_LEVEL_DEFAULT);
  };

  var onEffectItemChecked = function (evt) {
    if (evt.target.closest('.effects__radio')) {
      var effectId = evt.target.closest('.effects__radio').id;
      imgPreview.style.filter = '';
      imgPreview.className = '';
      imgPreview.classList.add(effectIdToImgClass[effectId]);
      effectLevelReset();

      window.util.showElement(effectLevelField);
      if (effectId === 'effect-none') {
        window.util.hideElement(effectLevelField);
      }
    }
  };

  var applyEffect = function (effectLevel) {
    switch (imgPreview.className) {
      case 'effects__preview--chrome' :
        imgPreview.style.filter = 'grayscale(' + effectLevel / 100 + ')';
        break;
      case 'effects__preview--sepia' :
        imgPreview.style.filter = 'sepia(' + effectLevel / 100 + ')';
        break;
      case 'effects__preview--marvin' :
        imgPreview.style.filter = 'invert(' + effectLevel + '%)';
        break;
      case 'effects__preview--phobos' :
        imgPreview.style.filter = 'blur(' + effectLevel / 100 * 3 + 'px)';
        break;
      case 'effects__preview--heat' :
        imgPreview.style.filter = 'brightness(' + (1 + effectLevel / 100 * 2) + ')';
        break;
    }
    var classToEffect = {
      'effects__preview--chrome': 'grayscale(' + effectLevel / 100 + ')',
      'effects__preview--sepia': 'sepia(' + effectLevel / 100 + ')'
    };
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();
    var effectLineStart = effectLevelLine.getBoundingClientRect().x;
    var effectLineWidth = effectLevelLine.getBoundingClientRect().width;

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var pinPosition = moveEvt.clientX - effectLineStart;
      if (pinPosition >= 0 && pinPosition <= effectLineWidth) {
        effectLevelPin.style.left = pinPosition + 'px';
        effectLevelDepth.style.width = pinPosition + 'px';
        effectLevelValue = String(Math.round(pinPosition / effectLineWidth * 100));
        document.querySelector('.effect-level__value').value = String(effectLevelValue);
        applyEffect(effectLevelValue);
      }
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  window.effects = {
    EFFECT_LEVEL_DEFAULT: EFFECT_LEVEL_DEFAULT,
    SCALE_DEFAULT: SCALE_DEFAULT,
    effectLevelReset: effectLevelReset,
    onEffectItemChecked: onEffectItemChecked,
    onPinMouseDown: onPinMouseDown
  };
})();
