<?php

namespace App\Http\Controllers;

use App\Helpers\TimeOffHelper;
use App\Models\Employee;
use App\Models\TimeOffRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TimeOffRequestController extends Controller
{

    public function submitTimeOffRequest(Request $request)
    {
        $user = auth()->user();
        $employeeId = $user->employee_id;

        if (!$employeeId) {
            return response()->json([
                'success' => false,
                'message' => 'Employee ID not found for authenticated user.'
            ], 403);
        }

        $employee = Employee::with('jobDetail')->find($employeeId);
        $managerId = optional($employee->jobDetail)->manager_id;

        // ✅ Validate with custom error message
        $validated = $request->validate([
            'time_off_type_id' => 'required|exists:time_off_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'first_day_type' => 'in:full,half',
            'last_day_type' => 'in:full,half',
            'note' => 'nullable|string',
            'attachment' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ], [
            'end_date.after_or_equal' => 'End date must be the same as or after the start date.',
        ]);

        // ✅ Default to 'full' if not sent
        $firstDayType = $validated['first_day_type'] ?? 'full';
        $lastDayType = $validated['last_day_type'] ?? 'full';

        // ✅ Calculate total days
        $start = Carbon::parse($validated['start_date']);
        $end = Carbon::parse($validated['end_date']);

        $hasOverlap = TimeOffRequest::where('employee_id', $employeeId)
            ->overlappingWith($start, $end)
            ->whereIn('status', ['pending', 'approved'])
            ->exists();

        if ($hasOverlap) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a time off request overlapping with the selected dates.'
            ], 409);
        }

        $totalDays = TimeOffHelper::calculateTotalDays($start, $end, $firstDayType, $lastDayType);
        $totalHours = $totalDays * 8;

        // ✅ Handle file upload
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $fileName = uniqid('attachment_') . '.' . $attachment->extension();
            $attachmentPath = $attachment->storeAs('time_off_attachments', $fileName, 'private');
        }

        // ✅ Save request
        $requestModel = TimeOffRequest::create([
            'employee_id' => $employeeId,
            'manager_id' => $managerId,
            'time_off_type_id' => $validated['time_off_type_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'first_day_type' => $firstDayType,
            'last_day_type' => $lastDayType,
            'total_days' => $totalDays,
            'total_hours' => $totalHours,
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
