<?php

return array(
    'base_url' => 'http://portfolio/',
    'database' => array(
        'host' => 'localhost',
        'user' => 'root',
        'password' => '',
        'dbname' => 'portfolio'),
    'captcha' => array(
        'public_key' => '6LeVnhMTAAAAAD-EoZ8nmmGS8Mwkj_mBFn3PEvwd',
        'secret_key' => '6LeVnhMTAAAAAI4fLln1Zs-34HwA_oMHSRCmw5ZU',
        'url_check_request' => 'https://www.google.com/recaptcha/api/siteverify',
        'js_script' => "https://www.google.com/recaptcha/api.js"
     )
);
