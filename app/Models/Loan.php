<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'bank_id',
        'loan_type_id',  // Add loan_type_id to the fillable array
        'type',
        'limit',
        'occupied_balance',
        'available_balance',
    ];

    // Define the relationship with LoanType
    public function loanType()
    {
        return $this->belongsTo(LoanType::class);
    }

    // Define the relationship with other models like Company, User, and Bank
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }
}
