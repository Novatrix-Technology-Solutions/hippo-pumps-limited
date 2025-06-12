<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProductController;
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

// Public Products Routes
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Dashboard routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $usersCount = \App\Models\User::count();
        $productsCount = \App\Models\PumpSolution::count();
        $teamMembersCount = \App\Models\TeamMember::count();
        $newsCount = \App\Models\News::count();
        
        // Get the latest news
        $latestNews = \App\Models\News::latest()->first();
        
        return Inertia::render('Admin/Dashboard', [
            'newsCount' => $newsCount,
            'productsCount' => $productsCount,
            'teamMembersCount' => $teamMembersCount,
            'usersCount' => $usersCount,
            'latestNews' => $latestNews,
        ]);
    })->name('dashboard');

    // Admin News Routes
    Route::get('/admin/news', [NewsController::class, 'adminIndex'])->name('admin.news.index');
    Route::get('/admin/news/create', [NewsController::class, 'create'])->name('admin.news.create');
    Route::post('/admin/news', [NewsController::class, 'store'])->name('admin.news.store');
    Route::get('/admin/news/{news}/edit', [NewsController::class, 'edit'])->name('admin.news.edit');
    Route::put('/admin/news/{news}', [NewsController::class, 'update'])->name('admin.news.update');
    Route::delete('/admin/news/{news}', [NewsController::class, 'destroy'])->name('admin.news.destroy');
    Route::put('/admin/news/{news}/toggle-publish', [NewsController::class, 'togglePublish'])->name('admin.news.toggle-publish');

    // Admin Products Routes
    Route::get('/admin/products', [ProductController::class, 'adminIndex'])->name('admin.products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/admin/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');

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
    // Remove duplicate products routes
});

// Test route
Route::get('/test-page', function () {
    return Inertia::render('TestPage');
})->name('test-page');

require __DIR__.'/auth.php';

