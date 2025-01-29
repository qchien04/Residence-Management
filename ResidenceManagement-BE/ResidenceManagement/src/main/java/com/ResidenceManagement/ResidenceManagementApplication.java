package com.ResidenceManagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ResidenceManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResidenceManagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(){
		return runner->{
			System.out.println("DONE");
		};
	}
}
