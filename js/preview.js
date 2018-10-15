'use strict';

(function () {
  var AVATAR_VARIANTS = 6;
  var COMMENTS_ADDED = 5;

  var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

  var commentTemplate = document.querySelector('#social-comment').content.querySelector('li.social__comment');

  var picturePreview = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureCaption = bigPicture.querySelector('.social__caption');
  var commentsTotal = bigPicture.querySelector('.comments-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsCounterField = bigPicture.querySelector('.comments-loaded');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var commentsNumber;
  var pictureIndex;
  var photosData;

  var addComment = function (arrayElement) {
    var newComment = commentTemplate.cloneNode(true);
    var avatarUrl = 'img/avatar-' + window.util.generateNumber(1, AVATAR_VARIANTS) + '.svg';
    newComment.querySelector('.social__picture').setAttribute('src', avatarUrl);
    newComment.querySelector('.social__text').textContent = arrayElement;
    return newComment;
  };

  var addSeveralComments = function (commentsArray, commentsLoaded) {
    var commentsFragment = document.createDocumentFragment();
    var commentsCounter = commentsLoaded;
    commentsArray.slice(commentsLoaded, commentsLoaded + COMMENTS_ADDED).forEach(function (element) {
      commentsFragment.appendChild(addComment(element));
      commentsCounter++;
    });
    commentsCounterField.textContent = String(commentsCounter);
    commentsList.appendChild(commentsFragment);
    commentsNumber = commentsCounter;
    if (commentsNumber === +commentsTotal.textContent) {
      window.util.hideElement(commentsLoader);
    }
  };

  var renderBigPicture = function (arrayElement) {
    picturePreview.setAttribute('src', arrayElement.url);
    pictureLikes.textContent = arrayElement.likes;
    pictureCaption.textContent = arrayElement.description;
    commentsTotal.textContent = String(arrayElement.comments.length);
    commentsList.innerHTML = '';
    commentsNumber = 0;
    window.util.showElement(commentsLoader);
    addSeveralComments(arrayElement.comments, commentsNumber);
    return bigPicture;
  };

  var toggleListenersOn = function () {
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureCloseBtn.addEventListener('click', onBigPictureCloseBtnClick);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  };

  var toggleListenersOff = function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPictureCloseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  var onPictureClick = function (evt) {
    if (evt.target.closest('.picture')) {
      photosData = window.photosData;
      var trg = evt.target.querySelector('img') || evt.target;
      for (var i = 0; i < photosData.length; i++) {
        if (trg.src.endsWith('/' + (i + 1) + '.jpg')) {
          renderBigPicture(photosData[i]);
          pictureIndex = i;
          break;
        }
      }
      window.util.showElement(bigPicture);
      bigPictureCloseBtn.focus();
      toggleListenersOn();
      picturesContainer.removeEventListener('click', onPictureClick);
    }
  };

  var onCommentsLoaderClick = function () {
    addSeveralComments(photosData[pictureIndex].comments, commentsNumber);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      window.util.hideElement(bigPicture);
      toggleListenersOff();
      picturesContainer.addEventListener('click', onPictureClick);
    }
  };

  var onBigPictureCloseBtnClick = function () {
    window.util.hideElement(bigPicture);
    toggleListenersOff();
    picturesContainer.addEventListener('click', onPictureClick);
  };

  window.preview = {
    onPictureClick: onPictureClick
  };

})();
