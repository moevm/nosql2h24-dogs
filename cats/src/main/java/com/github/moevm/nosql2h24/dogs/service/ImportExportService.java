package com.github.moevm.nosql2h24.dogs.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.controller.Db;

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
            importDb(db);
            return new ImportExportResponse(db.breeds().size() + db.users().size() + db.events().size(), 0);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse file", e);
        }
    }

    public ExportResponse exportDb() {
        Db db = new Db(breedRepository.findAll(), userRepository.findAll(), eventRepository.findAll());
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            byte[] data = objectMapper.writeValueAsBytes(db);

            long totalRecords = db.breeds().size() + db.users().size() + db.events().size();

            log.info("Exporting: Total Records: {}", totalRecords);

            return new ExportResponse(data, totalRecords);
        } catch (IOException e) {
            log.error("Failed to export data", e);
            return new ExportResponse(null, 0);
        }
    }

    public static class ImportExportResponse {
        private long recordsAdded;

        public ImportExportResponse(long recordsAdded, long recordsSaved) {
            this.recordsAdded = recordsAdded;
        }

        public long getRecordsAdded() {
            return recordsAdded;
        }
    }

    public static class ExportResponse {
        private byte[] fileData;
        private long totalRecords;

        public ExportResponse(byte[] fileData, long totalRecords) {
            this.fileData = fileData;
            this.totalRecords = totalRecords;
        }

        public byte[] getFileData() {
            return fileData;
        }

        public long getTotalRecords() {
            return totalRecords;
        }
    }
}
