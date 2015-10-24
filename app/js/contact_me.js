"use strict";

$(function () {
	console.log('Файл contact_me.js успешно загружен')
});

var ContactModule = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('.contact-form').on('submit', _submitForm);
	};

	var _submitForm = function(ev){
		ev.preventDefault();

		console.log('Отправка формы contact-form');

		var form = $(this),
			url = 'contactme.php',
			defObj = _ajaxForm(form, url);

			// что-то будем делать с ответом с сервера defObj
	};

	var _ajaxForm = function (form, url) {
		console.log('AJAX с проверкой');
		if (!myValidation.validateForm(form)) return false;
	};

	return {
		init: init
	};

})();

myModule.init();