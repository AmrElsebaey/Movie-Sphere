import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './services/guard/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./modules/movie/movie.module').then((m) => m.MovieModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
];
