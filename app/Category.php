<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [
      'id',
    ];

    public function words()
    {
      return $this->hasMany(Word::class);
    }
}
