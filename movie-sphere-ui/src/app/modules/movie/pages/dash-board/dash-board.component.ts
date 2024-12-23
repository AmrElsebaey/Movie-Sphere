import { Component } from '@angular/core';
import { Movie, PageResponseMovie } from '../../../../services/models';
import {
  MovieAdminService,
  MovieUserService,
} from '../../../../services/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent {
  movieResponse: PageResponseMovie = {};
  page = 0;
  size = 10;
  pages: any = [];
  pageLimit = 5;
  selectedMovieIds: number[] = [];

  constructor(
    private movieUserService: MovieUserService,
    private router: Router,
    private movieAdminService: MovieAdminService
  ) {}

  ngOnInit(): void {
    this.findAllMovies();
  }

  onSelectMovie(movieId: number | undefined, event: any) {
    if (movieId !== undefined) {
      if (event.target.checked) {
        this.selectedMovieIds.push(movieId);
      } else {
        this.selectedMovieIds = this.selectedMovieIds.filter(
          (id) => id !== movieId
        );
      }
    }
  }

  deleteSelectedMovies() {
    if (this.selectedMovieIds.length > 0) {
      this.movieAdminService
        .deleteMultipleMovies({body:this.selectedMovieIds})
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Movies Deleted',
              text: 'The selected movies have been deleted successfully!',
              confirmButtonText: 'OK',
            });

            if (this.movieResponse.content) {
              this.movieResponse.content = this.movieResponse.content.filter(
                (movie) =>
                  movie.id !== undefined &&
                  !this.selectedMovieIds.includes(movie.id)
              );
            }
            this.selectedMovieIds = [];
          },
          error: (err) => {
            console.error('Error deleting movies:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete the movies. Please try again.',
              confirmButtonText: 'OK',
            });
          },
        });
    }
  }

  searchMovies() {
    this.router.navigate(['/movies/admin/search']);
  }

  private findAllMovies() {
    this.movieUserService
      .getAllMovies({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (movies) => {
          this.movieResponse = movies;
          const totalPages = this.movieResponse.totalPages || 0;
          this.pages = Array(totalPages)
            .fill(0)
            .map((x, i) => i);
        },
      });
  }

  getPageNumbers(currentPage: number, totalPages: number): number[] {
    let startPage = Math.max(0, currentPage - Math.floor(this.pageLimit / 2));
    let endPage = Math.min(totalPages, startPage + this.pageLimit);

    if (endPage - startPage < this.pageLimit) {
      startPage = Math.max(0, endPage - this.pageLimit);
    }

    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }

  get hasMovies(): boolean {
    return (
      Array.isArray(this.movieResponse.content) &&
      this.movieResponse.content.length > 0
    );
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllMovies();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllMovies();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllMovies();
  }

  goToLastPage() {
    this.page = (this.movieResponse.totalPages as number) - 1;
    this.findAllMovies();
  }

  goToNextPage() {
    this.page++;
    this.findAllMovies();
  }

  get isLastPage() {
    return this.page === (this.movieResponse.totalPages as number) - 1;
  }

  displayMovieDetails(movie: Movie) {
    this.router.navigate(['movies', 'details', movie.id]);
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

  deleteMovie(movie: Movie) {
    this.movieAdminService.deleteMovie({ movieId: movie.id || 0 }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Movie Deleted',
          text: 'The movie has been deleted successfully!',
          confirmButtonText: 'OK',
        });
        if (this.movieResponse?.content) {
          this.movieResponse.content = this.movieResponse.content.filter(
            (m) => m.id !== movie.id
          );
        }
        this.hideDeleteModal();
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
