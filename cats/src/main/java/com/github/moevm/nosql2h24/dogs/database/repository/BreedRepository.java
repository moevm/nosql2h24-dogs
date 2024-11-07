package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BreedRepository extends MongoRepository<Breed, String> {
    List<Breed> findByName(String name);


}
