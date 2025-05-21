<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    protected $stages = [
        'source',
        'applied',
        'assessment',
        'phone_screen',
        'interview',
        'hired',
    ];

    public function moveToNextStage($id)
    {
        $candidate = Candidate::findOrFail($id);
        $currentIndex = array_search($candidate->stage, $this->stages);

        if ($currentIndex !== false && $currentIndex < count($this->stages) - 1) {
            $candidate->stage = $this->stages[$currentIndex + 1];
            $candidate->save();
            return response()->json(['message' => 'Moved to next stage', 'data' => $candidate]);
        }

        return response()->json(['message' => 'Already at final stage or invalid stage'], 400);
    }

    public function setStage(Request $request, $id)
    {
        $candidate = Candidate::findOrFail($id);

        $stage = $request->input('stage');

        if (!in_array($stage, $this->stages)) {
            return response()->json(['error' => 'Invalid stage provided'], 400);
        }

        $candidate->stage = $stage;
        $candidate->save();

        return response()->json([
            'message' => 'Stage updated successfully',
            'data' => $candidate,
        ]);
    }

    public function show($id)
    {
        return Candidate::findOrFail($id);
    }


}
