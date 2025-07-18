<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;

class Todo extends Model
{
    use HasFactory, Prunable;

    protected $fillable = [
        'employee_id',
        'title',
        'done',
    ];

    /**
     * Define which todos should be pruned.
     * This will delete all todos created before today.
     */
    public function prunable()
    {
        return static::whereDate('created_at', '<', now()->startOfDay());
    }

    /**
     * A to-do belongs to an employee.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
