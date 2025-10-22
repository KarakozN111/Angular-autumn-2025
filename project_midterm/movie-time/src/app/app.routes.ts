import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Category } from './category/category';
import { MovieDetail } from './movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'category/:id', component: Category },
  { path: 'movie/:id', component: MovieDetail }
];