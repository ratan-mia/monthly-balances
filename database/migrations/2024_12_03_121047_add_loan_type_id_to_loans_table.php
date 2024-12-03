<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLoanTypeIdToLoansTable extends Migration
{
    public function up()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->unsignedBigInteger('loan_type_id')->nullable();  // Add the loan_type_id column
            $table->foreign('loan_type_id')->references('id')->on('loan_types')->onDelete('set null');  // Add foreign key constraint
        });
    }

    public function down()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->dropForeign(['loan_type_id']);  // Drop the foreign key
            $table->dropColumn('loan_type_id');  // Drop the column
        });
    }
}
