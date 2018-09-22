var PHOTOS_COUNT = 25;
var photosUrl = [];
var photosLikes = [];
var photosComments = [];
var photosDescriptions = [];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MAX = 10;
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

// функция для генерации одного комментария
var generateComment = function(strings) {
  /*
    Объявляем две переменные для генерации комментария из двух строк.
    Для переменной commentStringTwo выражение (commentsStrings.length * 2) позволяет
    с вероятностью 50% выбрать либо одну из строк в массиве, либо пустое значение - undefined.
    Таким образом, мы с 50% вероятностью сможем генерировать комментарии то с одним, то с двумя строками.
    Я надеюсь, что в JS допустимо обращаться к несуществующим элементам массива и оперировать с undefined.
  */
  var stringOne = strings[Math.floor(Math.random() * strings.length)];
  var stringTwo = strings[Math.floor(Math.random() * strings.length * 2)];
  var comment;

  /*
    Если вторая переманная возвращает undefined или если обе строки будут равны,
    выводим пустую строку во второй переменной, тогда комментарий будет состоять только из первой строки.
    Иначе - склеиваем комментарий из двух строк и пробела.
  */
  if (stringTwo === undefined || stringOne === stringTwo) {
      stringTwo = '';
      comment = stringOne;
    } else {
      comment = stringOne + ' ' + stringTwo;
    }
    return comment;
};



// запись отдельных массивов с данным для фотографий (пока так)
for (var i = 0; i < PHOTOS_COUNT; i++) {
  photosUrl[i] = 'photos/' + (i + 1) + '.jpg';
  photosLikes[i] = Math.ceil(Math.random() * (LIKES_MAX - LIKES_MIN) + LIKES_MIN);

  // Генерация массива комментариев под одним снимком
  var OnePhotoComments = [];
  var commentsCount = Math.ceil(Math.random() * COMMENTS_MAX);
  for (var j = 0; j < commentsCount; j++) {
    OnePhotoComments[j] = generateComment(commentsStrings);
  }
  // после генерации записываем полученный массив в текущий элемент массива списков комментариев
  photosComments[i] = OnePhotoComments;
  photosDescriptions[i] = descriptionStrings[Math.floor(Math.random() * descriptionStrings.length)];
}

//проверочка
console.log(photosUrl);
console.log(photosLikes);
console.log(photosComments);
console.log(photosDescriptions);
