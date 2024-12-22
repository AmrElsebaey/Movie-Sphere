package com.fawry.moviesphere.omdb;

import com.fawry.moviesphere.movie.Movie;
import com.fawry.moviesphere.pagination.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OMDBService {

    @Value("${omdb.api.key}")
    private String API_KEY;
    private final String TYPE = "movie";
    private final String URL = "http://www.omdbapi.com/";
    private final RestTemplate client;


    public PageResponse<Movie> searchMovies(String query, Integer page, Integer size) {

        var response = Objects.requireNonNull(client.getForObject(
                URL +
                        "?apikey=" + API_KEY +
                        "&s=" + query +
                        "&type=" + TYPE +
                        "&page=" + (page + 1),
                OMDBSearchResponse.class));

        long totalElements = response.getTotalResults() != null ? Long.parseLong(response.getTotalResults()) : 0;
        int totalPages = (int) Math.ceil((double) totalElements / size);
        List<Movie> content = response.getSearch() != null ? response.getSearch() : List.of();

        return new PageResponse<>(
                content,
                page,
                size,
                totalElements,
                (totalPages),
                page == 0,
                page == totalPages - 1
        );
    }


    public Movie getMovie(String imdbId) {
        return Objects.requireNonNull(client.getForObject(
                URL +
                        "?apikey=" + API_KEY +
                        "&i=" + imdbId,
                Movie.class
        ));
    }



}