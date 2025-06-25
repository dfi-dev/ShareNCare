<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateManagerColumnInJobDetailsTable extends Migration
{
    public function up()
    {
        Schema::table('job_details', function (Blueprint $table) {
            // Drop the old string-based manager column if it exists
            if (Schema::hasColumn('job_details', 'manager')) {
                $table->dropColumn('manager');
            }

            // Add the new foreign key manager_id
            $table->unsignedBigInteger('manager_id')->nullable()->after('employee_id');

            $table->foreign('manager_id')
                  ->references('id')
                  ->on('employees')
                  ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('job_details', function (Blueprint $table) {
            // Drop the foreign key first
            $table->dropForeign(['manager_id']);
            $table->dropColumn('manager_id');

            // Restore the old manager column
            $table->string('manager', 191)->nullable();
        });
    }
}
