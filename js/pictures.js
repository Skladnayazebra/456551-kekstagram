'use strict';
var PHOTOS_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 10;
var COMMENTS_MAX = 100;
var AVATAR_VARIANTS = 6;
var commentsStrings = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptionStrings = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

/*
  Код должен быть разделён на отдельные функции.
  Стоит отдельно объявить:
  - функцию генерации случайных данных,
  - функцию создания DOM-элемента на основе JS-объекта,
  - функцию заполнения блока DOM-элементами на основе массива JS-объектов.
  Пункты задания примерно соответствуют функциям, которые вы должны создать.
*/

// генерация случайного числа из диапазона
var generateNumber = function (min, max) {
  var number;
  number = Math.ceil(Math.random() * (max - min) + min);
  return number;
};

// генерация одного комментария из одной либо двух строк из массива
var generateComment = function (strings) {
  /*
    Для переменной commentStringTwo выражение (commentsStrings.length * 2) позволяет
    с вероятностью 50% выбрать либо одну из строк в массиве, либо пустое значение - undefined.
  */
  var stringOne = strings[Math.floor(Math.random() * strings.length)];
  var stringTwo = strings[Math.floor(Math.random() * strings.length * 2)];

  /*
    Если вторая переманная возвращает undefined или если обе строки будут равны,
    комментарий будет состоять только из первой строки.
    Иначе - склеиваем комментарий из двух строк и пробела.
  */
  var comment;
  comment = (stringTwo === undefined || stringOne === stringTwo) ? stringOne : stringOne + ' ' + stringTwo;
  return comment;
};

// Генерация случайного массива комментариев под одним фото
var generateComments = function () {
  var onePhotoComments = [];
  var commentsCount = generateNumber(COMMENTS_MIN, COMMENTS_MAX);
  for (var i = 0; i < commentsCount; i++) {
    onePhotoComments[i] = generateComment(commentsStrings);
  }
  return onePhotoComments;
};

// создание одного объекта
var createObject = function () {
  var photoObject = {};
  photoObject.url = 'photos/' + (i + 1) + '.jpg';
  photoObject.likes = generateNumber(LIKES_MIN, LIKES_MAX);
  photoObject.comments = generateComments();
  photoObject.description = descriptionStrings[Math.floor(Math.random() * descriptionStrings.length)];
  return photoObject;
};

// наполнение массива объектами
var photoObjects = [];
for (var i = 0; i < PHOTOS_COUNT; i++) {
  photoObjects.push(createObject());
}

// создаём DOM элементы с фотографиями пользователей с помощью шаблона
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a.picture');
var pictureFragment = document.createDocumentFragment();

// наполнение DOM элемента данными из объекта
var fillElement = function (arrayElement) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').setAttribute('src', arrayElement.url);
  picture.querySelector('.picture__likes').textContent = arrayElement.likes;
  picture.querySelector('.picture__comments').textContent = String(arrayElement.comments.length);
  return picture;
};

// наполнение фрагмента элементоами picture
for (var i = 0; i < PHOTOS_COUNT; i++) {
  pictureFragment.appendChild(fillElement(photoObjects[i]));
}
pictures.appendChild(pictureFragment);

// выводим блок просмотра фотографии
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

// наполнение блока просмотра фотографии данными
var fillBigPicture = function (arrayElement) {
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', arrayElement.url);
  bigPicture.querySelector('.big-picture__social .likes-count').textContent = arrayElement.likes;
  bigPicture.querySelector('.big-picture__social .comments-count').textContent = String(arrayElement.comments.length);
  bigPicture.querySelector('.big-picture__social .social__caption').textContent = arrayElement.description;
  return bigPicture;
};
fillBigPicture(photoObjects[0]);

// убираем стандартные комментарии из разметки
var comments = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');
var defaultComments = document.querySelectorAll('.social__comment');
comments.removeChild(defaultComments[0]);
comments.removeChild(defaultComments[1]);

// добавляем комментарии, клонируя DOM-элемент .social__comment;
var commentsFragment = document.createDocumentFragment();
var commentsNumber = photoObjects[0].comments.length;

// добавление одного комментария в блок просмотра фотографии
var addComment = function (arrayElement) {
  var newComment = commentTemplate.cloneNode(true);
  var avatarUrl = 'img/avatar-' + generateNumber(1, AVATAR_VARIANTS) + '.svg';
  newComment.querySelector('.social__picture').setAttribute('src', avatarUrl);
  newComment.querySelector('.social__text').textContent = arrayElement;
  return newComment;
};

// наполнение фрагмента элементами comment
for (var i = 0; i < commentsNumber; i++) {
  commentsFragment.appendChild(addComment(photoObjects[0].comments[i]));
}
comments.appendChild(commentsFragment);

// прячем счётчик и загрузчик комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

