import { Component, Input } from '@angular/core';
import { Movie } from '../../../../services/models';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  private _movie: Movie = {}

  get movie(): Movie {
    return this._movie;
  }

  @Input()
  set movie(value: Movie) {
    this._movie = value;
  }

}
