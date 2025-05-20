
<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\FileController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return response()->json(['message' => 'Welcome to My Laravel API!']);
});

Route::get('/images/{filename}', [ImageController::class, 'show']);
Route::get('/files/{filename}', [ImageController::class, 'show']);

