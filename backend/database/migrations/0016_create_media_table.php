<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('file_path', 500);
            $table->enum('file_type', ['image', 'document', 'video', 'audio'])->default('image');
            $table->unsignedInteger('file_size')->nullable();
            $table->string('mime_type')->nullable();
            $table->string('collection')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();

            $table->index('collection');
            $table->index('file_type');
            $table->index('created_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
