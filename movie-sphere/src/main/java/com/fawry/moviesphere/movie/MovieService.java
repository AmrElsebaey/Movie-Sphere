package com.fawry.moviesphere.movie;

import com.fawry.moviesphere.exception.ResourceAlreadyExistsException;
import com.fawry.moviesphere.exception.ResourceNotFoundException;
import com.fawry.moviesphere.omdb.OMDBService;
import com.fawry.moviesphere.rating.Rating;
import com.fawry.moviesphere.rating.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final OMDBService omdbService;
    private final RatingRepository ratingRepository;


    public Movie addMovie (String imdbId) {
        if (movieRepository.existsByImdbId(imdbId)) {
            throw new ResourceAlreadyExistsException("Movie already exists.");
        }
        Movie movie = omdbService.getMovie(imdbId);
        if (movie == null) {
            throw new ResourceNotFoundException("No movie found with imdbId: " + imdbId);
        }
        List<Rating> ratings = movie.getRatings();
        ratings.forEach(rating -> rating.setMovie(movie));
        movieRepository.save(movie);
        ratingRepository.saveAll(ratings);
        return movie;
    }

    public List<Movie> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        if (movies.isEmpty()) {
            throw new ResourceNotFoundException("No movies found.");
        } else {
            return movies;
        }
    }

    public Movie getMovie(Long id) {
        return movieRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
    }

    public void deleteMovie(Long id) {
        Movie movie = getMovie(id);
        movieRepository.delete(movie);
    }
}
