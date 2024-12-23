package com.fawry.moviesphere.movie.controller;


import com.fawry.moviesphere.movie.Movie;
import com.fawry.moviesphere.movie.MovieService;
import com.fawry.moviesphere.omdb.OMDBService;
import com.fawry.moviesphere.pagination.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("admin/movies")
@RequiredArgsConstructor
@Tag(name = "Movie/Admin")
public class AdminMovieController {

    private final OMDBService omdbService;
    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<PageResponse<Movie>> searchMovies(
            @RequestParam("query") String query,
            @RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
            @RequestParam(value = "size", defaultValue = "10", required = false) Integer size) {
        return ResponseEntity.ok((omdbService.searchMovies(query,page, size)));
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Movie> getMovie(@PathVariable("imdbId") String imdbId) {
        return ResponseEntity.ok(omdbService.getMovie(imdbId));
    }

    @PostMapping("/{imdbId}")
    public ResponseEntity<Movie> addMovie(@PathVariable("imdbId") String imdbId) {
        return ResponseEntity.ok(movieService.addMovie(imdbId));
    }

    @DeleteMapping("/{movieId}")
    public void deleteMovie(@PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
    }

    @DeleteMapping
    public void deleteMultipleMovies(@RequestBody List<Long> movieIds) {
        movieService.deleteMultipleMovies(movieIds);
    }



}
