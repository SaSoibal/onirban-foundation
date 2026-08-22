<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Spatie\Permission\Models\Role as SpatieRole;

/**
 * @property int $id
 * @property string $name
 * @property string $guard_name
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class Role extends SpatieRole
{
    protected $fillable = ['name', 'guard_name'];
}
