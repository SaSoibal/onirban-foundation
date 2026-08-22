<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string $donor_name
 * @property string|null $donor_email
 * @property string|null $donor_phone
 * @property string $amount
 * @property string $currency
 * @property string $payment_method
 * @property string|null $transaction_id
 * @property string|null $message
 * @property string $status
 * @property CarbonInterface|null $donated_at
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 * @property-read CarbonInterface|null $deleted_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static \Illuminate\Database\Eloquent\Builder where(string $column, mixed $operator = null, mixed $value = null, string $boolean = 'and')
 * @method static string|\Brick\Math\BigDecimal sum(string $column)
 * @method static int count()
 * @method static \Illuminate\Database\Eloquent\Model create(array $attributes = [])
 */
class Donation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'donor_name',
        'donor_email',
        'donor_phone',
        'amount',
        'currency',
        'payment_method',
        'transaction_id',
        'message',
        'status',
        'donated_at',
    ];

    protected $casts = [
        'donated_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
