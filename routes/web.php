<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PumpSolutionController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/find-us', function () {
    return Inertia::render('FindUs');
})->name('find-us');

Route::get('/meet-the-team', function () {
    $teamMembers = \App\Models\TeamMember::orderBy('order')->get();
    return Inertia::render('MeetTheTeam', [
        'teamMembers' => $teamMembers,
    ]);
})->name('meet-the-team');

Route::get('/the-company', function () {
    return Inertia::render('TheCompany');
})->name('the-company');


// Public News Routes
Route::get('/news', [NewsController::class, 'index'])->name('public.news.index');
Route::get('/news/{news:slug}', [NewsController::class, 'show'])->name('public.news.show');

// Public Pump Solutions routes
Route::get('/products', [PumpSolutionController::class, 'index'])->name('pump-solutions.index');
Route::get('/products/{pumpSolution:slug}', [PumpSolutionController::class, 'show'])->name('pump-solutions.show');

// Dashboard routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $newsCount = \App\Models\News::count();
        $pumpSolutionsCount = \App\Models\PumpSolution::count();
        $teamMembersCount = \App\Models\TeamMember::count();
        $usersCount = \App\Models\User::count();
        
        return Inertia::render('Admin/Dashboard', [
            'newsCount' => $newsCount,
            'pumpSolutionsCount' => $pumpSolutionsCount,
            'teamMembersCount' => $teamMembersCount,
            'usersCount' => $usersCount,
        ]);
    })->name('dashboard');

    // Admin News Routes
    Route::prefix('admin/news')->name('news.')->group(function () {
        Route::get('/', [NewsController::class, 'adminIndex'])->name('index');
        Route::get('/create', [NewsController::class, 'create'])->name('create');
        Route::post('/', [NewsController::class, 'store'])->name('store');
        Route::get('/{news}/edit', [NewsController::class, 'edit'])->name('edit');
        Route::put('/{news}', [NewsController::class, 'update'])->name('update');
        Route::delete('/{news}', [NewsController::class, 'destroy'])->name('destroy');
    });

    // Admin Pump Solutions Routes
    Route::prefix('admin/products')->name('admin.pump-solutions.')->group(function () {
        Route::get('/', [PumpSolutionController::class, 'adminIndex'])->name('index');
        Route::get('/create', [PumpSolutionController::class, 'create'])->name('create');
        Route::post('/', [PumpSolutionController::class, 'store'])->name('store');
        Route::get('/{pumpSolution}/edit', [PumpSolutionController::class, 'edit'])->name('edit');
        Route::put('/{pumpSolution}', [PumpSolutionController::class, 'update'])->name('update');
        Route::delete('/{pumpSolution}', [PumpSolutionController::class, 'destroy'])->name('destroy');
    });

    // Admin Team Members Routes
    Route::prefix('admin/team-members')->name('team-members.')->group(function () {
        Route::get('/', [TeamMemberController::class, 'index'])->name('index');
        Route::get('/create', [TeamMemberController::class, 'create'])->name('create');
        Route::post('/', [TeamMemberController::class, 'store'])->name('store');
        Route::get('/{teamMember}/edit', [TeamMemberController::class, 'edit'])->name('edit');
        Route::put('/{teamMember}', [TeamMemberController::class, 'update'])->name('update');
        Route::delete('/{teamMember}', [TeamMemberController::class, 'destroy'])->name('destroy');
    });

    // Admin User Management Routes
    Route::prefix('admin/users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
    });

    // Admin Profile Routes
    Route::prefix('admin/profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    // Team Members Routes
    Route::get('/team-members', [TeamMemberController::class, 'index'])->name('admin.team-members.index');
    Route::get('/team-members/create', [TeamMemberController::class, 'create'])->name('admin.team-members.create');
    Route::post('/team-members', [TeamMemberController::class, 'store'])->name('admin.team-members.store');
    Route::get('/team-members/{teamMember}/edit', [TeamMemberController::class, 'edit'])->name('admin.team-members.edit');
    Route::put('/team-members/{teamMember}', [TeamMemberController::class, 'update'])->name('admin.team-members.update');
    Route::delete('/team-members/{teamMember}', [TeamMemberController::class, 'destroy'])->name('admin.team-members.destroy');
});

Route::middleware(['web', 'auth:sanctum', 'verified'])->group(function () {
    // Remove duplicate pump-solutions routes
});

Route::middleware(['web', 'auth:sanctum', 'verified', 'admin'])->group(function () {
    Route::get('/admin/products', [PumpSolutionController::class, 'adminIndex'])
        ->name('admin.pump-solutions.index')
        ->middleware('throttle:60,1');

    Route::get('/admin/products/create', [PumpSolutionController::class, 'create'])
        ->name('admin.pump-solutions.create')
        ->middleware('throttle:60,1');

    Route::post('/admin/products', [PumpSolutionController::class, 'store'])
        ->name('admin.pump-solutions.store')
        ->middleware('throttle:60,1');

    Route::get('/admin/products/{pumpSolution}/edit', [PumpSolutionController::class, 'edit'])
        ->name('admin.pump-solutions.edit')
        ->middleware('throttle:60,1');

    Route::put('/admin/products/{pumpSolution}', [PumpSolutionController::class, 'update'])
        ->name('admin.pump-solutions.update')
        ->middleware('throttle:60,1');

    Route::delete('/admin/products/{pumpSolution}', [PumpSolutionController::class, 'destroy'])
        ->name('admin.pump-solutions.destroy')
        ->middleware('throttle:60,1');
});

// Test route
Route::get('/test-page', function () {
    return Inertia::render('TestPage');
})->name('test-page');

require __DIR__.'/auth.php';

