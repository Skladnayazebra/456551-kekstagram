'use strict';

(function () {
  var AVATAR_VARIANTS = 6;
  var COMMENTS_APPEARED = 5;
  var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('#social-comment').content.querySelector('li.social__comment');
  var commentsFragment = document.createDocumentFragment();
  var newCommentInput = document.querySelector('.social__footer-text');

  var addComment = function (arrayElement) {
    var newComment = commentTemplate.cloneNode(true);
    var avatarUrl = 'img/avatar-' + window.util.generateNumber(1, AVATAR_VARIANTS) + '.svg';
    newComment.querySelector('.social__picture').setAttribute('src', avatarUrl);
    newComment.querySelector('.social__text').textContent = arrayElement;
    return newComment;
  };

  var renderBigPicture = function (arrayElement) {
    bigPicture.querySelector('.social__comments').innerHTML = '';
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', arrayElement.url);
    bigPicture.querySelector('.big-picture__social .likes-count').textContent = arrayElement.likes;
    bigPicture.querySelector('.big-picture__social .comments-count').textContent = String(arrayElement.comments.length);
    bigPicture.querySelector('.big-picture__social .social__caption').textContent = arrayElement.description;
    for (var i = 0; i < arrayElement.comments.slice(0, COMMENTS_APPEARED).length; i++) {
      commentsFragment.appendChild(addComment(arrayElement.comments[i]));
      bigPicture.querySelector('.comments-loaded').textContent = String(i + 1);
    }
    bigPicture.querySelector('.social__comments').appendChild(commentsFragment);
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    return bigPicture;
  };

  var onPictureClick = function (evt) {
    if (evt.target.closest('.picture')) {
      var photosData = window.photosData;
      var trg = evt.target.querySelector('img') || evt.target;
      for (var i = 1; i <= photosData.length; i++) {
        if (trg.src.indexOf(i + '.jpg') >= 0) {
          renderBigPicture(photosData[i - 1]);
          break;
        }
      }
      window.util.showElement(bigPicture);
      newCommentInput.focus();
      document.addEventListener('keydown', onBigPictureEscPress);
      bigPictureCloseBtn.addEventListener('click', onBigPictureCloseBtnClick);
      picturesContainer.removeEventListener('click', onPictureClick);
    }
  };

  var onBigPictureEscPress = function (evt) {
    window.util.onEscPressClose(evt, bigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPictureCloseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
    picturesContainer.addEventListener('click', onPictureClick);
  };

  var onBigPictureCloseBtnClick = function () {
    window.util.hideElement(bigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPictureCloseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
    picturesContainer.addEventListener('click', onPictureClick);
  };

  window.preview = {
    onPictureClick: onPictureClick
  };

})();
