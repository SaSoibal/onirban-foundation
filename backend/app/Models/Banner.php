<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string|null $title
 * @property string|null $subtitle
 * @property string $image_url
 * @property string|null $link_url
 * @property string|null $button_text
 * @property int $sort_order
 * @property bool $is_active
 * @property string $status
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 * @property-read CarbonInterface|null $deleted_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static \Illuminate\Database\Eloquent\Builder where(string $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder orWhere(string $column, mixed $operator = null, mixed $value = null)
 * @method static \Illuminate\Database\Eloquent\Builder orderBy(string $column, string $direction = 'asc')
 * @method static int count()
 */
class Banner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'subtitle',
        'image_url',
        'link_url',
        'button_text',
        'sort_order',
        'is_active',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
