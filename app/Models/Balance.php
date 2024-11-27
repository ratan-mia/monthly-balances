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
}
