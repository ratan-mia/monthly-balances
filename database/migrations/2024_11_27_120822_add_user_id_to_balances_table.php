<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToBalancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('balances', function (Blueprint $table) {
            // Add user_id as an unsigned big integer, assuming it references the id of users table
            $table->unsignedBigInteger('user_id')->nullable()->after('bank_id');

            // Optional: Add foreign key constraint if you have a users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('balances', function (Blueprint $table) {
            $table->dropForeign(['user_id']);  // Drop foreign key constraint
            $table->dropColumn('user_id');    // Drop the user_id column
        });
    }
}
