<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BankController;

use App\Http\Controllers\AccountTypeController;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\BalanceController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::resource('companies', CompanyController::class);
Route::resource('balances', BalanceController::class);
Route::resource('banks', BankController::class);




Route::middleware(['auth'])->group(function () {
    Route::get('/account-types', [AccountTypeController::class, 'index'])->name('account-types.index');
    Route::get('/account-types/create', [AccountTypeController::class, 'create'])->name('account-types.create');
    Route::post('/account-types', [AccountTypeController::class, 'store'])->name('account-types.store');
    Route::get('/account-types/{id}/edit', [AccountTypeController::class, 'edit'])->name('account-types.edit');
    Route::put('/account-types/{id}', [AccountTypeController::class, 'update'])->name('account-types.update');
    Route::delete('/account-types/{id}', [AccountTypeController::class, 'destroy'])->name('account-types.destroy');
});



require __DIR__ . '/auth.php';
