import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Detail } from './pages/detail/detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'coin/:id', component: Detail },
  { path: '**', redirectTo: '' },
];
