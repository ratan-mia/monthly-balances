<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    /** @use HasFactory<\Database\Factories\BalanceFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id', // existing field
        'fund_name', // existing field
        'opening_balance', // existing field
        'current_balance', // existing field
        'fund_utilized', // existing field
        'remaining_balance', // existing field
        'company',
        'bank_name',
        'bank_id', // new field
        'user_id', // new field
        'account_type_id', // new field
        'responsible_person',
        'account_type',
        'account_number',
        'inflows',
        'outflows',
        'closing_balance', // new field
    ];

    // Relationship: A Balance belongs to an AccountType
    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    // Define the relationship to the Bank model
    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }



    // Define the relationship to the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
