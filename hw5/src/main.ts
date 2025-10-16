import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Movielist } from './app/movielist/movielist';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
});