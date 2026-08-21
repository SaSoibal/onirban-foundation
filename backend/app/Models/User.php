<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasRoles;
    use Notifiable;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'status',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function pages()
    {
        return $this->hasMany(Page::class, 'created_by');
    }

    public function programs()
    {
        return $this->hasMany(Program::class, 'created_by');
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class, 'created_by');
    }

    public function teamMembers()
    {
        return $this->hasMany(TeamMember::class, 'created_by');
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'created_by');
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class, 'created_by');
    }

    public function media()
    {
        return $this->hasMany(Media::class, 'created_by');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function verifiedDonors()
    {
        return $this->hasMany(BloodDonor::class, 'verified_by');
    }
}
