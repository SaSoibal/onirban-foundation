<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BloodDonor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'email',
        'blood_group',
        'district',
        'last_donation_date',
        'photo',
        'nid_number',
        'is_verified',
        'verified_by',
        'verified_at',
        'show_phone',
        'show_district',
        'status',
    ];

    protected $casts = [
        'last_donation_date' => 'date',
        'verified_at' => 'datetime',
        'is_verified' => 'boolean',
        'show_phone' => 'boolean',
        'show_district' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function bloodRequests()
    {
        return $this->hasMany(BloodRequest::class, 'assigned_donor_id');
    }

    public function getIsEligibleAttribute(): bool
    {
        if ($this->last_donation_date === null) {
            return true;
        }

        return $this->last_donation_date->addMonths(3)->isPast();
    }

    public function getNextEligibleDateAttribute(): ?string
    {
        if ($this->last_donation_date === null) {
            return null;
        }

        return $this->last_donation_date->addMonths(3)->format('Y-m-d');
    }
}
