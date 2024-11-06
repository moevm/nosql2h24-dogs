package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BreedController {
    @Autowired
    private BreedRepository breedRepository;

    @GetMapping("/breeds")
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @GetMapping("/breeds/{id}")
    public Breed getBreedById(@PathVariable String id) {
        return breedRepository.findById(id).orElseThrow();
    }

    @PostMapping("/breeds")
    public Breed createBreed(@RequestBody Breed breed) {
        return breedRepository.save(breed);
    }
}