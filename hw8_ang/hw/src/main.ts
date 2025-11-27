import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './app/features/items/state/items.reducer';
import { ItemsEffects } from './app/features/items/state/items.effects';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStore({ items: itemsReducer }),
    provideEffects([ItemsEffects])
  ]
});