import { Component, OnInit } from '@angular/core';
import {
  MovieAdminService,
  MovieUserService,
} from '../../../../services/services';
import { Movie } from '../../../../services/models';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../services/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  imdbId!: string;
  movie!: Movie;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieUserService: MovieUserService,
    private movieAdminService: MovieAdminService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.imdbId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchMovieDetails();
    this.isAdmin = this.tokenService.isAdmin();
  }

  private fetchMovieDetails() {
    if (this.movieId) {
      this.movieUserService.getMovie1({ id: this.movieId }).subscribe({
        next: (movie) => {
          this.movie = movie;
        },
        error: (err) => {
          console.error('Error fetching movie details by ID:', err);
        },
      });
    } else if (this.imdbId) {
      this.movieAdminService.getMovie({ imdbId: this.imdbId }).subscribe({
        next: (movie) => {
          this.movie = movie;
        },
        error: (err) => {
          console.error('Error fetching movie details by IMDb ID:', err);
        },
      });
    } else {
      console.error('No movieId or imdbId provided');
    }
  }

  showDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.add('show');
    }
  }

  hideDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.remove('show');
    }
  }

  deleteMovie() {
    this.movieAdminService.deleteMovie({ movieId: this.movieId }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Movie Deleted',
          text: 'The movie has been deleted successfully!',
          confirmButtonText: 'OK',
        });
        this.hideDeleteModal();
        this.router.navigate(['movies']);
      },
      error: (err) => {
        console.error('Error deleting movie:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the movie. Please try again.',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
