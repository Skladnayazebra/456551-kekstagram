'use strict';

(function () {
  var imgUploadField = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadOverlayCloseBtn = document.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var form = document.querySelector('.img-upload__form');
  var successDialog = document.querySelector('#success').content.querySelector('.success');
  var failDialog = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

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

  var showMessage = function (message) {
    main.appendChild(message);
  };

  var hideMessage = function (message) {
    main.removeChild(message);
  };

  var onSuccess = function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
    var successMessage = successDialog.cloneNode(true);
    showMessage(successMessage);
    var successButton = document.querySelector('.success__button');
    var onSuccessButtonClick = function () {
      hideMessage(successMessage);
      successButton.removeEventListener('click', onSuccessButtonClick);
    };
    successButton.addEventListener('click', onSuccessButtonClick);
  };

  // нужно дополнительно подумать над поведением при нажатии разных кпопок на уведомлениях
  var onFail = function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
    var failMessage = failDialog.cloneNode(true);
    showMessage(failMessage);
    var failButtonRestart = document.querySelector('.error__button--restart');
    var onButtonRestartClick = function () {
      hideMessage(failMessage);
      failButtonRestart.removeEventListener('click', onButtonRestartClick);
    };
    failButtonRestart.addEventListener('click', onButtonRestartClick);
    var failButtonAnother = document.querySelector('.error__button--another');
    var onButtonAnotherClick = function () {
      hideMessage(failMessage);
      window.util.hideElement(imgUploadOverlay);
      failButtonAnother.removeEventListener('click', onButtonAnotherClick);
    };
    failButtonAnother.addEventListener('click', onButtonAnotherClick);
  };
  // нарушение принципа DRY. Позже разберусь, как сделать всё коротко и красиво

  imgUploadField.addEventListener('change', function () {
    window.util.showElement(imgUploadOverlay);
    onUploadOverlaySetEffect();
  });
  document.addEventListener('keydown', function (evt) {
    if (document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
      window.util.onEscPressClose(evt, imgUploadOverlay);
      onUploaderHideClean();
    }
  });
  imgUploadOverlayCloseBtn.addEventListener('click', function () {
    window.util.hideElement(imgUploadOverlay);
    onUploaderHideClean();
  });
  imgUploadOverlayCloseBtn.addEventListener('keydown', function (evt) {
    window.util.onEnterPressClose(evt, imgUploadOverlay);
    onUploaderHideClean();
  });

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, onFail);
    evt.preventDefault();
  });

})();