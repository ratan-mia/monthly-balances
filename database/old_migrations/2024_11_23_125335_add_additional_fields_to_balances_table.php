<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdditionalFieldsToBalancesTable extends Migration
{
    public function up()
    {
        Schema::table('balances', function (Blueprint $table) {
            $table->string('company')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('responsible_person')->nullable();
            $table->string('account_type')->nullable();
            $table->string('account_number')->nullable();
            $table->decimal('inflows', 15, 2)->nullable();
            $table->decimal('outflows', 15, 2)->nullable();
        });
    }

    public function down()
    {
        Schema::table('balances', function (Blueprint $table) {
            $table->dropColumn([
                'company',
                'bank_name',
                'responsible_person',
                'account_type',
                'account_number',
                'inflows',
                'outflows',
            ]);
        });
    }
}
