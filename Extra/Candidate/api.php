
<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CandidateController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return response()->json(['message' => 'Welcome to My Laravel API!']);
});

Route::get('/images/{filename}', [ImageController::class, 'show']);
Route::get('/files/{path}', [FileController::class, 'show'])->where('path', '.*');
Route::get('/candidates/{id}', [CandidateController::class, 'show']);
Route::post('/candidates/{id}/next-stage', [CandidateController::class, 'moveToNextStage']);
Route::post('/candidates/{id}/set-stage', [CandidateController::class, 'setStage']);
Route::get('/stages', function () {
    return ['source', 'applied', 'assessment', 'phone screen', 'interview', 'hired'];
});



