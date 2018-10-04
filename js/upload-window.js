'use strict';

(function () {
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');

  var onUploadOverlaySetEffect = function () {
    window.effects.applyEffect(window.effects.EFFECT_LEVEL_DEFAULT);
    document.querySelector('.effect-level__value').value = '';
  };

  var onUploaderOverlayClean = function () {
    imgUploadField.value = null;
    window.effects.applyEffect(window.effects.EFFECT_LEVEL_DEFAULT);
    inputHashtags.value = null;
    inputDescription.value = null;
  };

  imgUploadField.addEventListener('change', function () {
    window.util.showElement(imgUploadOverlay);
    onUploadOverlaySetEffect();
  });
  document.addEventListener('keydown', function (evt) {
    if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      window.util.onEscPressClose(evt, imgUploadOverlay);
      onUploaderOverlayClean();
    }
  });
  imgUploadOverlayCloseBtn.addEventListener('click', function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderOverlayClean();
  });
  imgUploadOverlayCloseBtn.addEventListener('keydown', function (evt) {
    window.util.onEnterPressClose(evt, imgUploadOverlay);
    onUploaderOverlayClean();
  });
})();
