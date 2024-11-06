package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/breeds")
public class BreedController {
    @Autowired
    private BreedRepository breedRepository;

    @GetMapping("")
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @GetMapping("/info")
    public List<BreedInfo> getAllBreedInfo() {
        return breedRepository.findAll().stream().map(BreedInfo::new).toList();
    }

    @GetMapping("/{id}")
    public Breed getBreedById(@PathVariable String id) {
        return breedRepository.findById(id).orElse(null);
    }

    @GetMapping("/{id}/info")
    public BreedInfo getBreedInfoById(@PathVariable String id) {
        Breed breed = breedRepository.findById(id).orElse(null);
        if(breed != null) {
            return new BreedInfo(breed);
        }
        return null;
    }

    private record BreedInfo(String id, String name, String referenceImageId) {
        public BreedInfo(Breed breed) {
            this(breed.getId(), breed.getName(), breed.getReferenceImageId());
        }
    }
}