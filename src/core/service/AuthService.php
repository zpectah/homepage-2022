<?php

namespace service;

use utils\Helpers;

class AuthService {

    public function start_app_session () {
        $helpers = new Helpers;
        $sess = $helpers -> get_key($_SESSION, 'APP_TOKEN');
        if ($sess) {
            $token = $sess;
        } else {
            $token = bin2hex(random_bytes(8));
            $_SESSION['APP_TOKEN'] = $token;
        }

        return $token;
    }
    public function get_app_token () {
        $helpers = new Helpers;

        return $helpers -> get_key($_SESSION, 'APP_TOKEN');
    }

}