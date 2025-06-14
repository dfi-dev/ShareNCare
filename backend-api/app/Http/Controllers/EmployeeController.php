<?php

namespace App\Http\Controllers;

use App\Helpers\FormatHelper;
use App\Http\Resources\EmployeeResource;
use App\Mail\EmployeeNotificationMail;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\JobDetail;
use App\Models\CompensationDetail;
use App\Models\LegalDocument;
use App\Models\ExperienceDetail;
use App\Models\EmergencyContact;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class EmployeeController extends Controller
{
    use ApiResponse;

    // Store all employee details (Personal, Job, Compensation, Legal, Experience, Emergency) in one API
    public function storeCompleteEmployee(Request $request)
    {
        DB::beginTransaction();
        // Log::info('Incoming employee data:', $request->all());

        try {
            // Convert all the incoming camelCase data into snake_case
            $requestData = FormatHelper::camelToSnake($request->all());

            // Get the currently logged-in user
            $user = auth()->user();

            // Assuming the role IDs are: Owner = 1, HR = 2, Recruiter = 3, Finance = 3
            $allowedRoles = [1, 2, 3, 4];

            if (!in_array($user->role, $allowedRoles)) {
                return $this->errorResponse(
                    'Unauthorized: You do not have permission to add an employee.',
                    403
                );
            }

            // Fetch company details (assuming a company relation exists on User model)
            $company = $user->company; // Assuming there is a company() relationship on the User model.

            // Ensure the company exists
            if (!$company) {
                return $this->errorResponse(
                    'Company details not found for the logged-in user.',
                    404
                );
            }

            // Step 1: Personal Details
            $personalData = $requestData['personal'] ?? [];
            $validatedEmployee = Validator::make($personalData, [
                'first_name' => 'required|string',
                'middle_name' => 'nullable|string',
                'last_name' => 'required|string',
                'preferred_name' => 'nullable|string',
                'country' => 'nullable|string',
                'address' => 'nullable|string',
                'gender' => 'nullable|string|in:Male,Female,Others',
                'birthdate' => 'nullable|date',
                'marital_status' => 'required|string|in:Single,Married,Common Law,Domestic Partnership',
                'phone' => 'nullable|string',
                'work_email' => 'nullable|email',
                'personal_email' => 'nullable|email',
                'chat_video_call' => 'nullable|string',
                'social_media' => 'nullable|string',
                'profile_image' => 'nullable|file|image|max:2048',
            ])->validate();

            if ($request->hasFile('personal.profileImage')) {
                // Use store() method which will automatically move the file from the temporary location
                $validatedEmployee['profile_image'] = $request->file('personal.profileImage')->store('profiles', 'public');
            }

            // Add the company_id to the employee data before saving
            $validatedEmployee['company_id'] = $company->id;

            $employee = Employee::create($validatedEmployee);

            // Step 2: Job Details
            $jobData = $requestData['job'] ?? [];
            $validatedJob = Validator::make($jobData, [
                'job_title' => 'required|string',
                'hire_date' => 'nullable|date',
                'start_date' => 'required|date',
                'entity' => 'nullable|string',
                'department' => 'nullable|string',
                'effective_date' => 'required|date',
                'employment_type' => 'required|string|in:Contractor,Full-Time,Part-Time',
                'workplace' => 'nullable|string|in:Onsite,Remote,Hybrid',
                'expiry_date' => 'nullable|date',
                'manager' => 'nullable|string',
                'work_schedule' => 'nullable|string',
                'note' => 'nullable|string'
            ])->validate();

            $employee->jobDetail()->create($validatedJob);

            // Step 3: Compensation Details
            $compData = $requestData['compensation_benefits'] ?? [];
            $validatedComp = Validator::make($compData, [
                'salary_details' => 'nullable|string',
                'bank_name' => 'required|string',
                'iban' => 'required|string',
                'account_number' => 'nullable|string',
            ])->validate();

            $employee->compensationDetail()->create($validatedComp);

            // Step 4: Legal Documents
            $legalData = $requestData['legal_documents'] ?? [];

            $validatedLegal = Validator::make($legalData, [
                'social_security_number' => 'required|string',
                'national_id' => 'required|string',
                'nationality' => 'nullable|string',
                'citizenship' => 'nullable|string',
                'passport' => 'nullable|string',
                'work_visa' => 'nullable|string',
                'visa_details' => 'nullable|string',
                'issue_date_national_id' => 'nullable|date',
                'issue_date_tax_id' => 'nullable|date',
                'issue_date_s_s_n' => 'nullable|date',
                'tax_id' => 'required|string',
                'social_insurance_number' => 'nullable|string',
                'ssn_file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
                'national_id_file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
                'tax_id_file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
            ])->validate();


            // Log::info('Validated legal data:', $validatedLegal);

            // Store files if present
            if ($request->hasFile('legalDocuments.ssnFile')) {
                $validatedLegal['ssn_file'] = $request->file('legalDocuments.ssnFile')->store('legal_docs', 'public');
            }
            if ($request->hasFile('legalDocuments.nationalIdFile')) {
                $validatedLegal['national_id_file'] = $request->file('legalDocuments.nationalIdFile')->store('legal_docs', 'public');
            }
            if ($request->hasFile('legalDocuments.taxIdFile')) {
                $validatedLegal['tax_id_file'] = $request->file('legalDocuments.taxIdFile')->store('legal_docs', 'public');
            }

            // Create related model entry
            $employee->legalDocument()->create($validatedLegal);


            // Step 5: Experience
            $expData = $requestData['experience'] ?? [];
            $validatedExperience = Validator::make($expData, [
                'skill' => 'nullable|string',
                'job' => 'nullable|string',
                'language' => 'nullable|string',
                'education' => 'nullable|string',
                'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            ])->validate();

            // Log::info('Validated experience data:', $validatedExperience);


            if ($request->hasFile('experience.resume')) {
                $validatedExperience['resume'] = $request->file('experience.resume')->store('resumes', 'public');
            }

            $employee->experienceDetail()->create($validatedExperience);

            // Step 6: Emergency Contact
            $emergencyData = $requestData['emergency'] ?? [];
            $validatedEmergency = Validator::make($emergencyData, [
                'contact_name' => 'nullable|string',
                'contact_phone' => 'nullable|string',

            ])->validate();

            $employee->emergencyContact()->create($validatedEmergency);


            // ✅ INSERT THIS BLOCK BEFORE DB::commit()

            // Generate a temporary password
            $tempPassword = Str::random(10);

            // Create a user account for the employee
            $userAccount = User::create([
                'company_id'  => $employee->company_id,
                'employee_id' => $employee->id,
                'email'       => $employee->work_email ?? $employee->personal_email,
                'password'    => Hash::make($tempPassword),
                'role'        => 5, // Set correct role ID (e.g., 5 = Employee, adjust as needed)
            ]);

            // Prepare welcome email data
            $emailData = [
                'name'            => $employee->first_name . ' ' . $employee->last_name,
                'email'           => $userAccount->email,
                'temp_password'   => $tempPassword,
                'it_support_email' => 'itsupport@sharencare.co',
                'sender_name'     => 'Anwar Kazi',
                'sender_position' => 'CEO',
                'company_name'    => 'sharencare',
                'contact_info'    => 'contact@sharencare.co | +91-1234567890',
            ];

            // Send welcome email
            if (!empty($emailData['email'])) {
                Mail::to($emailData['email'])->send(new \App\Mail\EmployeeNotificationMail($emailData));
            }

            DB::commit();

            return $this->successResponse(
                ['employee_id' => $employee->id],
                'Employee and related information saved successfully!',
            );
        } catch (\Exception $e) {

            DB::rollBack();
            // Check for duplicate entry for the work_email field
            if ($e->getCode() == 23000 && strpos($e->getMessage(), 'employees_work_email_unique') !== false) {
                return $this->errorResponse(
                    'The email address is already in use. Please provide a unique email address.',
                    422
                );
            }
            // For other exceptions
            return $this->errorResponse(
                'Something went wrong: ' . $e->getMessage(),
                500
            );
        }
    }

    // Update employee profile data
    //  Comments:
    //  1. Need to fix file re-uploads and handle them
    //  2. proper response data
    //  3. efficient error handling
    //  4. If anything goes wrong, whole transcation should be cancelled
    //  5. Permission and security while updating

    public function updateCompleteEmployee(Request $request, $id)
    {
        Log::info('Incoming request data: ', $request->all());
        Log::info($id);

        DB::beginTransaction();

        try {
            $requestData = FormatHelper::camelToSnake($request->all());
            $user = auth()->user();
            $allowedRoles = [1, 2, 3, 4];

            if (!in_array($user->role, $allowedRoles)) {
                return $this->errorResponse('Unauthorized: You do not have permission to update an employee.', 403);
            }

            $employee = Employee::with([
                'jobDetail',
                'compensationDetail',
                'legalDocument',
                'experienceDetail',
                'emergencyContact'
            ])->findOrFail($id);

            if ($user->company_id !== $employee->company_id) {
                return $this->errorResponse('Unauthorized: This employee does not belong to your company.', 403);
            }

            // --- Step 1: Personal Details ---
            $personalData = $requestData['personal'] ?? [];
            $validatedEmployee = Validator::make($personalData, [
                'first_name' => 'required|string',
                'middle_name' => 'nullable|string',
                'last_name' => 'required|string',
                'preferred_name' => 'nullable|string',
                'country' => 'nullable|string',
                'address' => 'nullable|string',
                'gender' => 'nullable|string|in:Male,Female,Others',
                'birthdate' => 'nullable|date',
                'marital_status' => 'required|string|in:Single,Married,Common Law,Domestic Partnership',
                'phone' => 'nullable|string',
                'work_email' => 'nullable|email',
                'personal_email' => 'nullable|email',
                'chat_video_call' => 'nullable|string',
                'social_media' => 'nullable|string',
                // 'profile_image' => 'nullable|file|image|max:2048',
            ])->validate();

            if ($request->hasFile('personal.profileImage')) {
                $validatedEmployee['profile_image'] = $request->file('personal.profileImage')->store('profiles', 'public');
            }

            $employee->update($validatedEmployee);

            // --- Step 2: Job Details ---
            $jobData = $requestData['job'] ?? [];
            $validatedJob = Validator::make($jobData, [
                'job_title' => 'required|string',
                'hire_date' => 'nullable|date',
                'start_date' => 'required|date',
                'entity' => 'nullable|string',
                'department' => 'nullable|string',
                'effective_date' => 'required|date',
                'employment_type' => 'required|string|in:Contractor,Full-Time,Part-Time',
                'workplace' => 'nullable|string|in:Onsite,Remote,Hybrid',
                'expiry_date' => 'nullable|date',
                'manager' => 'nullable|string',
                'work_schedule' => 'nullable|string',
                'note' => 'nullable|string'
            ])->validate();

            $employee->jobDetail()->updateOrCreate([], $validatedJob);

            // --- Step 3: Compensation Details ---
            $compData = $requestData['compensation_benefits'] ?? [];
            $validatedComp = Validator::make($compData, [
                'salary_details' => 'nullable|string',
                'bank_name' => 'required|string',
                'iban' => 'required|string',
                'account_number' => 'nullable|string',
            ])->validate();

            $employee->compensationDetail()->updateOrCreate([], $validatedComp);

            // --- Step 4: Legal Documents ---
            $legalData = $requestData['legal_documents'] ?? [];
            $validatedLegal = Validator::make($legalData, [
                'social_security_number' => 'required|string',
                'national_id' => 'required|string',
                'nationality' => 'nullable|string',
                'citizenship' => 'nullable|string',
                'passport' => 'nullable|string',
                'work_visa' => 'nullable|string',
                'visa_details' => 'nullable|string',
                'issue_date_national_id' => 'nullable|date',
                'issue_date_tax_id' => 'nullable|date',
                'issue_date_s_s_n' => 'nullable|date',
                'tax_id' => 'required|string',
                'social_insurance_number' => 'nullable|string',
                // 'ssn_file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
                // 'national_id_file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
                // 'tax_id_file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
            ])->validate();

            // if ($request->hasFile('legalDocuments.ssnFile')) {
            //     $validatedLegal['ssn_file'] = $request->file('legalDocuments.ssnFile')->store('legal_docs', 'public');
            // }
            // if ($request->hasFile('legalDocuments.nationalIdFile')) {
            //     $validatedLegal['national_id_file'] = $request->file('legalDocuments.nationalIdFile')->store('legal_docs', 'public');
            // }
            // if ($request->hasFile('legalDocuments.taxIdFile')) {
            //     $validatedLegal['tax_id_file'] = $request->file('legalDocuments.taxIdFile')->store('legal_docs', 'public');
            // }

            $employee->legalDocument()->updateOrCreate([], $validatedLegal);

            // --- Step 5: Experience ---
            $expData = $requestData['experience'] ?? [];
            $validatedExperience = Validator::make($expData, [
                'skill' => 'nullable|string',
                'job' => 'nullable|string',
                'language' => 'nullable|string',
                'education' => 'nullable|string',
                // 'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            ])->validate();

            // if ($request->hasFile('experience.resume')) {
            //     $validatedExperience['resume'] = $request->file('experience.resume')->store('resumes', 'public');
            // }

            $employee->experienceDetail()->updateOrCreate([], $validatedExperience);

            // --- Step 6: Emergency Contact ---
            $emergencyData = $requestData['emergency'] ?? [];
            $validatedEmergency = Validator::make($emergencyData, [
                'contact_name' => 'nullable|string',
                'contact_phone' => 'nullable|string',
            ])->validate();

            $employee->emergencyContact()->updateOrCreate([], $validatedEmergency);

            DB::commit();

            return $this->successResponse(['employee_id' => $employee->id], 'Employee details updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse('Update failed: ' . $e->getMessage(), 500);
        }
    }



    // Get by emplopyee id (specific-employee)
    public function getEmployeeDetailsById($id)
    {
        try {
            $user = auth()->user(); // assuming auth is set up

            $allowedRoles = [1, 2, 3, 4];

            // Fetch the employee by ID
            $employee = Employee::with([
                'company',
                'jobDetail',
                'compensationDetail',
                'legalDocument',
                'experienceDetail',
                'emergencyContact'
            ])->findOrFail($id);

            // Check if the logged-in user is accessing their own data,
            // or if they have an allowed role (Owner, HR, Recruiter, Finance),
            // and that the employee belongs to the same company
            if (($user->employee_id !== $employee->id && !in_array($user->role, $allowedRoles)) || $user->company_id !== $employee->company_id) {
                return $this->errorResponse(
                    'Unauthorized: You do not have permission to view this employee.',
                    403
                );
            }

            return $this->successResponse(new EmployeeResource($employee), 'Employee details fetched successfully');
        } catch (\Exception $e) {
            return $this->errorResponse(
                'Employee not found or an error occurred: ' . $e->getMessage(),
                404
            );
        }
    }

    // Get list of all employee from a specific company
    public function listAllEmployees()
    {
        try {
            $user = auth()->user();

            // Check if user is authenticated
            if (!$user) {
                return $this->errorResponse('Unauthorized: User not authenticated.', 401);
            }


            // Allowed role IDs: Owner = 1, HR = 2, Recruiter = 3, Finance = 4
            $allowedRoles = [1, 2, 3, 4];

            if (!in_array($user->role, $allowedRoles)) {
                return $this->errorResponse('Unauthorized: You do not have permission to view employees.', 403);
            }

            // Ensure user has a company
            if (!$user->company_id) {
                return $this->errorResponse('Unauthorized: No company associated with this user.', 403);
            }


            // Fetch employees from the same company
            $employees = Employee::with([
                'company',
                'jobDetail',
                'compensationDetail',
                'legalDocument',
                'experienceDetail',
                'emergencyContact'
            ])->where('company_id', $user->company_id)->get();

            // Return the employees using the EmployeeResource collection
            return $this->successResponse(EmployeeResource::collection($employees), 'Employees fetched successfully');
        } catch (\Exception $e) {
            // Return a standardized error response in case of an exception
            return $this->errorResponse('An error occurred while fetching employees: ' . $e->getMessage(), 500);
        }
    }
}
