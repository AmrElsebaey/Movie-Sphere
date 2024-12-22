import { Component, OnInit } from '@angular/core';
import { Movie, PageResponseMovie } from '../../../../services/models';
import { MovieUserService } from '../../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movieResponse: PageResponseMovie = {};
  page = 0;
  size = 5;
  pages: any = [];
  pageLimit = 5;

  constructor(private movieService: MovieUserService, private router: Router) {}

  ngOnInit(): void {
    this.findAllMovies();
  }

  private findAllMovies() {
    this.movieService
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
}
