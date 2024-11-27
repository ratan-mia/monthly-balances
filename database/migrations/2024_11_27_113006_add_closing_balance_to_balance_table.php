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
        Schema::table('balances', function (Blueprint $table) {
            $table->decimal('closing_balance', 15, 2)->nullable()->after('outflows');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('balances', function (Blueprint $table) {
            // Dropping the closing_balance column
            $table->dropColumn('closing_balance');
        });
    }
};
