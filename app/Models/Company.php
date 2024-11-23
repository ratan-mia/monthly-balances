<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',  // Name of the company
        'address', // Company address
        'email', // Contact email
        'phone', // Contact phone number
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function balances()
    {
        return $this->hasMany(Balance::class);
    }
}
