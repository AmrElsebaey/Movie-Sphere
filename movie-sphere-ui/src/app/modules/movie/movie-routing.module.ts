import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { authGuard } from '../../services/guard/auth/auth.guard';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { roleGuard } from '../../services/guard/role/role.guard';
import { AdminSearchComponent } from './pages/admin-search/admin-search.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MovieListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        component: MovieDetailsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin/dashboard',
        component: DashBoardComponent,
        canActivate: [authGuard, roleGuard],
      },
      {
        path: 'admin/search',
        component: AdminSearchComponent,
        canActivate: [authGuard, roleGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
