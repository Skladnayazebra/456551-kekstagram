'use strict';

(function () {
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');

  var imgUploaderOpen = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.effects.applyEffect(window.effects.EFFECT_LEVEL_DEFAULT);
    document.querySelector('.effect-level__value').value = '';
  };

  var imgUploaderClose = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadField.value = null;
    window.effects.applyEffect(window.effects.EFFECT_LEVEL_DEFAULT);
    inputHashtags.value = null;
    inputDescription.value = null;
  };

  var onUploadCloseBtnPressEnter = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      imgUploaderClose();
    }
  };

  var onImgOverlayEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
        imgUploaderClose();
      }
    }
  };
  document.addEventListener('keydown', onImgOverlayEscPress);
  imgUploadField.addEventListener('change', imgUploaderOpen);
  imgUploadOverlayCloseBtn.addEventListener('click', imgUploaderClose);
  imgUploadOverlayCloseBtn.addEventListener('keydown', onUploadCloseBtnPressEnter);
})();
