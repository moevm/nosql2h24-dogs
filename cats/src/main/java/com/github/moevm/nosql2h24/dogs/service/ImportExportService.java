package com.github.moevm.nosql2h24.dogs.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.controller.Db;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ImportExportService {

    private final UserRepository userRepository;
    private final BreedRepository breedRepository;
    private final EventRepository eventRepository;

    public ImportExportService(UserRepository userRepository, BreedRepository breedRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.breedRepository = breedRepository;
        this.eventRepository = eventRepository;
    }

    public Map<String, Integer> getExportCounts() {
        int breedCount = (int) breedRepository.count();  // cast to int
        int userCount = (int) userRepository.count();    // cast to int
        int eventCount = (int) eventRepository.count();  // cast to int
        return Map.of("breedCount", breedCount, "userCount", userCount, "eventCount", eventCount);
    }

    public Db getImportExport() {
        List<Breed> breeds = breedRepository.findAll();
        List<User> users = userRepository.findAll();
        List<Event> events = eventRepository.findAll();
        return new Db(breeds, users, events);
    }

    public Map<String, Integer> importDb(Db db) {
        try {
            if (db == null) {
                throw new IllegalArgumentException("No data provided for import.");
            }

            breedRepository.deleteAll();
            userRepository.deleteAll();
            eventRepository.deleteAll();

            int breedCount = 0;
            int userCount = 0;
            int eventCount = 0;

            if (db.breeds() != null) {
                for (Breed breed : db.breeds()) {
                    breedRepository.save(breed);
                    breedCount++;
                }
            }

            if (db.users() != null) {
                for (User user : db.users()) {
                    userRepository.save(user);
                    userCount++;
                }
            }

            if (db.events() != null) {
                for (Event event : db.events()) {
                    eventRepository.save(event);
                    eventCount++;
                }
            }

            return Map.of(
                "breedCount", breedCount,
                "userCount", userCount,
                "eventCount", eventCount
            );
        } catch (Exception e) {
            log.error("Failed to import data", e);
            throw new RuntimeException("Failed to import data: " + e.getMessage(), e);
        }
    }

    public Map<String, Integer> importDbFromFile(MultipartFile file) {
        try {
            String content = new String(file.getBytes(), StandardCharsets.UTF_8);
            Db db = new ObjectMapper().readValue(content, Db.class);
            return importDb(db);
        } catch (IOException e) {
            log.error("Failed to parse file", e);
            throw new RuntimeException("Failed to parse file", e);
        }
    }
}
