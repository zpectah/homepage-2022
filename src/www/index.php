<?php
session_start();
header("Content-Type: text/html;charset=utf-8");

const PATH_ROOT = '../';
require PATH_ROOT . 'core/index.php';

$as = new \service\AuthService;
?>
<!doctype html>
<html lang="cs-CZ">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>zpecter homepage</title>
    <meta name="description" content="Browser start page" />
    <meta name="keywords" content="zpecter,homepage,start page" />
    <meta name="robots" content="none" />
    <meta name="og:url" content="http://homepage.zpecter.com/" />
    <script>
        window.APP_ENV = window.APP_ENV || '<?=(ENV)?>';
        window.APP_TIMESTAMP = window.APP_TIMESTAMP || '<?=(TIMESTAMP)?>';
        window.APP_TOKEN = window.APP_TOKEN || '<?=($as -> start_app_session())?>';
    </script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div id="App" style="width: 100%;height: 100vh;min-height: 640px;"></div>
    <script src="<?=(CFG_ENV['scripts'])?>"></script>
</body>
</html>
