package com.fawry.moviesphere.movie;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByImdbId(String imdbId);
}
