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


    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }
}
