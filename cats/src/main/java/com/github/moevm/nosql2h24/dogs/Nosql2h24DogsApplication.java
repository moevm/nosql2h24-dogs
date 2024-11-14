package com.github.moevm.nosql2h24.dogs;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.service.CommentsService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.List;

@SpringBootApplication
public class Nosql2h24DogsApplication {

    public static void main(String[] args) {
        var app = SpringApplication.run(Nosql2h24DogsApplication.class, args);

        BreedRepository breedRepository = app.getBean(BreedRepository.class);
        List<Breed> allBreeds = breedRepository.findAll();
        HashSet<String> allOrigins = new HashSet<>();
        allBreeds.forEach(breed -> allOrigins.add(breed.getCountryCodes()));
        EventRepository eventRepository = app.getBean(EventRepository.class);
        UserRepository userRepository = app.getBean(UserRepository.class);
        System.out.println(allOrigins);

    }
}
