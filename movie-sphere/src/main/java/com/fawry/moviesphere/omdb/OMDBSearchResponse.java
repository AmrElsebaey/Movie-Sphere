package com.fawry.moviesphere.omdb;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fawry.moviesphere.movie.Movie;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OMDBSearchResponse {
    @JsonProperty("Search")
    private List<Movie> Search;
    private String totalResults;
    @JsonProperty("Response")
    private String Response;
}
