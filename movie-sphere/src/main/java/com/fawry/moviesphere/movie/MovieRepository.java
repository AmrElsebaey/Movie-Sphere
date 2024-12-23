package com.fawry.moviesphere.movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByImdbId(String imdbId);
    Page<Movie> findByTitleContainingIgnoreCase(String name, Pageable pageable);
}
