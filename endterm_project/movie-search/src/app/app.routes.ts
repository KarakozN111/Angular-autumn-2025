import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MovieDetail } from './components/movie-detail/movie-detail';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProfileComponent } from './components/profile/profile';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetail },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
