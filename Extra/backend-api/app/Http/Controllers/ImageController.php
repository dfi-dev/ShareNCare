<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;

class ImageController extends Controller
{
    public function show($filename)
{
    try {
        $disk = Storage::disk('private');
        $filePath = 'images/' . $filename;

        if (!$disk->exists($filePath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $fileContent = $disk->get($filePath);
        $mimeType = $disk->mimeType($filePath);
        $fileSize = strlen($fileContent);

        while (ob_get_level()) {
            ob_end_clean();
        }

        return response($fileContent, 200)
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="' . $filename . '"')
            ->header('Content-Length', $fileSize);

    } catch (\Exception $e) {
        Log::error("Exception serving image: " . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}
}
