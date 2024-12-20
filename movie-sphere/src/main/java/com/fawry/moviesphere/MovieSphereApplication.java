package com.fawry.moviesphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
@EnableConfigurationProperties
@Profile("dev")
public class MovieSphereApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieSphereApplication.class, args);
	}

}
