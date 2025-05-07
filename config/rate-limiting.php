<?php

return [
    'api' => [
        'max_attempts' => 60,
        'decay_minutes' => 1,
    ],

    'web' => [
        'max_attempts' => 100,
        'decay_minutes' => 1,
    ],

    'admin' => [
        'max_attempts' => 200,
        'decay_minutes' => 1,
    ],
]; 