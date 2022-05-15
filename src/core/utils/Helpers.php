<?php

namespace utils;

class Helpers {

    public function get_key($variable, $key_list, $default_value=null) {
        // https://adhoctuts.com/php-undefined-key/
        /**
         * Access keys or properties of array or object
         * @variable array|object - array or object variable
         * @key_list array|string - list of keys, valid inputs are: ['key1', 'key2'], 'key1', 'key1->key2->key3', etc.
         * @default_value mixed, the default value to return if key/property does not exist
         */
        if (!isset($variable)) return $default_value;
        if (is_string($key_list)) {
            $multi = false;
            foreach (['->', '=>', '.', ','] as $sep) {
                if (strpos($key_list, $sep) !== false) {
                    $key_list = explode($sep, $key_list);
                    $multi = true;
                    break;
                }
            }
            if (!$multi) $key_list = [$key_list];
        }
        $curr = $variable;
        foreach($key_list as $key) {
            if (is_object($curr)) $curr = $curr->$key ?? null;
            else if (is_array($curr)) $curr = $curr[$key] ?? null;
            else return $default_value;
            if (is_null($curr)) return $default_value;
        }
        return $curr;
    }

}