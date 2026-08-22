<?php

namespace App\Support;

use Illuminate\Pagination\LengthAwarePaginator;

class LinkPillsPaginator extends LengthAwarePaginator
{
    public function linkPills()
    {
        return $this->linkCollection();
    }
}
