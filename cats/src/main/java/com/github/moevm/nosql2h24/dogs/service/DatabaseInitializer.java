package com.github.moevm.nosql2h24.dogs.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Comment;
import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.UserDto;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Date;
import java.util.List;

@Service
public class DatabaseInitializer {

    private final UserRepository userRepository;

    private final BreedRepository breedRepository;
    private final EventRepository eventRepository;

    private final Path BREEDS_JSON;

    public DatabaseInitializer(UserRepository userRepository, BreedRepository breedRepository, EventRepository eventRepository, @Value("${breeds.json}") String breedsJson) {
        this.userRepository = userRepository;
        this.breedRepository = breedRepository;
        this.eventRepository = eventRepository;
        this.BREEDS_JSON = Path.of(breedsJson);
    }

    @PostConstruct
    public void init() {
        initUsers();
        initBreeds();
        initEvents();
    }

    public void initUsers() {
        if (userRepository.count() == 0) {
            // добавляем пользователей
            userRepository.saveUser(new UserDto("Sasha", 21, "111111", "image1"));
            userRepository.saveAdmin(new UserDto("Margo", 21, "222222", "image2"));
            userRepository.saveAdmin(new UserDto("Karim", 21, "222222", "image3"));
        }
    }

    public void initBreeds() {
        breedRepository.deleteAll();
        if (breedRepository.count() == 0) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Breed> breeds = mapper.readValue(BREEDS_JSON.toFile(), new TypeReference<>() {
                });
                if (userRepository.count() != 0) {

                    User user = userRepository.findAll().get(0);
                    Breed breed = breeds.get(0);
                    breed.setComments(List.of(new Comment("1", user.getName(), new Date(), "My favorite!")));
                }
                breedRepository.saveAll(breeds);
            } catch (IOException e) {
                throw new RuntimeException("Ошибка чтения файла пород", e);
            }
        }
    }

    public void initEvents() {
        if (eventRepository.count() == 0) {
            if (userRepository.count() == 0 || breedRepository.count() == 0) {
                return;
            }
            User user = userRepository.findAll().get(0);
            Breed breed = breedRepository.findAll().get(0);
            Event event1 = Event.builder().userId(user.getName()).breedId(breed.getId()).type("LIKE").date(new Date()).build();
            Event event2 = Event.builder().userId(user.getName()).breedId(breed.getId()).type("COMMENT").date(new Date()).build();
            eventRepository.saveAll(List.of(event1, event2));
        }
    }
}