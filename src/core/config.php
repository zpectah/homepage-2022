<?php

const ENV = BUILD['env'];
const TIMESTAMP = BUILD['timestamp'];
const DEBUG = ENV !== 'production';

const ENVIRONMENTAL = [
    'development' => [
        'scripts' => './index.bundle.js',
    ],
    'test' => [
        'scripts' => './index.bundle.min.js',
    ],
    'production' => [
        'scripts' => './index.bundle.min.js',
    ],
];
const CFG_ENV = ENVIRONMENTAL[ENV];

