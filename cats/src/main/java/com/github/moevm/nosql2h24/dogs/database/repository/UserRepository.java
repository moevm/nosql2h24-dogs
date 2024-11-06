package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByName(String name);

    List<User> findByNameAndPasswordHash(String name, String passwordHash);

    default void saveUser(String name, int age, String passwordHash, String image) {
        Date date = Date.from(Instant.now());
        User user = User.builder()
                .name(name)
                .age(age)
                .isAdmin(false)
                .passwordHash(passwordHash)
                .image(image)
                .creationDate(date)
                .lastDate(date)
                .favorites(new ArrayList<>())
                .build();
        save(user);
    }

    // чтобы точно случайно не перепутать!!
    default void saveAdmin(String name, int age, String passwordHash, String image) {
        Date date = Date.from(Instant.now());
        User user = User.builder()
                .name(name)
                .age(age)
                .isAdmin(true)
                .passwordHash(passwordHash)
                .image(image)
                .creationDate(date)
                .lastDate(date)
                .favorites(new ArrayList<>())
                .build();
        save(user);
    }
}
