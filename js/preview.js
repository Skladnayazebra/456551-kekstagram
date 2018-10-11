'use strict';

(function () {
  var AVATAR_VARIANTS = 6;
  var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('#social-comment').content.querySelector('li.social__comment');
  var commentsFragment = document.createDocumentFragment();

  // добавление одного комментария в блок просмотра фотографии
  var addComment = function (arrayElement) {
    var newComment = commentTemplate.cloneNode(true);
    var avatarUrl = 'img/avatar-' + window.util.generateNumber(1, AVATAR_VARIANTS) + '.svg';
    newComment.querySelector('.social__picture').setAttribute('src', avatarUrl);
    newComment.querySelector('.social__text').textContent = arrayElement;
    return newComment;
  };
  // наполнение блока bigPicture данными
  var renderBigPicture = function (arrayElement) {
    bigPicture.querySelector('.social__comments').innerHTML = '';
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', arrayElement.url);
    bigPicture.querySelector('.big-picture__social .likes-count').textContent = arrayElement.likes;
    bigPicture.querySelector('.big-picture__social .comments-count').textContent = String(arrayElement.comments.length);
    bigPicture.querySelector('.big-picture__social .social__caption').textContent = arrayElement.description;
    var commentsNumber = arrayElement.comments.length;
    for (var i = 0; i < commentsNumber; i++) {
      commentsFragment.appendChild(addComment(arrayElement.comments[i]));
    }
    bigPicture.querySelector('.social__comments').appendChild(commentsFragment);
    return bigPicture;
  };

  var onPictureClick = function (evt) {
    if (evt.target.closest('.picture')) {
      var photosData = window.photosData;
      for (var i = 1; i <= photosData.length; i++) {
        if (evt.target.src.indexOf(i + '.jpg') >= 0) {
          renderBigPicture(photosData[i - 1]);
        }
      }
      window.util.showElement(bigPicture);
    }
  };

  picturesContainer.addEventListener('click', onPictureClick);

  document.addEventListener('keydown', function (evt) {
    window.util.onEscPressClose(evt, bigPicture);
  });

  bigPictureCloseBtn.addEventListener('click', function () {
    window.util.hideElement(bigPicture);
  });
})();
