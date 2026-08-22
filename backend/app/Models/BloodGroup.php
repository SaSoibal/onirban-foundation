<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static int count()
 */
class BloodGroup extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public $timestamps = true;

    protected $hidden = ['pivot'];
}
