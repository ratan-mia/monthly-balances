<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    // Define the table if it's not the plural of the model name (not needed here, but good practice)
    protected $table = 'loans';

    // The attributes that are mass assignable
    protected $fillable = [
        'company_id',
        'user_id',
        'bank_id',
        'type',
        'limit',
        'occupied_balance',
        'available_balance',
    ];

    /**
     * Get the company that owns the loan.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the user that owns the loan.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the bank that owns the loan.
     */
    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }
}
