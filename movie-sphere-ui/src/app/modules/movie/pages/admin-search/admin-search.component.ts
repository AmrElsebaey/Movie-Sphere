import { Component } from '@angular/core';
import { Movie, PageResponseMovie } from '../../../../services/models';
import { MovieAdminService } from '../../../../services/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrl: './admin-search.component.css',
})
export class AdminSearchComponent {
  movieResponse: PageResponseMovie = {};
  page = 0;
  size = 10;
  pages: any = [];
  pageLimit = 5;
  searchQuery: any;
  constructor(
    private movieAdminService: MovieAdminService,
    private router: Router
  ) {}

  searchMovies() {
    this.movieAdminService
      .searchMovies({
        page: this.page,
        size: this.size,
        query: this.searchQuery,
      })
      .subscribe((data: any) => {
        this.movieResponse = data;
      });
  }

  addMovie(movie: Movie) {
    if (movie.imdbID) {
      this.movieAdminService.addMovie({ imdbId: movie.imdbID }).subscribe(
        (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'Movie added successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          const errorMessage =
            error.error?.message || 'There was an error adding the movie.';

          if (error.error?.error === 'Movie already exists.') {
            Swal.fire({
              title: 'Error!',
              text: 'Movie already exists.',
              icon: 'error',
              confirmButtonText: 'Try Again',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Try Again',
            });
          }
        }
      );
    } else {
      console.error('IMDbID is undefined');
    }
  }

  get hasMovies(): boolean {
    return (
      Array.isArray(this.movieResponse.content) &&
      this.movieResponse.content.length > 0
    );
  }

  displayMovieDetails(movie: Movie) {
    this.router.navigate(['movies', 'details', movie.imdbID]);
  }

  goToFirstPage() {
    this.page = 0;
    this.searchMovies();
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.searchMovies();
    }
  }

  goToNextPage() {
    if (this.movieResponse && this.movieResponse.totalPages && this.page < this.movieResponse.totalPages - 1) {
      this.page++;
      this.searchMovies();
    }
  }

  goToLastPage() {
    if (this.movieResponse && this.movieResponse.totalPages) {
      this.page = this.movieResponse.totalPages - 1;
      this.searchMovies();
    }
  }


  gotToPage(page: number) {
    this.page = page;
    this.searchMovies();
  }
}
