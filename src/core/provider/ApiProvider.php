<?php

namespace provider;

use utils\Helpers;
use service\AuthService;

class ApiProvider {

    private function get_data ($path, $data) {
        $dp = new DataProvider;
        $response = [
            'data' => [],
            'status' => 'error',
            'message' => 'unknown_path',
        ];

        switch ($path) {

            case 'password_encode':
                $response['data'] = $dp -> password_encode($data);
                $response['status'] = 'ok';
                $response['message'] = 'data_success';
                break;

        }

        return $response;
    }

    private function is_request_authorized (): bool {
        $helpers = new Helpers;
        $as = new AuthService;
        $authorized = false;
        $request_token = $helpers -> get_key($_SERVER, 'HTTP_X_APP_TOKEN');
        $app_token = $as -> get_app_token();
        if ($request_token && $request_token === $app_token) $authorized = true;

        return $authorized;
    }

    public function get_response (): array {
        $helpers = new Helpers;
        $response = [
            'data' => null,
            'status' => 'error',
            'message' => 'undefined_error',
        ];

        $request_authorized =          self::is_request_authorized();
        $request_url_trimmed =         ltrim( $helpers -> get_key($_SERVER, 'REDIRECT_URL'), "/" );
        $request_url =                 explode( "/", $request_url_trimmed );
        $request_url_base =            $helpers -> get_key($request_url, [ 1 ]);
        $request_data_raw =            json_decode(file_get_contents('php://input'));
        $request_data =                json_decode(json_encode($request_data_raw), true);

        if ($request_authorized) {
            $response = self::get_data($request_url_base, $request_data);
        } else {
            $response['message'] = 'unauthorized_request';
        }

        $response['response'] = [
            'path' => $request_url_base,
            'data' => $request_data,
        ];

        return $response;
    }

}