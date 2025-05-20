<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Welcome to My Laravel API!';
});

require base_path('routes/auth.php');



require __DIR__.'/auth.php';
require __DIR__.'/api.php';
