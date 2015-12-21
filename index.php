<?php

require_once 'vendor/autoload.php';

$router = new \Klein\Klein();
$templater = Templater::getInstance();
$config = include_once 'config/config.php';

$router->respond('GET', '/auth/?', function () use ($templater, $config) {
    $data = array();
    $data['config'] = $config;
    $data['title'] = "Авторизация";
    $data['logged'] = true;
    return $templater->display('pages/auth', $data);
});

$router->respond('GET', '/contacts/?', function () use ($templater, $config) {
    $data = array();
    $data['config'] = $config;
    $data['title'] = "Контакты";
    $data['current'] = "contacts";
    return $templater->display('pages/contacts', $data);
});

$router->respond('GET', '/portfolio/?', function () use ($templater, $config) {
    $data = array();
    $data['config'] = $config;
    $data['title'] = "Портфолио";
    $data['current'] = "portfolio";
    return $templater->display('pages/portfolio', $data);
});

$router->respond('GET', '/?', function () use ($templater, $config) {
    $data = array();
    $data['config'] = $config;
    $data['title'] = "Главная страница";
    $data['current'] = "index";
    return $templater->display('pages/index', $data);
});

$router->dispatch();

