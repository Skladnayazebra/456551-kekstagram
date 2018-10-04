'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a.picture');
  var pictureFragment = document.createDocumentFragment();
  var photosData = [];
  window.data.generatePhotosData(photosData);

  var createPictureElement = function (pictureData) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').setAttribute('src', pictureData.url);
    picture.querySelector('.picture__likes').textContent = pictureData.likes;
    picture.querySelector('.picture__comments').textContent = String(pictureData.comments.length);
    picture.setAttribute('data-id', pictureData.id);
    return picture;
  };

  var fillPicturesContainer = function (counter) {
    for (var i = 0; i < counter; i++) {
      pictureFragment.appendChild(createPictureElement(photosData[i]));
    }
    pictures.appendChild(pictureFragment);
  };

  fillPicturesContainer(photosData.length);
})();
