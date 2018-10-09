'use strict';

(function () {
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var successDialogTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = document.querySelector('.success__button')
  var failDialogTemplate = document.querySelector('#error').content.querySelector('.error');
  var body = document.querySelector('body');

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

  var onSuccess = function () {
    window.util.hideElement(imgUploadOverlay);
    var successMessage = successDialogTemplate.cloneNode(true);
    body.appendChild(successMessage);


  };

  var onFail = function () {
    var failMessage = failDialogTemplate.cloneNode(true);
    body.appendChild(failMessage);
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

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, onFail);
    evt.preventDefault();
  });

})();
