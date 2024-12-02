<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;


use App\Http\Controllers\AccountTypeController;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

require __DIR__ . '/auth.php';

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});





// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('balances', BalanceController::class);
});



Route::middleware(['auth'])->group(function () {
    Route::resource('account-types', AccountTypeController::class);
    Route::resource('companies', CompanyController::class);
    Route::resource('banks', BankController::class);
});





Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});




Route::middleware(['auth', 'role:admin'])->group(function () {
    // Admin can manage user roles
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::post('/admin/users/{user}/assign-role', [UserController::class, 'assignRole'])->name('admin.users.assignRole');
});
