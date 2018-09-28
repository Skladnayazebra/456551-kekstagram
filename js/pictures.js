'use strict';


var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var PHOTOS_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 5;
var COMMENTS_MAX = 15;
var AVATAR_VARIANTS = 6;
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

var EFFECT_LEVEL_DEFAULT = 100;
var SCALE_MAX = 100;
var SCALE_MIN = 25;
var SCALE_STEP = 25;
var SCALE_DEFAULT = 100;

// МОДУЛЬ 3 ЗАДАНИЕ 1 =========================================================

// генерация случайного числа из диапазона
var generateNumber = function (min, max) {
  var number;
  number = Math.floor(Math.random() * (max + 1 - min) + min);
  return number;
};

// генерация одного комментария из одной либо двух строк из массива
var generateComment = function (strings) {
  var stringOne = strings[generateNumber(0, strings.length - 1)];
  var stringTwo = strings[generateNumber(0, (strings.length - 1) * 2)];
  var comment;
  comment = (stringTwo === undefined || stringOne === stringTwo) ? stringOne : stringOne + ' ' + stringTwo;
  return comment;
};

// генерация случайного массива комментариев под одним фото
var generateComments = function () {
  var onePhotoComments = [];
  var commentsCount = generateNumber(COMMENTS_MIN, COMMENTS_MAX);
  for (var i = 0; i < commentsCount; i++) {
    onePhotoComments[i] = generateComment(COMMENTS_STRINGS);
  }
  return onePhotoComments;
};

// создание одного объекта
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

// массив данных для фотокарточек
var photosData = [];

// генерация данных для фотокарточек
var generatePhotosData = function (counter) {
  for (var i = 1; i <= counter; i++) {
    photosData.push(createObject(i));
  }
  return photosData;
};
generatePhotosData(PHOTOS_COUNT);

// создание DOM элементов #picture и наполнение ими стартовой страницы

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('a.picture');
var pictureFragment = document.createDocumentFragment();

// наполнение DOM элемента данными из объекта
var createPictureElement = function (pictureData) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').setAttribute('src', pictureData.url);
  picture.querySelector('.picture__likes').textContent = pictureData.likes;
  picture.querySelector('.picture__comments').textContent = String(pictureData.comments.length);
  picture.id = pictureData.id;
  // здесь, возможно, стоит прописывать id не просто как число, а добавлять 'picture-'
  return picture;
};

// наполнение фрагмента элементоами picture и вывод на страницу
for (var i = 0; i < PHOTOS_COUNT; i++) {
  pictureFragment.appendChild(createPictureElement(photosData[i]));
}
pictures.appendChild(pictureFragment);

// МОДУЛЬ 4 ЗАДАНИЕ 1 =========================================================

// реализуем открытие/закрытие окна загрузки фотографии и фото пользователя


var imgUploadField = document.querySelector('#upload-file');
var imgUploadPopup = document.querySelector('.img-upload__overlay');
var imgUploadPopupCloseBtn = document.querySelector('.img-upload__cancel');
var bigPictureCloseBtn = document.querySelector('.big-picture__cancel');

var imgUploaderOpen = function () {
  imgUploadPopup.classList.remove('hidden');
  applyEffect(EFFECT_LEVEL_DEFAULT);
  // функция applyEffect находится ниже в коде, в разделе с фильтрами
};


var imgUploaderClose = function () {
  imgUploadPopup.classList.add('hidden');
  imgUploadField.value = null;
};

var bigPictureOpen = function () {
  bigPicture.classList.remove('hidden');
};

var bigPictureClose = function () {
  bigPicture.classList.add('hidden');
};

imgUploadField.addEventListener('change', imgUploaderOpen);
imgUploadPopupCloseBtn.addEventListener('click', imgUploaderClose);
imgUploadPopupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    imgUploaderClose();
  }
});

bigPictureCloseBtn.addEventListener('click', bigPictureClose);
bigPictureCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    bigPictureClose();
  }
});

document.querySelector('.picture').addEventListener('click', bigPictureOpen);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploaderClose();
    bigPictureClose();
  }
});

// реализуем переключение и настройку фильтров

var imgPreview = document.querySelector('.img-upload__preview img');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelField = document.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelPercent;

var effectNone = document.querySelector('#effect-none');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');

var toggleEffect = function (effectClass) {
  imgPreview.style.filter = '';
  imgPreview.className = effectClass;
  effectLevelField.classList.remove('hidden');
  effectLevelPin.style.left = EFFECT_LEVEL_DEFAULT + '%';
  effectLevelDepth.style.width = EFFECT_LEVEL_DEFAULT + '%';
};

var applyEffect = function (effectLevel) {
  switch (document.querySelector('.effects__radio:checked').id) {
    case 'effect-none' :
      imgPreview.style.filter = '';
      effectLevelField.classList.add('hidden');
      break;
    case 'effect-chrome' :
      imgPreview.style.filter = 'grayscale(' + effectLevel / 100 + ')';
      break;
    case 'effect-sepia' :
      imgPreview.style.filter = 'sepia(' + effectLevel / 100 + ')';
      break;
    case 'effect-marvin' :
      imgPreview.style.filter = 'invert(' + effectLevel + '%)';
      break;
    case 'effect-phobos' :
      imgPreview.style.filter = 'blur(' + effectLevel / 100 * 3 + 'px)';
      break;
    case 'effect-heat' :
      imgPreview.style.filter = 'brightness(' + (1 + effectLevel / 100 * 2) + ')';
      break;
  }
};

effectNone.addEventListener('click', function () {
  toggleEffect('effects__preview--none');
  effectLevelField.classList.add('hidden');
});

effectChrome.addEventListener('click', function () {
  toggleEffect('effects__preview--chrome');
});

effectSepia.addEventListener('click', function () {
  toggleEffect('effects__preview--sepia');
});

effectMarvin.addEventListener('click', function () {
  toggleEffect('effects__preview--marvin');
});

effectPhobos.addEventListener('click', function () {
  toggleEffect('effects__preview--phobos');
});

effectHeat.addEventListener('click', function () {
  toggleEffect('effects__preview--heat');
});

effectLevelLine.addEventListener('mouseup', function (evt) {
  var effectLevelWidth = document.querySelector('.effect-level__line').clientWidth;
  effectLevelPercent = Math.round(evt.offsetX / effectLevelWidth * 100);
  effectLevelPin.style.left = effectLevelPercent + '%';
  effectLevelDepth.style.width = effectLevelPercent + '%';
  applyEffect(effectLevelPercent);
});

// реализуем масштабирование изоражения

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlField = document.querySelector('.scale__control--value');
var currentScale = SCALE_DEFAULT;

var decreaseSize = function () {
  if (currentScale > SCALE_MIN) {
    scaleControlField.value = (currentScale - SCALE_STEP) + '%';
    imgPreview.style.transform = 'scale(' + (currentScale - SCALE_STEP) / 100 + ')';
    currentScale -= SCALE_STEP;
  }
};

var increaseSize = function () {
  if (currentScale < SCALE_MAX) {
    scaleControlField.value = (currentScale + SCALE_STEP) + '%';
    imgPreview.style.transform = 'scale(' + (currentScale + SCALE_STEP) / 100 + ')';
    currentScale += SCALE_STEP;
  }
};

scaleControlSmaller.addEventListener('click', decreaseSize);
scaleControlBigger.addEventListener('click', increaseSize);

// реализуем вывод изображения в полноэкранный режим по клику

// наполнение блока bigPicture сгенерированными данными
var bigPicture = document.querySelector('.big-picture');
var commentTemplate = document.querySelector('#social-comment').content.querySelector('li.social__comment');
var commentsFragment = document.createDocumentFragment();

// добавление одного комментария в блок просмотра фотографии
var addComment = function (arrayElement) {
  var newComment = commentTemplate.cloneNode(true);
  var avatarUrl = 'img/avatar-' + generateNumber(1, AVATAR_VARIANTS) + '.svg';
  newComment.querySelector('.social__picture').setAttribute('src', avatarUrl);
  newComment.querySelector('.social__text').textContent = arrayElement;
  return newComment;
};

var refreshBigPicture = function (arrayElement) {
  // удаляем старые комментарии
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', arrayElement.url);
  bigPicture.querySelector('.big-picture__social .likes-count').textContent = arrayElement.likes;
  bigPicture.querySelector('.big-picture__social .comments-count').textContent = String(arrayElement.comments.length);
  bigPicture.querySelector('.big-picture__social .social__caption').textContent = arrayElement.description;
  var commentsNumber = arrayElement.comments.length;
  for (var j = 0; j < commentsNumber; j++) {
    commentsFragment.appendChild(addComment(arrayElement.comments[j]));
  }
  bigPicture.querySelector('.social__comments').appendChild(commentsFragment);
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  return bigPicture;
};


var picturesContainer = document.querySelector('.pictures');

picturesContainer.addEventListener('click', function (evt) {
  if (evt.target.closest('.picture')) {
    for (i = 1; i <= PHOTOS_COUNT; i++) {
      if (evt.target.closest('.picture').id === String(i)) {
        refreshBigPicture(photosData[i - 1]);
      }
    }
    bigPictureOpen();
  }
});
