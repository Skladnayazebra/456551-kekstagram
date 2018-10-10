'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureFragment = document.createDocumentFragment();
  var errorDialog = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var photosData = [];

  var createPictureElement = function (pictureData) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').setAttribute('src', pictureData.url);
    picture.querySelector('.picture__likes').textContent = pictureData.likes;
    picture.querySelector('.picture__comments').textContent = String(pictureData.comments.length);
    picture.setAttribute('data-id', pictureData.id);
    return picture;
  };

  var fillPicturesContainer = function (dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
      pictureFragment.appendChild(createPictureElement(dataArray[i]));
    }
    pictures.appendChild(pictureFragment);
  };

  var showMessage = function (message) {
    main.appendChild(message);
  };


  var onLoad = function (data) {
    photosData = JSON.parse(data);
    fillPicturesContainer(photosData);
    window.photosData = photosData;
  };
  var onError = function () {
    var errorMessage = errorDialog.cloneNode(true);
    errorMessage.querySelector('.error__title').textContent = 'Всё сломалось. Зайдите позже';
    errorMessage.querySelector('.error__buttons').remove();
    showMessage(errorMessage);
  };
  window.download(onLoad, onError);

})();
