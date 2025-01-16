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
        Schema::create('repayment_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('institutes');
            $table->string('loan_account_number');
            $table->string('loan_type')->nullable();
            $table->decimal('limit', 15, 2)->nullable();
            $table->decimal('outstanding', 15, 2)->nullable();
            $table->date('disbursement_date')->nullable();
            $table->float('rate_of_interest')->nullable();
            $table->integer('tenor')->nullable();
            $table->json('repayment_dates')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repayment_schedules');
    }
};
