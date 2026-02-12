import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Authentication Guard
 * Protects routes by checking if user is authenticated
 * Redirects to login page if not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    } else {
        // Redirect to login page and pass the attempted URL as query parameter
        router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
};
