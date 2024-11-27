<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    // Relationship: An AccountType can have many balances
    public function balances()
    {
        return $this->hasMany(Balance::class);
    }
}
