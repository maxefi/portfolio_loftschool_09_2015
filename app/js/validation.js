"use strict";

$(function () {
	console.log('Файл validation.js успешно загружен')
});

var myValidation = (function () {

	var urlRegexp = /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
		mailRegexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('.contact-form, .add-form, .login-form').on('submit', validateForm);
		// $('.contact-form, .add-form').on('submit', _urlChecking); //Первый вариант проверки url
		// $('.contact-form, .add-form').on('submit', _mailChecking); //Первый вариант проверки почты
		$('form').on('keydown', '.has-error', _removeError);
		$('form').on('reset', _clearForm);
		$('#robot').hover(function() {
			var pos = $(this).attr('qtip-position');
			_createQtip($('#robot'), pos)
		}, function() {
			$('#robot').trigger('hideMe')
		});
	};

	var _removeError = function () {
		$(this).removeClass('has-error');
	};

	var _clearForm = function (form) {
		var form = $(this);
		form.find('input, textarea').trigger('hideMe');
		form.find('.has-error').removeClass('has-error');
		form.find('.has-error-file').removeClass('has-error-file');
		form.find('.add-file-text').text('Загрузите изображение');
	};

	//Создание тултипов
	var _createQtip = function (element, position) {

		// Условия позиционирования
		if (position === 'right') {
			position = {
				my: 'left-center',
				at: 'right-center'
			}
		}else{
			position = {
				my: 'right-center',
				at: 'left-center',
				adjust: {
					method: 'shift none'
				}
			}
		}

		// Инициализация тултипа
		element.qtip({
			content: {
				text: function (){
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideMe'
			},
			position: position,
			style: {
				classes: 'qtip-red qtip-rounded',
			}
		}).trigger('show');

	};

	//Валидация тултипов
	var validateForm = function (form) {

		var form = $(this),
			elements = form.find('input, textarea'),
			valid = true;

		$.each(elements, function(index, val) {
			var element = $(val),
				id = element.attr('id'),
				val = element.val(),
				pos = element.attr('qtip-position');

			if (id === 'mail') {
				while (true) {
					if 	(val === '') {
						element.addClass('has-error');
						element.attr('qtip-content', 'Укажите ваш email');
						_createQtip(element, pos);
						valid = false;
						break;
					} if(!mailRegexp.test(val)) {
						element.attr('qtip-content', 'Введен некорректный email');
						element.addClass('has-error');
						_createQtip(element, pos);
						valid = false;
						break;
					}
				break;
				}
			}
			if (id === 'project-url') {
				while (true) {
					if 	(val === '') {
						element.addClass('has-error');
						element.attr('qtip-content', 'А тут, ссылка');
						_createQtip(element, pos);
						break;
					} if (!urlRegexp.test(val)) {
						element.attr('qtip-content', 'Введена некорректная ссылка');
						element.addClass('has-error');
						_createQtip(element, pos);
						break;
					}
				break;
				}
			}
			if(id === 'g-recaptcha-response') {
				if (val === '') {
					form.find('#robot').show().text('Вы - робот');
					valid = false;
				} else {
					form.find('#robot').hide();
				}
			}
			if(val.length === 0 & id === 'fileupload') {
				$('.add-file-text-wrapper').addClass('has-error-file');
				_createQtip(element, pos);
				valid = false;
			}
			if(val.length === 0 & (pos === 'right' || pos === 'left')) {
				element.addClass('has-error');
				_createQtip(element, pos);
				valid = false;
			}
		}); //each

		return valid;

	};

	var _urlChecking = function() {

		var element = $(this).find('#project-url'),
			position = element.attr('qtip-position');
		while (true) {
			if 	(element.val() === '') {
				element.addClass('has-error');
				element.attr('qtip-content', 'А тут, ссылка');
				_createQtip(element, position);
				break;
			} if (!urlRegexp.test(element.val())) {
				element.attr('qtip-content', 'Введена некорректная ссылка');
				element.addClass('has-error');
				_createQtip(element, position);
			}
			break;
		}
	};

//Первый вариант проверки почты
	// var _mailChecking = function() {

	// 	var element = $(this).find('#mail'),
	// 		position = element.attr('qtip-position');

	// 	while (true) {
	// 		if 	(element.val() === '') {
	// 			element.addClass('has-error');
	// 			element.attr('qtip-content', 'Укажите ваш email');
	// 			_createQtip(element, position);
	// 			break;
	// 		} if(!mailRegexp.test(element.val())) {
	// 		element.attr('qtip-content', 'Введен некорректный email');
	// 		element.addClass('has-error');
	// 		_createQtip(element, position);
	// 		}
	// 		break;
	// 	}
	// };

	return {
		init: init,
		validateForm: validateForm
	};

})();

myValidation.init();