<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function show($filename)
    {
        try {
            $disk = Storage::disk('private'); // Or 'local'/'public' as per your setup
            $filePath = 'files/' . $filename; // Use 'files/' or a dynamic folder if needed

            if (!$disk->exists($filePath)) {
                return response()->json(['error' => 'File not found'], 404);
            }

            $fileContent = $disk->get($filePath);
            $mimeType = $disk->mimeType($filePath);
            $fileSize = strlen($fileContent);

            while (ob_get_level()) {
                ob_end_clean();
            }

            // Set disposition based on type — 'inline' for displayable types
            $inlineTypes = [
                'image/png', 'image/jpeg', 'image/gif', 'image/webp',
                'application/pdf',
            ];
            $disposition = in_array($mimeType, $inlineTypes) ? 'inline' : 'attachment';

            return response($fileContent, 200)
                ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Content-Type', $mimeType)
                ->header('Content-Disposition', $disposition . '; filename="' . $filename . '"')
                ->header('Content-Length', $fileSize);

        } catch (\Exception $e) {
            Log::error("File serving error: " . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
