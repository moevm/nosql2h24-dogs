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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ImportExportService {

    private final UserRepository userRepository;
    private final BreedRepository breedRepository;
    private final EventRepository eventRepository;

    private static final Logger logger = LoggerFactory.getLogger(ImportExportService.class);

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

    public ImportExportResponse importDbFromFile(MultipartFile file) {
        try {
            String content = new String(file.getBytes(), StandardCharsets.UTF_8);
            Db db = new ObjectMapper().readValue(content, Db.class);
            
            long breedsAdded = breedRepository.saveAll(db.breeds()).size();
            long usersAdded = userRepository.saveAll(db.users()).size();
            long eventsAdded = eventRepository.saveAll(db.events()).size();
            
            long totalAdded = breedsAdded + usersAdded + eventsAdded;
            
            logger.info("Breeds Added: " + breedsAdded);
            logger.info("Users Added: " + usersAdded);
            logger.info("Events Added: " + eventsAdded);
            logger.info("Total Records Added: " + totalAdded);

            return new ImportExportResponse(totalAdded, 0);  // Import only returns recordsAdded
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse file", e);
        }
    }

    public ImportExportResponse exportDb() {
        long totalSaved = 0;

        long breedCount = breedRepository.findAll().size();
        long userCount = userRepository.findAll().size();
        long eventCount = eventRepository.findAll().size();

        totalSaved += breedCount + userCount + eventCount;

        logger.info("Breeds Saved: " + breedCount);
        logger.info("Users Saved: " + userCount);
        logger.info("Events Saved: " + eventCount);
        logger.info("Total Records Saved: " + totalSaved);

        return new ImportExportResponse(0, totalSaved);  // Export only returns recordsSaved
    }

    public static class ImportExportResponse {
        private long recordsAdded;
        private long recordsSaved;

        public ImportExportResponse(long recordsAdded, long recordsSaved) {
            this.recordsAdded = recordsAdded;
            this.recordsSaved = recordsSaved;
        }

        public long getRecordsAdded() {
            return recordsAdded;
        }

        public void setRecordsAdded(long recordsAdded) {
            this.recordsAdded = recordsAdded;
        }

        public long getRecordsSaved() {
            return recordsSaved;
        }

        public void setRecordsSaved(long recordsSaved) {
            this.recordsSaved = recordsSaved;
        }
    }
}
