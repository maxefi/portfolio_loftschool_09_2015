"use strict";

$(function () {
	console.log('Файл login.js успешно загружен')
});

var LoginModule = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('.login-form').on('submit', _submitForm);
	};

	var _submitForm = function(ev){
		ev.preventDefault();

		console.log('Отправка формы login-form');

		var form = $(this),
			url = 'login.php',
			defObj = _ajaxForm(form, url);

			// что-то будем делать с ответо с сервера defObj
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