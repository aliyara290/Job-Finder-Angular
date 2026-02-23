import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptors/api-key-interceptor';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { favoriteReducer } from './domains/favorites/store/favorite.reducers';
import { applicationReducer } from './domains/applications-tracker/store/application.reducers';
import { provideEffects } from '@ngrx/effects';
import { FavoriteEffects } from './domains/favorites/store/favorite.effects';
import { ApplicationEffects } from './domains/applications-tracker/store/application.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(withInterceptors([
            apiKeyInterceptor
        ])),
        provideStore({
            favorite: favoriteReducer,
            applications: applicationReducer
        }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects([FavoriteEffects, ApplicationEffects])
    ]
};
