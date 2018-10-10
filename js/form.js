'use strict';

(function () {
  var HASHTAGS_MAX = 5;
  var HASHTAG_SYMBOL_REGEX = /^#/;
  var HASHTAG_LENGTH_REGEX = /^#[0-9A-Za-zА-Яа-яЁё#]{1,19}$/;
  var HASHTAG_WHITESPACE_REGEX = /^#[0-9A-Za-zА-Яа-яЁё]{1,19}$/;
  var inputHashtags = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('.img-upload__submit');

  var validateHashtags = function () {
    var hashtags = inputHashtags.value
      .toLowerCase()
      .split(' ')
      .filter(function (hashtag) {
        return hashtag !== '';
      });
    if (hashtags.length === 0) {
      inputHashtags.setCustomValidity('');
      return;
    }
    if (hashtags.length > HASHTAGS_MAX) {
      inputHashtags.setCustomValidity('Можно добавить не больше пяти хэштегов');
      return;
    }
    var excludeDuplications = function (hashtag, i) {
      return hashtags.indexOf(hashtag) === i;
    };
    var hasDuplications = hashtags.length !== hashtags.filter(excludeDuplications).length;
    if (hasDuplications) {
      inputHashtags.setCustomValidity('Хэштеги не должны повторяться');
      return;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (!HASHTAG_SYMBOL_REGEX.test(hashtags[i])) {
        inputHashtags.setCustomValidity('Хэштеги должны начинаться с символа #');
        break;
      } else if (!HASHTAG_LENGTH_REGEX.test(hashtags[i])) {
        inputHashtags.setCustomValidity('Каждый хэштег должен содержать от 1 до 19 букв и цифр');
        break;
      } else if (!HASHTAG_WHITESPACE_REGEX.test(hashtags[i])) {
        inputHashtags.setCustomValidity('Между хэштегами нужно ставить пробелы');
        break;
      } else {
        inputHashtags.setCustomValidity('');
      }
    }
    if (!inputHashtags.reportValidity()) {
      inputHashtags.style.border = '2px solid #f44242';
    } else {
      inputHashtags.style.border = '';
    }
  };

  submitButton.addEventListener('click', validateHashtags);
})();
