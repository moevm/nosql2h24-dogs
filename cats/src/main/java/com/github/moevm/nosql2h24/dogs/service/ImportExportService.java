package com.github.moevm.nosql2h24.dogs.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.controller.Db;

@Service
public class ImportExportService {

    private final UserRepository userRepository;
    private final BreedRepository breedRepository;
    private final EventRepository eventRepository;

    public ImportExportService(UserRepository userRepository, BreedRepository breedRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.breedRepository = breedRepository;
        this.eventRepository = eventRepository;
    }

    public Db getImportExport() {
        return new Db(breedRepository.findAll(), userRepository.findAll(), eventRepository.findAll());
    }

    public void importDb(Db db) {
        breedRepository.deleteAll();
        userRepository.deleteAll();
        eventRepository.deleteAll();
        breedRepository.saveAll(db.breeds());
        userRepository.saveAll(db.users());
        eventRepository.saveAll(db.events());
    }

    public void importDbFromFile(MultipartFile file) {
        try {
            String content = new String(file.getBytes(), StandardCharsets.UTF_8);
            Db db = new ObjectMapper().readValue(content, Db.class);
            importDb(db);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse file", e);
        }
    }
}
