package com.github.moevm.nosql2h24.dogs.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Comment;
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
import java.util.HashSet;
import java.util.List;

@Service
public class DatabaseInitializer {

    private final UserRepository userRepository;

    private final BreedRepository breedRepository;
    private final EventRepository eventRepository;
    private final CommentsService commentsService;

    private final Path BREEDS_JSON;
    private final boolean IS_ALWAYS = true;

    public DatabaseInitializer(UserRepository userRepository, BreedRepository breedRepository, EventRepository eventRepository, CommentsService commentsService, @Value("${breeds.json}") String breedsJson) {
        this.userRepository = userRepository;
        this.breedRepository = breedRepository;
        this.eventRepository = eventRepository;
        this.commentsService = commentsService;
        this.BREEDS_JSON = Path.of(breedsJson);
    }

    @PostConstruct
    public void init() {
        initUsers();
        initBreeds();
        initEvents();
    }

    public void initUsers() {
        if (IS_ALWAYS) userRepository.deleteAll();
        if (userRepository.count() == 0) {
            // добавляем пользователей
            userRepository.saveUser(new UserDto("Sasha", 21, "111111", "image1"));
            userRepository.saveAdmin(new UserDto("Margo", 21, "222222", "image2"));
            userRepository.saveAdmin(new UserDto("Karim", 21, "222222", "image3"));
            addFavorites();
        }
    }

    public void initBreeds() {
        if (IS_ALWAYS) breedRepository.deleteAll();
        if (breedRepository.count() == 0) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<Breed> breeds = mapper.readValue(BREEDS_JSON.toFile(), new TypeReference<>() {
                });
                breedRepository.saveAll(breeds);
            } catch (IOException e) {
                throw new RuntimeException("Ошибка чтения файла пород", e);
            }
        }
    }

    public void addFavorites() {

        User user = userRepository.findAll().get(0);
        Breed breed = breedRepository.findAll().get(0);
        user.setFavorites(new HashSet<>() {{
            add(breed.getId());
        }});
        userRepository.save(user);
    }

    public void initEvents() {
        if (IS_ALWAYS) eventRepository.deleteAll();
        if (eventRepository.count() == 0) {
            if (userRepository.count() == 0 || breedRepository.count() == 0) {
                return;
            }
            User user = userRepository.findAll().get(0);
            Breed breed = breedRepository.findAll().get(0);
            User user2 = userRepository.findAll().get(1);
            Breed breed2 = breedRepository.findAll().get(1);
            commentsService.addComment(user.getName(), breed.getId(), "My favorite!", null);
            Comment comment = breedRepository.findById(breed.getId()).get().getComments().get(0);
            commentsService.addComment(user2.getName(), breed.getId(), "And my!", comment.getId());
            commentsService.addComment(user2.getName(), breed2.getId(), "Pretty!", null);
            commentsService.addLike(user.getName(), breed.getId(), comment.getId());
            commentsService.addLike(user2.getName(), breed2.getId(), comment.getId());
            commentsService.removeLike(user.getName(), breed.getId(), comment.getId());

        }
    }
}