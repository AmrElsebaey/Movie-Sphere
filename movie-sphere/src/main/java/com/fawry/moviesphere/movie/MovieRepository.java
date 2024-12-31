package com.fawry.moviesphere.movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByImdbId(String imdbId);
    Page<Movie> findByTitleContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT m.imdbId FROM Movie m WHERE m.imdbId IN :imdbIds")
    Set<String> findImdbIdIn(List<String> imdbIds);

}
