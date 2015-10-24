<?php

	$name = $_POST['project-name'];
	$project_img = $_POST['project-img'];
	$project_url = $_POST['project-url'];
	$project_text = $_POST['project-text'];
	$data = array();

	if ($name === '' & $project_img === '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text === '') {
		$data['status'] = 'ERROR1';
		$data['text'] = "Вы ничего не указали. Это вы зря.";
	} elseif ($name !== '' & $project_img === '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text === '') {
		$data['status'] = 'ERROR2';
		$data['text'] = "Только имя? Маловато будет.";
	} elseif ($name !== '' & $project_img !== '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text === '') {
		$data['status'] = 'ERROR3';
		$data['text'] = "Дальше - больше. Продолжайте.";
	} elseif (($name !== '' & $project_img !== '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text === '') xor
		      ($name !== '' & $project_img !== '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text !== '') xor
		      ($name !== '' & $project_img === '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text !== '') xor
		      ($name === '' & $project_img !== '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text !== '')) {
		$data['status'] = 'ERROR4';
		$data['text'] = "Последний рывок. ВЫ СМОЖЕТЕ!1";
	} elseif (($name === '' & $project_img !== '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text === '') xor
		      ($name === '' & $project_img === '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text === '') xor
		      ($name === '' & $project_img === '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text !== '')) {
		$data['status'] = 'ERROR5';
		$data['text'] = "Нестандартное начало. Посмотрим, что будет дальше";
	} elseif (($name !== '' & $project_img === '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text === '') xor
		      ($name !== '' & $project_img === '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text !== '') xor
		      ($name === '' & $project_img !== '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text === '') xor
		      ($name === '' & $project_img !== '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text !== '') xor
		      ($name === '' & $project_img === '' & (preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url)) & $project_text !== '') xor
		      ($name === '' & $project_img !== '' & (!preg_match('/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/', $project_url) || $project_url === '') & $project_text !== '')) {
		$data['status'] = 'ERROR6';
		$data['text'] = "Нам интересен Ваш подход. Продолжайте";
	} else {
		$data['status'] = 'OK';
		$data['text'] = "Вы справились! Поздравляем!";
	}

	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>