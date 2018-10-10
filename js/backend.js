'use strict';
(function () {
  window.download = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var getPhotosData = new XMLHttpRequest();

    getPhotosData.addEventListener('load', function () {
      onLoad(getPhotosData.response);
    });

    getPhotosData.addEventListener('error', function () {
      onError();
    });

    getPhotosData.open('GET', URL);
    getPhotosData.send();
  };

  window.upload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    var sendFormData = new XMLHttpRequest();

    sendFormData.addEventListener('load', function () {
      onLoad();
    });

    sendFormData.addEventListener('error', function () {
      onError();
    });

    sendFormData.open('POST', URL);
    sendFormData.send(data);
  };
})();