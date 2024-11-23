<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('balances', function (Blueprint $table) {
            $table->id();
            $table->string('fund_name'); //
            $table->decimal('opening_balance', 15, 2); //
            $table->decimal('current_balance', 15, 2); //
            $table->decimal('fund_utilized', 15, 2)->nullable(); //
            $table->decimal('remaining_balance', 15, 2)->nullable(); //
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balances');
    }
};
