'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500; // ms
  var main = document.querySelector('main');

  var generateNumber = function (min, max) {
    var number;
    number = Math.floor(Math.random() * (max + 1 - min) + min);
    return number;
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var showDialog = function (dialog) {
    main.appendChild(dialog);
  };

  var hideDialog = function (dialog) {
    main.removeChild(dialog);
  };

  var onEnterPressClose = function (evt, element) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideElement(element);
    }
  };

  var onEscPressClose = function (evt, element) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideElement(element);
    }
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    generateNumber: generateNumber,
    showElement: showElement,
    hideElement: hideElement,
    showDialog: showDialog,
    hideDialog: hideDialog,
    onEnterPressClose: onEnterPressClose,
    onEscPressClose: onEscPressClose,
    debounce: debounce
  };

})();

/*
СДЕЛАНО - При ошибке отправки формы пишет что все ок
СДЕЛАНО - Не обрабатывается ошибка загрузки данных (вероятно по той же причине)
СДЕЛАНО - По ТЗ комментариев должно быть отображено не более 5 для изображения. (вероятно еще надо отобразить кнопку "Показать больше" или как там она называется)
- Не сбрасывается фильтр и размер изображения при закрытии окна
СДЕЛАНО - Если нажать на Enter будучи на фотографии в галерее - она не откроется, и в консоль упадет эксепшн
- Добиться чтобы на всех интерактивных элементах работал Enter
- Сообщение об ошибке должно исчезать после нажатия на кнопки .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана.
СДЕЛАНО - Дебаунс нужно не меньше 500 по ТЗ

- effects.js строка 106.
effectLevelValue - лучше заменить на промежуточную переменную, а не мутировать переменную из замыкания

- effects.js строка 14 - лучше оставить просто DOM элемент и тогда можно его обновлять через effectLevelValue.value = smth
А то у тебя он везде заново ищется

СДЕЛАНО - gallery.js строка 17. У нас в данных с сервера точно есть id?

- Обработчики keydown на документ добавляются дважды в приложении, надо бы один раз это делать

  imgUploadOverlayCloseBtn.addEventListener('keydown', function (evt) {
    window.util.onEnterPressClose(evt, imgUploadOverlay);
    onUploaderHideClean();
  });

Вот в этом обработчике надо делать evt.stopPropagation(), иначе еще кейдаун будет ловиться на документе, а нам это не надо

*/
