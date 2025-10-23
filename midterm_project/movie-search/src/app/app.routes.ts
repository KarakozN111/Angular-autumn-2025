import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movie/:id', component: MovieDetail },
  { path: '**', redirectTo: '' },


  
];
