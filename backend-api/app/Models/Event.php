<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'manager_id',
        'title',
        'description',
        'date',
        'time',
        'visibility',
    ];

    /**
     * Each event is created by a manager (who is also an employee).
     */
    public function manager()
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }
}
