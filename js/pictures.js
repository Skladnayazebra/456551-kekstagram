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
var photoObjects = [];

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

// генерация одного комментария из одной либо двух строк
var generateComment = function (strings) {
  /*
    Для переменной commentStringTwo выражение (commentsStrings.length * 2) позволяет
    с вероятностью 50% выбрать либо одну из строк в массиве, либо пустое значение - undefined.
    Таким образом, мы с 50% вероятностью сможем генерировать комментарии то с одним, то с двумя строками.
  */
  var stringOne = strings[Math.floor(Math.random() * strings.length)];
  var stringTwo = strings[Math.floor(Math.random() * strings.length * 2)];

  /*
    Если вторая переманная возвращает undefined или если обе строки будут равны,
    выводим пустую строку во второй переменной, тогда комментарий будет состоять только из первой строки.
    Иначе - склеиваем комментарий из двух строк и пробела.
  */
  var comment;
  comment = (stringTwo === undefined || stringOne === stringTwo) ? stringOne : stringOne + ' ' + stringTwo;
  return comment;
};


// запись свойств объекта и добавление его в конец массива photoObjects
for (var i = 0; i < PHOTOS_COUNT; i++) {
  var photoCard = {};
  photoCard.url = 'photos/' + (i + 1) + '.jpg';
  photoCard.likes = generateNumber(LIKES_MIN, LIKES_MAX);

  // Генерация случайного массива комментариев под одним фото
  var OnePhotoComments = [];
  var commentsCount = generateNumber(COMMENTS_MIN, COMMENTS_MAX);
  for (var j = 0; j < commentsCount; j++) {
    OnePhotoComments[j] = generateComment(commentsStrings);
  }
  // после генерации записываем полученный массив комментариев в объект
  photoCard.comments = OnePhotoComments;
  photoCard.description = descriptionStrings[Math.floor(Math.random() * descriptionStrings.length)];

  photoObjects.push(photoCard);
}

// создаём DOM элементы фотографий пользователей с помощью шаблона
var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a.picture');
var pictureFragment = document.createDocumentFragment();

// добавляем DOM элементы на страницу внутри общего фрагмента
for (var i = 0; i < PHOTOS_COUNT; i++) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').setAttribute('src', photoObjects[i].url);
  picture.querySelector('.picture__likes').textContent = photoObjects[i].likes;
  picture.querySelector('.picture__comments').textContent = photoObjects[i].comments.length;
  pictureFragment.appendChild(picture);
}
pictures.appendChild(pictureFragment);

// выводим блок просмотра фотографии
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

// ...и наполняем его информацией
bigPicture.querySelector('.big-picture__img img').setAttribute('src', photoObjects[0].url);
bigPicture.querySelector('.big-picture__social .likes-count').textContent = photoObjects[0].likes;
bigPicture.querySelector('.big-picture__social .comments-count').textContent = photoObjects[0].comments.length;
bigPicture.querySelector('.big-picture__social .social__caption').textContent = photoObjects[0].description;

// убираем стандартные комментарии из разметки
var comments = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');
var defaultComments = document.querySelectorAll('.social__comment');
comments.removeChild(defaultComments[0]);
comments.removeChild(defaultComments[1]);

// добавляем комментарии, клонируя DOM-элемент .social__comment;
var commentsFragment = document.createDocumentFragment();
var commentsNumber = photoObjects[0].comments.length;

for (var i = 0; i < commentsNumber; i++) {
  var newComment = commentTemplate.cloneNode(true);
  var avatarUrl = 'img/avatar-' + Math.ceil(Math.random() * AVATAR_VARIANTS) + '.svg';
  newComment.querySelector('.social__picture').setAttribute('src', avatarUrl);
  newComment.querySelector('.social__text').textContent = photoObjects[0].comments[i];
  commentsFragment.appendChild(newComment);
}
comments.appendChild(commentsFragment);

// прячем счётчик и загрузчик комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

