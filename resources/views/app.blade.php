<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="app-version" content="{{ config('app.version') }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes

        @if (env('VITE_DEV_SERVER') === 'true')
            {{-- Local Dev: Use hot-reloading and full Vite server --}}
            @viteReactRefresh
            @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @else
            {{-- Production: Only use the built app entry --}}
            @vite(['resources/js/app.tsx'])
        @endif

        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
