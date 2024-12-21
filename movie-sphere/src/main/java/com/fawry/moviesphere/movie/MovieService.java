package com.fawry.moviesphere.movie;

import com.fawry.moviesphere.exception.ResourceAlreadyExistsException;
import com.fawry.moviesphere.exception.ResourceNotFoundException;
import com.fawry.moviesphere.omdb.OMDBService;
import com.fawry.moviesphere.pagination.PageResponse;
import com.fawry.moviesphere.rating.Rating;
import com.fawry.moviesphere.rating.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public PageResponse<Movie> getAllMovies(
            Integer page,
            Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = movieRepository.findAll(pageable);
        if (movies.isEmpty()) {
            throw new ResourceNotFoundException("No movies found.");
        } else {
            return new PageResponse<>(
                    movies.getContent(),
                    movies.getNumber(),
                    movies.getSize(),
                    movies.getTotalElements(),
                    movies.getTotalPages(),
                    movies.isFirst(),
                    movies.isLast());
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
