<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Spatie\Permission\Models\Permission as SpatiePermission;

/**
 * @property int $id
 * @property string $name
 * @property string $guard_name
 * @property-read CarbonInterface|null $created_at
 * @property-read CarbonInterface|null $updated_at
 */
class Permission extends SpatiePermission
{
    protected $fillable = ['name', 'guard_name'];
}
