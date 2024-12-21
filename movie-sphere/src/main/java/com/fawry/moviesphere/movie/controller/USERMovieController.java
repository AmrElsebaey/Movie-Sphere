package com.fawry.moviesphere.movie.controller;


import com.fawry.moviesphere.movie.Movie;
import com.fawry.moviesphere.movie.MovieService;
import com.fawry.moviesphere.pagination.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("user/movies")
@RequiredArgsConstructor
@Tag(name = "Movie/User")
public class USERMovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<PageResponse<Movie>> getAllMovies(
            @RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
            @RequestParam(value = "size", defaultValue = "5", required = false) Integer size
    ) {
        return ResponseEntity.ok(movieService.getAllMovies(page, size));
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable("id") Long id) {
        return movieService.getMovie(id);
    }


}
