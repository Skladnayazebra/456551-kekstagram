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
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlField = document.querySelector('.scale__control--value');

  var currentScale = SCALE_DEFAULT;

  var onScaleSmallerClick = function () {
    if (currentScale > SCALE_MIN) {
      scaleControlField.value = (currentScale - SCALE_STEP) + '%';
      imgPreview.style.transform = 'scale(' + (currentScale - SCALE_STEP) / 100 + ')';
      currentScale -= SCALE_STEP;
    }
  };

  var onScaleBiggerClick = function () {
    if (currentScale < SCALE_MAX) {
      scaleControlField.value = (currentScale + SCALE_STEP) + '%';
      imgPreview.style.transform = 'scale(' + (currentScale + SCALE_STEP) / 100 + ')';
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

  var onEffectItemClick = function (evt) {
    if (evt.target.closest('.effects__radio')) {
      var effectId = evt.target.closest('.effects__radio').id;
      imgPreview.className = '';
      imgPreview.classList.add(effectIdToImgClass[effectId]);
    }
  };

  var switchEffect = function (effectClass) {
    imgPreview.style.filter = '';
    imgPreview.className = effectClass;
    effectLevelField.classList.remove('hidden');
    effectLevelPin.style.left = EFFECT_LEVEL_DEFAULT + '%';
    effectLevelDepth.style.width = EFFECT_LEVEL_DEFAULT + '%';
    document.querySelector('.effect-level__value').value = String(EFFECT_LEVEL_DEFAULT);
  };

  var applyEffect = function (effectLevel) {
    switch (document.querySelector('.effects__radio:checked').id) {
      case 'effect-none' :
        effectLevelField.classList.add('hidden');
        document.querySelector('.effect-level__value').value = '';
        break;
      case 'effect-chrome' :
        imgPreview.style.filter = 'grayscale(' + effectLevel / 100 + ')';
        break;
      case 'effect-sepia' :
        imgPreview.style.filter = 'sepia(' + effectLevel / 100 + ')';
        break;
      case 'effect-marvin' :
        imgPreview.style.filter = 'invert(' + effectLevel + '%)';
        break;
      case 'effect-phobos' :
        imgPreview.style.filter = 'blur(' + effectLevel / 100 * 3 + 'px)';
        break;
      case 'effect-heat' :
        imgPreview.style.filter = 'brightness(' + (1 + effectLevel / 100 * 2) + ')';
        break;
    }
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
        effectLevelValue = Math.round(pinPosition / effectLineWidth * 100);
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

  effectLevelPin.addEventListener('mousedown', onPinMouseDown);

  window.effects = {
    EFFECT_LEVEL_DEFAULT: EFFECT_LEVEL_DEFAULT,
    SCALE_DEFAULT: SCALE_DEFAULT,
    applyEffect: applyEffect,
    onEffectItemClick: onEffectItemClick
  };
})();
