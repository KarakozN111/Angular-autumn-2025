import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { ItemsList } from './features/items/items-list/items-list';
import { ItemDetails } from './features/items/item-details/item-details';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'items', component: ItemsList },
  { path: 'items/:id', component: ItemDetails },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];
