package com.fawry.moviesphere.movie.controller;


import com.fawry.moviesphere.movie.Movie;
import com.fawry.moviesphere.movie.MovieService;
import com.fawry.moviesphere.omdb.OMDBService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("admin/movies")
@RequiredArgsConstructor
@Tag(name = "Movie")
public class AdminMovieController {

    private final OMDBService omdbService;
    private final MovieService movieService;

    @GetMapping
    public List<Movie> searchMovies(@RequestParam("query") String query) {
        return omdbService.searchMovies(query);
    }

    @GetMapping("/{imdbId}")
    public Movie getMovie(@PathVariable("imdbId") String imdbId) {
        return omdbService.getMovie(imdbId);
    }

    @PostMapping("/{imdbId}")
    public Movie addMovie(@PathVariable("imdbId") String imdbId) {
        return movieService.addMovie(imdbId);
    }

    @DeleteMapping("/{movieId}")
    public void deleteMovie(@PathVariable("movieId") Long movieId) {
        movieService.deleteMovie(movieId);
    }


}
