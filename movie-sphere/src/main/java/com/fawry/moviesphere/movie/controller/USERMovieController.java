package com.fawry.moviesphere.movie.controller;


import com.fawry.moviesphere.movie.Movie;
import com.fawry.moviesphere.movie.MovieService;
import com.fawry.moviesphere.omdb.OMDBService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("user/movies")
@RequiredArgsConstructor
@Tag(name = "Movie")
public class USERMovieController {

    private final MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable("id") Long id) {
        return movieService.getMovie(id);
    }


}
