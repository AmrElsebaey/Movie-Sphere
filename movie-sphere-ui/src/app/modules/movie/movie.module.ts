import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    MovieCardComponent,
    MovieListComponent,
    MovieDetailsComponent,
  ],
  imports: [CommonModule, MovieRoutingModule, FormsModule, RouterModule],
})
export class MovieModule {}
