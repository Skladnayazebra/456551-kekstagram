'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
    var pictureFragment = document.createDocumentFragment();
    dataArray.forEach(function (element) {
      pictureFragment.appendChild(createPictureElement(element));
    });
    pictures.appendChild(pictureFragment);
  };

  var refreshPicturesContainer = function (dataArray) {
    while (pictures.lastChild.className === 'picture') {
      pictures.removeChild(pictures.lastChild);
    }
    fillPicturesContainer(dataArray);
  };

  var showMessage = function (message) {
    main.appendChild(message);
  };

  var onLoad = function (data) {
    photosData = JSON.parse(data);
    fillPicturesContainer(photosData);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    window.photosData = photosData;
  };
  var onError = function () {
    var errorMessage = errorDialog.cloneNode(true);
    errorMessage.querySelector('.error__title').textContent = 'Всё сломалось. Зайдите позже';
    errorMessage.querySelector('.error__buttons').remove();
    showMessage(errorMessage);
  };
  window.download(onLoad, onError);

  var filterPopularButton = document.querySelector('#filter-popular');
  var filterNewButton = document.querySelector('#filter-new');
  var filterDiscussedButton = document.querySelector('#filter-discussed');

  var selectFilterButton = function (button) {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterNewButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  var sortNewPhotos = function (data) {
    var sortedData = [];
    for (var i = 1; i <= NEW_PHOTOS_COUNT; i++) {
      var randomPhoto = data[window.util.generateNumber(0, (data.length - 1))];
      sortedData.push(randomPhoto);
    }
    return sortedData;
  };

  var sortDiscussedPhotos = function (data) {
    var sortedData;
    sortedData = data.slice(0).sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return sortedData;
  };

  filterPopularButton.addEventListener('click', function () {
    selectFilterButton(filterPopularButton);
    refreshPicturesContainer(window.photosData);
  });
  filterNewButton.addEventListener('click', function () {
    selectFilterButton(filterNewButton);
    refreshPicturesContainer(sortNewPhotos(window.photosData));
  });
  filterDiscussedButton.addEventListener('click', function () {
    selectFilterButton(filterDiscussedButton);
    refreshPicturesContainer(sortDiscussedPhotos(window.photosData));
  });
})();
