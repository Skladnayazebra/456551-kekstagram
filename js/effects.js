'use strict';

(function () {
  // работает корректно, но на этапе доработки проекта нужно:
  // 1) сделать единую функцию для применения эффекта,
  // 2) вместо отдельных обработчков использовать общий с делегированием.
  var EFFECT_LEVEL_DEFAULT = 100;
  var imgPreview = document.querySelector('.img-upload__preview img');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelField = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value').value;

  var effectNone = document.querySelector('#effect-none');
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');

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
        imgPreview.className = '';
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
  /*
  можно попробовать вот такую модификацию:

  var styles = {
   'effect-none': '',
   'effect-chrome': 'grayscale(' + effectLevel / 100 + ')',
   'effect-sepia': 'sepia(' + effectLevel / 100 + ')',
   ...
  }

  var effectName = document.querySelector('.effects__radio:checked').id;
  imgPreview.style.filter = styles[effectName];
  */

  effectNone.addEventListener('click', function () {
    switchEffect('effects__preview--none');
    effectLevelField.classList.add('hidden');
  });

  effectChrome.addEventListener('click', function () {
    switchEffect('effects__preview--chrome');
  });

  effectSepia.addEventListener('click', function () {
    switchEffect('effects__preview--sepia');
  });

  effectMarvin.addEventListener('click', function () {
    switchEffect('effects__preview--marvin');
  });

  effectPhobos.addEventListener('click', function () {
    switchEffect('effects__preview--phobos');
  });

  effectHeat.addEventListener('click', function () {
    switchEffect('effects__preview--heat');
  });

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
    applyEffect: applyEffect
  };
})();
