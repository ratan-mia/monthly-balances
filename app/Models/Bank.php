<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Bank extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'branch',
        'address',
        'contact_number',
    ];

    // One-to-many relationship with Balance
    public function balances()
    {
        return $this->hasMany(Balance::class);
    }
}
