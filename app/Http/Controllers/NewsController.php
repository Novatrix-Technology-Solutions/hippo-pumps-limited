<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    // Public index - Renders the frontend news listing page
    public function index()
    {
        $news = News::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        return Inertia::render('News/Index', [
            'news' => $news,
        ]);
    }

    // Public show - Renders the frontend single news page
    public function show(News $news)
    {
        if (!$news->is_published) {
            abort(404);
        }

        $news->load('user');

        return Inertia::render('News/Show', [
            'news' => $news,
        ]);
    }

    // Admin index - Renders the admin news listing page
    public function adminIndex()
    {
        $news = News::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    // Admin create - Shows the form to create new news
    public function create()
    {
        return Inertia::render('Admin/News/Create');
    }

    // Admin store - Saves new news
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'meta_description' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        $news = new News($validated);
        $news->slug = Str::slug($validated['title']);
        $news->user_id = auth()->id();
        $news->published_at = $validated['is_published'] ? now() : null;
        
        if ($request->hasFile('featured_image')) {
            $news->featured_image = $request->file('featured_image')->store('news', 'public');
        }

        $news->save();

        return redirect()->route('news.index');
    }

    // Admin edit - Shows the form to edit existing news
    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
        ]);
    }

    // Admin update - Updates existing news
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'meta_description' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        $news->fill($validated);
        $news->slug = Str::slug($validated['title']);
        $news->published_at = $validated['is_published'] ? now() : null;

        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($news->featured_image) {
                Storage::disk('public')->delete($news->featured_image);
            }
            $news->featured_image = $request->file('featured_image')->store('news', 'public');
        }

        $news->save();

        return redirect()->route('news.index');
    }

    // Admin destroy - Deletes news
    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->route('news.index');
    }
}