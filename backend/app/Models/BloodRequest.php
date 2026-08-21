<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BloodRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'requester_name',
        'requester_phone',
        'blood_group',
        'units_needed',
        'hospital_name',
        'hospital_address',
        'deadline',
        'reason',
        'status',
        'assigned_donor_id',
        'notes',
    ];

    protected $casts = [
        'deadline' => 'datetime',
    ];

    public function assignedDonor()
    {
        return $this->belongsTo(BloodDonor::class, 'assigned_donor_id');
    }
}
