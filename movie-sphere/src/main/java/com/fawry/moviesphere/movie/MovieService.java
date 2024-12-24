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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final OMDBService omdbService;
    private final RatingRepository ratingRepository;


    public Movie addMovie(String imdbId) {
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

    public List<Movie> addMultipleMovies(List<String> imdbIds) {
        Set<String> existingIds = new HashSet<>(movieRepository.findAllByImdbIdIn(imdbIds)
                .stream()
                .map(Movie::getImdbId)
                .collect(Collectors.toSet()));

        List<Movie> newMovies = new ArrayList<>();
        List<String> failedMovies = new ArrayList<>();

        for (String imdbId : imdbIds) {
            if (existingIds.contains(imdbId)) {
                failedMovies.add(omdbService.getMovie(imdbId).getTitle());
            } else {
                try {
                    Movie movie = addMovie(imdbId);
                    newMovies.add(movie);
                } catch (ResourceNotFoundException e) {
                    failedMovies.add(omdbService.getMovie(imdbId).getTitle());
                }
            }
        }

        if (!failedMovies.isEmpty()) {
            if (!newMovies.isEmpty()) {
                throw new ResourceAlreadyExistsException(
                        "These movies have been added successfully: " + newMovies.stream()
                                .map(Movie::getTitle)
                                .collect(Collectors.joining(", ")) +
                                System.lineSeparator() +
                                "Failed to add the following movies: " + String.join(", ", failedMovies)
                );
            } else {
                throw new ResourceAlreadyExistsException("All Movies already exist.");
            }
        } else {
            return newMovies;
        }
    }




    public PageResponse<Movie> getAllMovies(
            Integer page,
            Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = movieRepository.findAll(pageable);
        if (!movies.hasContent()) {
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

    public void deleteMultipleMovies(List<Long> ids) {
        List<Long> existingIds = movieRepository.findAllById(ids).stream()
                .map(Movie::getId)
                .collect(Collectors.toList());

        List<Long> notFoundIds = ids.stream()
                .filter(id -> !existingIds.contains(id))
                .toList();

        if (!notFoundIds.isEmpty()) {
            throw new ResourceNotFoundException("Movies not found with ids: " + notFoundIds);
        }

        movieRepository.deleteAllById(existingIds);
    }

    public PageResponse<Movie> searchMovies(
            String query,
            Integer page,
            Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> movies = movieRepository.findByTitleContainingIgnoreCase(query, pageable);
        if (!movies.hasContent()) {
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
}
