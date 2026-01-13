import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Detail } from './pages/detail/detail';
import { Portfolio } from './pages/portfolio/portfolio';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'coin/:id', component: Detail },
  { path: 'portfolio', component: Portfolio },
  { path: '**', redirectTo: '' },
];
