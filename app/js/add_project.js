"use strict";

$(function () {
	console.log('Файл add_project.js успешно загружен')
});


var myModule = (function () {

// Инициализация модуля
	var init = function () {
		_setUpListners();
	};

// Прослушка событий
	var _setUpListners = function () {
		$('#works-add-item').on('click', _showModal);
		$('#add-new-project').on('submit', _addProject);
		$('input[type=file]').on('change', _revalidateInput);
	};

// Работа с модальным окном
	var _showModal = function (e) {
		e.preventDefault();

		var divPopup = $('#popup');
		var form = divPopup.find('.add-form');

		divPopup.bPopup({
            speed: 500,
            transition: 'slideDown',
            onClose: function () {
            	form.find('.server-ans').text('').hide();
            	$(this).find('form').trigger('reset');
            }
		});
	};

//Перепроверка input="file"
	var _revalidateInput = function(e) {
		e.preventDefault();

		var input = $(this),
			name = input.val();

		$('#filename').val(name.replace(/C:\\fakepath\\/, "")),
		$('#fileupload').trigger('hideMe'),
		$('#filename').removeClass('has-error-file');


		//МОЙ ВАРИАНТ
		// var addFile = $('.add-file-text'),
		// 	addFileErrorEffect = $('.add-file-text-wrapper');

		// addFileErrorEffect.removeClass('has-error-file');
		// $(this).removeClass('has-error')
		// if ($(this).val() === ""){
		// 	addFile.text($(this).val().replace("", "Загрузите изображение"));
		// } else {
		// 	addFile.text($(this).val().replace(/C:\\fakepath\\/, ""));
		// }
		// $(this).trigger('hideMe');
	};

// Добавление проекта
	var _addProject = function (e) {
		e.preventDefault();

		console.log('Отправка формы add-form');

		var form = $(this),
			url = 'add_project.php',
			myServerGiveMeAnswer = _ajaxForm(form, url);

		if (myServerGiveMeAnswer) {
			myServerGiveMeAnswer.done(function(ans) {

				var successBox = form.find('.success-mes'),
					errorBox = form.find('.error-mes');

				if (ans.status === 'OK') {
					errorBox.hide();
					successBox.text(ans.text).show();
				}else{
					successBox.hide();
					errorBox.text(ans.text).show();
				}
			})
		}
	};


// Универсальная функция ajax
// для работы используются:
// @form - форма;
// @url - адрес php файла, к которому обращаемся
// 1. собирает данные из формы
// 2. проверяет форму
// 3. делает запрос на сервер и возвращает ответ с сервера
	var _ajaxForm = function (form, url) {

		// if (!myValidation.validateForm(form)) return false;
		console.log('AJAX c проверкой');

		var data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		})
		.fail(function(ans) {
			console.log('Проблемы в PHP');
			form.find('.error-mes').text('На сервере произошла ошибка').show();
		});
		return result;
	};

// Возвращаемый объект (публичные методы)
	return {
		init: init
	};

})();

myModule.init();