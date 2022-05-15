<?php

namespace provider;

use utils\Helpers;

class DataProvider {

    public function password_encode ($data) {
        $helpers = new Helpers;
        switch ($helpers -> get_key($data, 'type')) {

            case 'bcrypt':
                return password_hash(
                    $helpers -> get_key($data, 'string'),
                    PASSWORD_BCRYPT,
                );

            case 'argon2i':
                return password_hash(
                    $helpers -> get_key($data, 'string'),
                    PASSWORD_ARGON2I,
                );

            case 'argon2id':
                return password_hash(
                    $helpers -> get_key($data, 'string'),
                    PASSWORD_ARGON2ID,
                );

            case 'default':
            default:
                return password_hash(
                    $helpers -> get_key($data, 'string'),
                    PASSWORD_DEFAULT,
                );

        }
    }

}