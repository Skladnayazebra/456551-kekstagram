'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // я не уверен, что коды клавиш нужно объявлять именно в этом модуле,
  // но пока пусть будут тут. Потом можно будет создать отдельный файл
  // с общими методами и переменными.
  var PHOTOS_COUNT = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 5;
  var COMMENTS_MAX = 15;

  var COMMENTS_STRINGS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTION_STRINGS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var generateNumber = function (min, max) {
    var number;
    number = Math.floor(Math.random() * (max + 1 - min) + min);
    return number;
  };

  var generateComment = function (strings) {
    var stringOne = strings[generateNumber(0, strings.length - 1)];
    var stringTwo = strings[generateNumber(0, (strings.length - 1) * 2)];
    var comment;
    comment = (stringTwo === undefined || stringOne === stringTwo) ? stringOne : stringOne + ' ' + stringTwo;
    return comment;
  };

  var generateComments = function () {
    var onePhotoComments = [];
    var commentsCount = generateNumber(COMMENTS_MIN, COMMENTS_MAX);
    for (var i = 0; i < commentsCount; i++) {
      onePhotoComments[i] = generateComment(COMMENTS_STRINGS);
    }
    return onePhotoComments;
  };

  var createObject = function (index) {
    var photoObject;
    photoObject = {
      url: 'photos/' + index + '.jpg',
      likes: generateNumber(LIKES_MIN, LIKES_MAX),
      comments: generateComments(),
      description: DESCRIPTION_STRINGS[Math.floor(Math.random() * DESCRIPTION_STRINGS.length)],
      id: index
    };
    return photoObject;
  };

  var photosData = [];

  var generatePhotosData = function (counter) {
    for (var i = 1; i <= counter; i++) {
      photosData.push(createObject(i));
    }
    return photosData;
  };
  generatePhotosData(PHOTOS_COUNT);

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    PHOTOS_COUNT: PHOTOS_COUNT,
    photosData: photosData,
    generateNumber: generateNumber
  };
})();
