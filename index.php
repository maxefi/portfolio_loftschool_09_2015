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

    //Получаем данные из БД

    //Устанавливаем подключение к БД
    ORM::configure('mysql:host='.$config["database"]["host"].';dbname='.$config["database"]["dbname"]);
    ORM::configure('username', $config["database"]["user"]);
    ORM::configure('password', $config["database"]["password"]);

    $works = ORM::for_table('portfolio')->find_many();
    $data['works'] = $works;
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

