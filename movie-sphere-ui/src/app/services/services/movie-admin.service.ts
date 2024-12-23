/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addMovie } from '../fn/movie-admin/add-movie';
import { AddMovie$Params } from '../fn/movie-admin/add-movie';
import { deleteMovie } from '../fn/movie-admin/delete-movie';
import { DeleteMovie$Params } from '../fn/movie-admin/delete-movie';
import { deleteMultipleMovies } from '../fn/movie-admin/delete-multiple-movies';
import { DeleteMultipleMovies$Params } from '../fn/movie-admin/delete-multiple-movies';
import { getMovie } from '../fn/movie-admin/get-movie';
import { GetMovie$Params } from '../fn/movie-admin/get-movie';
import { Movie } from '../models/movie';
import { PageResponseMovie } from '../models/page-response-movie';
import { searchMovies1 } from '../fn/movie-admin/search-movies-1';
import { SearchMovies1$Params } from '../fn/movie-admin/search-movies-1';

@Injectable({ providedIn: 'root' })
export class MovieAdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getMovie()` */
  static readonly GetMoviePath = '/admin/movies/{imdbId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMovie$Response(params: GetMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return getMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMovie(params: GetMovie$Params, context?: HttpContext): Observable<Movie> {
    return this.getMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `addMovie()` */
  static readonly AddMoviePath = '/admin/movies/{imdbId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  addMovie$Response(params: AddMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return addMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addMovie(params: AddMovie$Params, context?: HttpContext): Observable<Movie> {
    return this.addMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `searchMovies1()` */
  static readonly SearchMovies1Path = '/admin/movies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchMovies1()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchMovies1$Response(params: SearchMovies1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMovie>> {
    return searchMovies1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchMovies1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchMovies1(params: SearchMovies1$Params, context?: HttpContext): Observable<PageResponseMovie> {
    return this.searchMovies1$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseMovie>): PageResponseMovie => r.body)
    );
  }

  /** Path part for operation `deleteMultipleMovies()` */
  static readonly DeleteMultipleMoviesPath = '/admin/movies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMultipleMovies()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteMultipleMovies$Response(params: DeleteMultipleMovies$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteMultipleMovies(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMultipleMovies$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteMultipleMovies(params: DeleteMultipleMovies$Params, context?: HttpContext): Observable<void> {
    return this.deleteMultipleMovies$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteMovie()` */
  static readonly DeleteMoviePath = '/admin/movies/{movieId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMovie$Response(params: DeleteMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMovie(params: DeleteMovie$Params, context?: HttpContext): Observable<void> {
    return this.deleteMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
