<?php

namespace App\Providers;

use App\Support\LinkPillsPaginator;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(LengthAwarePaginator::class, LinkPillsPaginator::class);
    }

    public function boot(): void
    {
        Collection::macro('linkPills', fn () => collect());

        EloquentCollection::macro('linkPills', fn () => collect());
    }
}
