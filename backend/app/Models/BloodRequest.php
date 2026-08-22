<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $requester_name
 * @property string $requester_phone
 * @property string $blood_group
 * @property int $units_needed
 * @property string $hospital_name
 * @property string|null $hospital_address
 * @property CarbonInterface|null $deadline
 * @property string|null $reason
 * @property string $status
 * @property int|null $assigned_donor_id
 * @property string|null $notes
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 * @property-read CarbonInterface|null $deleted_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static \Illuminate\Database\Eloquent\Builder where(string $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder whereIn(string $column, mixed $values, string $boolean = 'and', bool $not = false)
 * @method static \Illuminate\Database\Eloquent\Builder orWhere(string $column, mixed $operator = null, mixed $value = null)
 * @method static \Illuminate\Database\Eloquent\Builder orderByDesc(string $column)
 * @method static int count()
 * @method static \Illuminate\Database\Eloquent\Model create(array $attributes = [])
 */
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
