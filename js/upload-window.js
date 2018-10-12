'use strict';

(function () {
  var imgPreview = document.querySelector('.img-upload__preview img');
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');
  var scaleControlField = document.querySelector('.scale__control--value');
  var effectNone = document.querySelector('#effect-none');
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
    effectNone.checked = 'true';
    imgPreview.className = '';
    scaleControlField.value = window.effects.SCALE_DEFAULT + '%';
    imgPreview.style.transform = 'scale(' + (window.effects.SCALE_DEFAULT) / 100 + ')';
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

    var onSuccessDialogEscPress = function (evt) {
      window.util.onEscPressCloseDialog(evt, successDialog);
      document.removeEventListener('keydown', onSuccessDialogEscPress);
    };
    document.addEventListener('keydown', onSuccessDialogEscPress);

    var onScreenClick = function () {
      window.util.hideDialog(successDialog);
      document.removeEventListener('click', onScreenClick);
    };
    document.addEventListener('click', onScreenClick);
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

    var onFailDialogEscPress = function (evt) {
      window.util.onEscPressCloseDialog(evt, failDialog);
      document.removeEventListener('keydown', onFailDialogEscPress);
    };
    document.addEventListener('keydown', onFailDialogEscPress);

    var onScreenClick = function () {
      window.util.hideDialog(failDialog);
      document.removeEventListener('click', onScreenClick);
    };
    document.addEventListener('click', onScreenClick);
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
    document.addEventListener('keydown', onUploaderEscPress);
  });

  imgUploadOverlayCloseBtn.addEventListener('click', function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
    document.removeEventListener('keydown', onUploaderEscPress);
  });

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, onFail);
    evt.preventDefault();
    document.removeEventListener('keydown', onUploaderEscPress);
  });

})();
