'use strict';

(function () {

  var imgPreview = document.querySelector('.img-upload__preview img');
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');

  var scaleControlField = document.querySelector('.scale__control--value');
  var effectLevelField = document.querySelector('.img-upload__effect-level');
  var effectsList = document.querySelector('.effects__list');
  var effectNone = document.querySelector('#effect-none');

  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');

  var successDialogTemplate = document.querySelector('#success').content.querySelector('.success');
  var failDialogTemplate = document.querySelector('#error').content.querySelector('.error');

  var onUploaderHideClean = function () {
    imgUploadField.value = null;
    effectNone.checked = 'true';
    imgPreview.className = '';
    imgPreview.style.filter = '';
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

    var onSuccessDialogEscPress = function (evt) {
      window.util.onEscPressCloseDialog(evt, successDialog);
      document.removeEventListener('click', onScreenClick);
      document.removeEventListener('keydown', onSuccessDialogEscPress);
    };
    document.addEventListener('keydown', onSuccessDialogEscPress);

    var onScreenClick = function () {
      window.util.hideDialog(successDialog);
      document.removeEventListener('click', onScreenClick);
      document.removeEventListener('keydown', onSuccessDialogEscPress);
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

  var toggleListenersOn = function () {
    document.addEventListener('keydown', onUploaderEscPress);
    imgUploadOverlayCloseBtn.addEventListener('click', onUploadCloseBtnClick);
    form.addEventListener('submit', onFormSubmit);
    effectsList.addEventListener('change', window.effects.onEffectItemChecked);
    imgUploadField.removeEventListener('change', onUploadFieldChange);
  };

  var toggleListenersOff = function () {
    effectsList.removeEventListener('change', window.effects.onEffectItemChecked);
    document.removeEventListener('keydown', onUploaderEscPress);
    imgUploadOverlayCloseBtn.removeEventListener('click', onUploadCloseBtnClick);
    imgUploadField.addEventListener('change', onUploadFieldChange);
  };

  var onUploaderEscPress = function (evt) {
    if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      window.util.onEscPressClose(evt, imgUploadOverlay);
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        onUploaderHideClean();
        toggleListenersOff();
      }
    }
  };

  var onUploadFieldChange = function () {
    window.util.showElement(imgUploadOverlay);
    toggleListenersOn();
    effectNone.checked = true;
    window.util.hideElement(effectLevelField);
  };

  var onUploadCloseBtnClick = function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
    toggleListenersOff();
  };

  var onFormSubmit = function (evt) {
    window.backend.upload(new FormData(form), onSuccess, onFail);
    evt.preventDefault();
    toggleListenersOff();
  };

  window.upload = {
    onUploadFieldChange: onUploadFieldChange
  };

})();
