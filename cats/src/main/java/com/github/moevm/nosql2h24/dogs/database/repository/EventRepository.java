package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByUserId(String userId);

    List<Event> findByBreedId(String breedId);
}