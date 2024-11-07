package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.dto.BreedFilter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BreedRepository extends MongoRepository<Breed, String> {
    List<Breed> findByName(String name);


}
