package com.fawry.moviesphere.omdb;

import com.fawry.moviesphere.movie.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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


    public List<Movie> searchMovies(String query) {

        return Objects.requireNonNull(client.getForObject(
                URL +
                        "?apikey=" + API_KEY +
                        "&s=" + query +
                        "&type=" + TYPE,
                OMDBSearchResponse.class)).getSearch();
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