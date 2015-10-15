"use strict";

$(function () {
	console.log('Файл add_project.js успешно загружен')
});


var myModule = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('#works-add-item').on('click', _showModal);
		$('#add-new-project').on('submit', _addProject);
	};

	var _showModal = function (e) {
		e.preventDefault();
		$('#popup').bPopup({
            speed: 600,
            transition: 'slideDown'
		});
	};

	var _addProject = function (e) {
		e.preventDefault();

		var form = $(this),
			url = 'add_project.php',
			data = form.serialize();

		console.log(data);


		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});


	}

	return {
		init: init
	};

})();

myModule.init();