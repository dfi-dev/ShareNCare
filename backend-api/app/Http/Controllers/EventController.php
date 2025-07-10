<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // Get all events accessible to employee or manager
    public function index()
    {
        $employeeId = Auth::user()->employee_id;

        // Fetch manager and subordinates' events
        $events = Event::whereHas('employee.jobDetail', function ($q) use ($employeeId) {
            $q->where('manager_id', $employeeId)->orWhere('employee_id', $employeeId);
        })->get();

        return response()->json($events);
    }

    // Store event
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        $event = Event::create([
            'employee_id' => Auth::user()->employee_id,
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'time' => $request->time,
        ]);

        return response()->json($event, 201);
    }
}
