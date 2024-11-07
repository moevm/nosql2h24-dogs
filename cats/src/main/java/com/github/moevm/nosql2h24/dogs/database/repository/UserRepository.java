package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.dto.UserDto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByName(String name);

    Optional<User> findByNameAndPasswordHash(String name, String passwordHash);

    default User saveUser(UserDto userDto) {
        Date date = Date.from(Instant.now());
        User user = User.builder()
                .name(userDto.name())
                .age(userDto.age())
                .isAdmin(false)
                .passwordHash(userDto.passwordHash())
                .image(userDto.image())
                .creationDate(date)
                .lastDate(date)
                .favorites(new HashSet<>())
                .build();
        return save(user);
    }

    // чтобы точно случайно не перепутать!!
    default User saveAdmin(UserDto userDto) {
        Date date = Date.from(Instant.now());
        User user = User.builder()
                .name(userDto.name())
                .age(userDto.age())
                .isAdmin(true)
                .passwordHash(userDto.passwordHash())
                .image(userDto.image())
                .creationDate(date)
                .lastDate(date)
                .favorites(new HashSet<>())
                .build();
        return save(user);
    }
}
