package com.fawry.moviesphere.movie;

import com.fawry.moviesphere.exception.ResourceAlreadyExistsException;
import com.fawry.moviesphere.exception.ResourceNotFoundException;
import com.fawry.moviesphere.omdb.OMDBService;
import com.fawry.moviesphere.pagination.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieService {

    private final MovieRepository movieRepository;
    private final OMDBService omdbService;

    public Movie addMovie(String imdbId) {
        if (movieRepository.existsByImdbId(imdbId)) {
            throw new ResourceAlreadyExistsException("Movie already exists.");
        }

        Movie movie = omdbService.getMovie(imdbId);
        if (movie == null) {
            throw new ResourceNotFoundException("No movie found with imdbId: " + imdbId);
        }

        movieRepository.save(movie);

        return movie;
    }


    public List<Movie> addMultipleMovies(List<String> imdbIds) {
        Set<String> existingIds = movieRepository.findImdbIdIn(imdbIds);

        if (existingIds.containsAll(imdbIds)) {
            throw new ResourceAlreadyExistsException("All movies already exist.");
        }

        List<Movie> newMovies = imdbIds.parallelStream()
                .filter(imdbId -> !existingIds.contains(imdbId))
                .map(omdbService::getMovie)
                .collect(Collectors.toList());

        movieRepository.saveAll(newMovies);

        if (existingIds.isEmpty()) {
            return newMovies;
        }

        List<String> failedMovies = new ArrayList<>();
        imdbIds.forEach(imdbId -> {
            if (existingIds.contains(imdbId)) {
                failedMovies.add(imdbId);
            }
        });

        if (!failedMovies.isEmpty()) {
            throw new ResourceAlreadyExistsException(
                    "These movies have been added successfully: " +
                            newMovies.stream()
                                    .map(Movie::getTitle)
                                    .collect(Collectors.joining(", ")) +
                            System.lineSeparator() +
                            "Failed to add the following movies: " +
                            String.join(", ", failedMovies)
            );
        }

        return newMovies;
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
