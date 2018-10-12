'use strict';

(function () {
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var successDialogTemplate = document.querySelector('#success').content.querySelector('.success');
  var failDialogTemplate = document.querySelector('#error').content.querySelector('.error');

  var onUploadOverlaySetEffect = function () {
    window.effects.applyEffect(window.effects.EFFECT_LEVEL_DEFAULT);
    document.querySelector('.effect-level__value').value = '';
  };

  var onUploaderHideClean = function () {
    imgUploadField.value = null;
    window.effects.applyEffect(window.effects.EFFECT_LEVEL_DEFAULT);
    inputHashtags.value = null;
    inputDescription.value = null;
  };

  var onSuccess = function (message) {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();

    var successDialog = successDialogTemplate.cloneNode(true);
    successDialog.querySelector('.success__title').textContent = message;
    window.util.showDialog(successDialog);

    var successButton = document.querySelector('.success__button');
    var onSuccessButtonClick = function () {
      window.util.hideDialog(successDialog);
      successButton.removeEventListener('click', onSuccessButtonClick);
    };
    successButton.addEventListener('click', onSuccessButtonClick);
  };

  var onFail = function (message) {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();

    var failDialog = failDialogTemplate.cloneNode(true);
    failDialog.querySelector('.error__title').textContent = message;
    window.util.showDialog(failDialog);

    var failButtonRestart = document.querySelector('.error__button--restart');
    var onButtonRestartClick = function () {
      window.util.hideDialog(failDialog);
      failButtonRestart.removeEventListener('click', onButtonRestartClick);
    };
    failButtonRestart.addEventListener('click', onButtonRestartClick);

    var failButtonAnother = document.querySelector('.error__button--another');
    var onButtonAnotherClick = function () {
      window.util.hideDialog(failDialog);
      window.util.hideElement(imgUploadOverlay);
      failButtonAnother.removeEventListener('click', onButtonAnotherClick);
    };
    failButtonAnother.addEventListener('click', onButtonAnotherClick);
  };
  // Позже разберусь, как сделать всё коротко и красиво

  var onUploaderEscPress = function (evt) {
    if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      window.util.onEscPressClose(evt, imgUploadOverlay);
      onUploaderHideClean();
    }
  };

  imgUploadField.addEventListener('change', function () {
    window.util.showElement(imgUploadOverlay);
    onUploadOverlaySetEffect();
  });

  document.addEventListener('keydown', onUploaderEscPress);

  imgUploadOverlayCloseBtn.addEventListener('click', function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
  });

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, onFail);
    evt.preventDefault();
  });

})();
