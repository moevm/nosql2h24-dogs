package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow();
    }


    @PutMapping("/image/{image}/{id}")
    public HttpStatus setImage(@PathVariable String image, @PathVariable String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return HttpStatus.BAD_REQUEST;
        }
        User user = userOptional.get();
        user.setImage(image);
        user.setLastDate(Date.from(Instant.now()));
        userRepository.save(user);
        return HttpStatus.OK;
    }

    @PutMapping("/passwordHash/{passwordHash}/{id}")
    public HttpStatus setPasswordHash(@PathVariable String passwordHash, @PathVariable String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return HttpStatus.BAD_REQUEST;
        }
        User user = userOptional.get();
        user.setPasswordHash(passwordHash);
        user.setLastDate(Date.from(Instant.now()));
        userRepository.save(user);
        return HttpStatus.OK;
    }

    @PutMapping("/age/{age}/{id}")
    public HttpStatus setAge(@PathVariable int age, @PathVariable String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return HttpStatus.BAD_REQUEST;
        }
        User user = userOptional.get();
        if (age < 0 || age > 200) {
            log.error("Age must be between 0 and 200");
            return HttpStatus.BAD_REQUEST;
        }
        user.setAge(age);
        user.setLastDate(Date.from(Instant.now()));
        userRepository.save(user);
        return HttpStatus.OK;
    }

    @GetMapping("/{name}/{passwordHash}")
    public User getUserByNameAndHash(@PathVariable String name, @PathVariable String passwordHash) {
        return userRepository.findByNameAndPasswordHash(name, passwordHash).orElseThrow();
    }

    @PutMapping("/toAdmin/{name}")
    public User toAdmin(@PathVariable String name) {
        User user = userRepository.findByName(name).orElseThrow();
        user.setAdmin(true);
        user.setLastDate(Date.from(Instant.now()));
        return userRepository.save(user);
    }

    @PutMapping("/toUser/{name}")
    public User toUser(@PathVariable String name) {
        User user = userRepository.findByName(name).orElseThrow();
        user.setAdmin(false);
        user.setLastDate(Date.from(Instant.now()));
        return userRepository.save(user);
    }

    @PutMapping("/addFavorite/{name}/{breedId}")
    public User addFavorite(@PathVariable String name, @PathVariable String breedId) {
        User user = userRepository.findByName(name).orElseThrow();
        user.getFavorites().add(breedId);
        user.setLastDate(Date.from(Instant.now()));
        return userRepository.save(user);
    }

    @PutMapping("/removeFavorite/{name}/{breedId}")
    public User removeFavorite(@PathVariable String name, @PathVariable String breedId) {
        User user = userRepository.findByName(name).orElseThrow();
        user.getFavorites().remove(breedId);
        user.setLastDate(Date.from(Instant.now()));
        return userRepository.save(user);
    }

    @PostMapping("")
    public User createUser(@RequestBody UserDto user) {
        return userRepository.saveUser(user);
    }
}