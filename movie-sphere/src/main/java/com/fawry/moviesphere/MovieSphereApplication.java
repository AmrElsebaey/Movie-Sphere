package com.fawry.moviesphere;

import com.fawry.moviesphere.role.Role;
import com.fawry.moviesphere.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class MovieSphereApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieSphereApplication.class, args);
	}

	@Bean
	public CommandLineRunner addRoles(RoleRepository roleRepository) {
		return args -> {
			if (!roleRepository.existsByName("USER")) {
				roleRepository.save(new Role("USER"));
			}
			if (!roleRepository.existsByName("ADMIN")) {
				roleRepository.save(new Role("ADMIN"));
			}
		};
	}
}
