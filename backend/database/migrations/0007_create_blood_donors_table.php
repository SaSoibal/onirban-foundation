<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blood_donors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('phone', 20);
            $table->string('email')->nullable();
            $table->string('blood_group', 5);
            $table->string('district', 100);
            $table->date('last_donation_date')->nullable();
            $table->string('photo')->nullable();
            $table->string('nid_number', 50)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->boolean('show_phone')->default(true);
            $table->boolean('show_district')->default(true);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index('blood_group');
            $table->index('district');
            $table->index('is_verified');
            $table->index('status');
            $table->index('last_donation_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blood_donors');
    }
};
