<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @return string
     */
    public function rootView(Request $request): string
    {
        return 'app'; // This should point to your React app's entry point
    }

    /**
     * Determines the current asset version.
     *
     * @param  Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @param  Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // Share authenticated user data
            'auth' => [
                'user' => $request->user(),
            ],
            // Share flash messages
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
