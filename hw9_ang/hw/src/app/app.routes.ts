import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { ItemsList } from './features/items/items-list/items-list';
import { ItemDetails } from './features/items/item-details/item-details';
import { Signup } from './pages/signup/signup';
import { Profile } from './pages/profile/profile';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
{ path: '', component: Home },
{ path: 'about', component: About },
{ path: 'items', component: ItemsList },
{ path: 'items/:id', component: ItemDetails },
{ path: 'login', component: Login },
{path:'signup', component:Signup},
{path:'profile', component:Profile, canActivate: [authGuard]},
{ path: '**', redirectTo: '' }
];