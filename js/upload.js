'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PreviewSize = {
    WIDTH: '586',
    HEIGHT: '586'
  };

  var body = document.querySelector('body');

  var imgPreview = document.querySelector('.img-upload__preview img');
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');

  var scaleControlField = document.querySelector('.scale__control--value');
  var effectLevelField = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectsList = document.querySelector('.effects__list');
  var effectNone = document.querySelector('#effect-none');
  var effectsPreviews = document.querySelectorAll('.effects__preview');

  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('.img-upload__submit');

  var successDialogTemplate = document.querySelector('#success').content.querySelector('.success');
  var failDialogTemplate = document.querySelector('#error').content.querySelector('.error');

  var onUploaderHideClean = function () {
    imgPreview.src = '';
    effectsPreviews.forEach(function (element) {
      element.src = '';
    });
    imgUploadField.value = null;
    imgPreview.className = '';
    imgPreview.style.filter = '';
    scaleControlField.value = window.effects.SCALE_DEFAULT + '%';
    imgPreview.style.transform = 'scale(' + (window.effects.SCALE_DEFAULT) / 100 + ')';
    inputHashtags.value = null;
    inputDescription.value = null;
    inputHashtags.style.border = '';
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

  var toggleListenersOn = function () {
    document.addEventListener('keydown', onUploaderEscPress);
    imgUploadOverlayCloseBtn.addEventListener('click', onUploadCloseBtnClick);
    form.addEventListener('submit', onFormSubmit);
    effectsList.addEventListener('change', window.effects.onEffectItemChecked);
    effectLevelPin.addEventListener('mousedown', window.effects.onPinMouseDown);
    submitButton.addEventListener('click', window.validation.validateHashtags);
    inputHashtags.addEventListener('input', window.validation.onHashtagsFieldInput);
  };

  var toggleListenersOff = function () {
    effectsList.removeEventListener('change', window.effects.onEffectItemChecked);
    document.removeEventListener('keydown', onUploaderEscPress);
    imgUploadOverlayCloseBtn.removeEventListener('click', onUploadCloseBtnClick);
    effectLevelPin.removeEventListener('mousedown', window.effects.onPinMouseDown);
    submitButton.removeEventListener('click', window.validation.validateHashtags);
    inputHashtags.removeEventListener('input', window.validation.onHashtagsFieldInput);
  };

  var uploadFile = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreview.src = reader.result;
        imgPreview.style.objectFit = 'cover';
        imgPreview.width = PreviewSize.WIDTH;
        imgPreview.height = PreviewSize.HEIGHT;
        effectsPreviews.forEach(function (element) {
          element.src = reader.result;
          element.style.objectFit = 'cover';
        });
      });
      reader.readAsDataURL(file);
    }
  };

  var onUploadFieldChange = function () {
    var uploadedFile = imgUploadField.files[0];
    uploadFile(uploadedFile);
    toggleListenersOn();
    imgUploadField.removeEventListener('change', onUploadFieldChange);
    effectNone.checked = true;
    window.effects.effectLevelReset();
    window.util.hideElement(effectLevelField);
    window.util.showElement(imgUploadOverlay);
    body.classList.add('modal-open');
  };

  var onUploaderEscPress = function (evt) {
    if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      if (evt.key === window.util.ESC_KEY) {
        window.util.hideElement(imgUploadOverlay);
        onUploaderHideClean();
        toggleListenersOff();
        imgUploadField.addEventListener('change', onUploadFieldChange);
        body.classList.remove('modal-open');
      }
    }
  };

  var onUploadCloseBtnClick = function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
    toggleListenersOff();
    imgUploadField.addEventListener('change', onUploadFieldChange);
    body.classList.remove('modal-open');
  };

  var onFormSubmit = function (evt) {
    window.backend.upload(new FormData(form), onSuccess, onFail);
    evt.preventDefault();
    toggleListenersOff();
    imgUploadField.addEventListener('change', onUploadFieldChange);
    body.classList.remove('modal-open');
  };

  window.upload = {
    onUploadFieldChange: onUploadFieldChange
  };

})();
