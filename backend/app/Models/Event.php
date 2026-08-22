<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property CarbonInterface|null $event_date
 * @property CarbonInterface|null $end_date
 * @property string|null $location
 * @property string|null $image
 * @property string|null $registration_url
 * @property string $status
 * @property int|null $created_by
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 * @property-read CarbonInterface|null $deleted_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static \Illuminate\Database\Eloquent\Builder where(string $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder orWhere(string $column, mixed $operator = null, mixed $value = null)
 * @method static \Illuminate\Database\Eloquent\Builder orderByDesc(string $column)
 * @method static int count()
 * @method static \Illuminate\Database\Eloquent\Model create(array $attributes = [])
 * @method static \Illuminate\Database\Eloquent\Model where(string $column, mixed $operator = null, mixed $value = null)
 */
class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'event_date',
        'end_date',
        'location',
        'image',
        'registration_url',
        'status',
        'created_by',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
