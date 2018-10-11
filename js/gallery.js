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

  var refreshPics = function (dataArray) {
    while (pictures.lastChild.className === 'picture') {
      pictures.removeChild(pictures.lastChild);
    }
    fillPicturesContainer(dataArray);
  };

  var refreshPicsDebounced = window.util.debounce(refreshPics);

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
    return data.slice(0)
      .sort(function () {
        return Math.random() < 0.5 ? 1 : -1;
      })
      .slice(0, (NEW_PHOTOS_COUNT));
  };

  var sortDiscussedPhotos = function (data) {
    return data.slice(0).sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  filterPopularButton.addEventListener('click', function () {
    selectFilterButton(filterPopularButton);
    refreshPicsDebounced(window.photosData);
  });
  filterNewButton.addEventListener('click', function () {
    selectFilterButton(filterNewButton);
    refreshPicsDebounced(sortNewPhotos(window.photosData));
  });
  filterDiscussedButton.addEventListener('click', function () {
    selectFilterButton(filterDiscussedButton);
    refreshPicsDebounced(sortDiscussedPhotos(window.photosData));
  });
})();
