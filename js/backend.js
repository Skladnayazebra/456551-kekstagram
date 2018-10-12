'use strict';
(function () {
  var Status = {
    OK: 200
  };
  window.download = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var getPhotosData = new XMLHttpRequest();

    getPhotosData.addEventListener('load', function () {
      if (getPhotosData.status === Status.OK) {
        onLoad(getPhotosData.response);
      } else {
        onError('Всё сломалось. Зайдите позже');
      }
    });

    getPhotosData.open('GET', URL);
    getPhotosData.send();
  };

  window.upload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    var sendFormData = new XMLHttpRequest();

    sendFormData.addEventListener('load', function () {
      if (sendFormData.status === Status.OK) {
        onLoad('Изображение успешно загружено');
      } else {
        onError('Ошибка загрузки файла');
      }
    });

    sendFormData.open('POST', URL);
    sendFormData.send(data);
  };
})();
