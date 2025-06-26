<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\TimeOffRequest;
use Illuminate\Http\Request;
use Log;

class TimeOffRequestController extends Controller
{

    public function submitTimeOffRequest(Request $request)
    {
        Log::info('Incoming request to: ' . $request->path());

        $user = auth()->user();
        $employeeId = $user->employee_id;

        if (!$employeeId) {
            return response()->json([
                'success' => false,
                'message' => 'Employee ID not found for authenticated user.'
            ], 403);
        }

        // ✅ Load employee's job details to get manager_id
        $employee = Employee::with('jobDetail')->find($employeeId);
        $managerId = optional($employee->jobDetail)->manager_id;

        // ✅ Validate the rest of the fields
        $validated = $request->validate([
            'time_off_type_id' => 'required|exists:time_off_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'first_day_type' => 'in:full,half',
            'last_day_type' => 'in:full,half',
            'total_days' => 'required|numeric|min:0.5|max:365',
            'note' => 'nullable|string',
            'attachment' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // ✅ Handle attachment
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $fileName = uniqid('attachment_') . '.' . $attachment->extension();
            $attachmentPath = $attachment->storeAs('time_off_attachments', $fileName, 'private');
        }

        // ✅ Create the time off request
        $requestModel = TimeOffRequest::create([
            'employee_id' => $employeeId,
            'manager_id' => $managerId,
            'time_off_type_id' => $validated['time_off_type_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'first_day_type' => $validated['first_day_type'] ?? 'full',
            'last_day_type' => $validated['last_day_type'] ?? 'full',
            'total_days' => $validated['total_days'],
            'note' => $validated['note'] ?? null,
            'attachment_path' => $attachmentPath,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Time off request submitted successfully.',
            'data' => $requestModel,
        ], 201);
    }

    public function getById($id)
    {
        $request = TimeOffRequest::with(['employee', 'timeOffType'])->find($id);

        if (!$request) {
            return response()->json([
                'success' => false,
                'message' => 'Time off request not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $request,
        ]);
    }


    public function getByManager($managerId)
    {
        $requests = TimeOffRequest::with(['employee', 'timeOffType']) // Optional: eager load related data
            ->where('manager_id', $managerId)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $requests
        ]);
    }


    public function getByEmployeeId($employeeId)
    {
        $requests = TimeOffRequest::with(['timeOffType'])
            ->where('employee_id', $employeeId)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $requests,
        ]);
    }


}
