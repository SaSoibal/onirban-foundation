<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blood_requests', function (Blueprint $table) {
            $table->id();
            $table->string('requester_name');
            $table->string('requester_phone', 20);
            $table->string('blood_group', 5);
            $table->unsignedTinyInteger('units_needed');
            $table->string('hospital_name');
            $table->text('hospital_address')->nullable();
            $table->dateTime('deadline')->nullable();
            $table->text('reason')->nullable();
            $table->enum('status', ['pending', 'active', 'fulfilled', 'cancelled', 'expired'])->default('pending');
            $table->foreignId('assigned_donor_id')->nullable()->constrained('blood_donors')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('blood_group');
            $table->index('status');
            $table->index('deadline');
            $table->index('requester_phone');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blood_requests');
    }
};
