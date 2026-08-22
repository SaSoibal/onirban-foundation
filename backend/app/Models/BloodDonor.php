<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string $name
 * @property string|null $phone
 * @property string|null $email
 * @property string $blood_group
 * @property string|null $district
 * @property CarbonInterface|null $last_donation_date
 * @property string|null $photo
 * @property string|null $nid_number
 * @property bool $is_verified
 * @property int|null $verified_by
 * @property CarbonInterface|null $verified_at
 * @property bool $show_phone
 * @property bool $show_district
 * @property string $status
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 * @property-read CarbonInterface|null $deleted_at
 * @property-read bool $is_eligible
 * @property-read string|null $next_eligible_date
 *
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static \Illuminate\Database\Eloquent\Builder where(string $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder whereIn(string $column, mixed $values, string $boolean = 'and', bool $not = false)
 * @method static \Illuminate\Database\Eloquent\Builder whereNull(string $column, string $boolean = 'and', bool $not = false)
 * @method static \Illuminate\Database\Eloquent\Builder orWhere(string $column, mixed $operator = null, mixed $value = null)
 * @method static \Illuminate\Database\Eloquent\Builder orderByDesc(string $column)
 * @method static \Illuminate\Database\Eloquent\Builder with(string|array $relations)
 * @method static int count()
 * @method static \Illuminate\Database\Eloquent\Model create(array $attributes = [])
 * @method static \Illuminate\Database\Eloquent\Builder select(array|string $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Builder groupBy(array|string ...$groups)
 * @method static \Illuminate\Support\Collection pluck(string $column, string|null $key = null)
 * @method static \Illuminate\Database\Eloquent\Builder orderBy(string $column, string $direction = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder whereDate(string $column, mixed $operator, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Model findOrFail(mixed $id, array|string $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Builder limit(int $value)
 */
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
