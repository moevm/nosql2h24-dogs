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
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.HttpHeaders;


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
            importDb(db);
            return new ImportExportResponse(db.breeds().size(), 0);  // Returns the number of breeds added
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse file", e);
        }
    }

    public ExportResponse exportDb() {
        Db db = new Db(breedRepository.findAll(), userRepository.findAll(), eventRepository.findAll());
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            byte[] data = objectMapper.writeValueAsBytes(db);  // Convert Db object to byte array

            long breedsCount = db.breeds().size();
            long usersCount = db.users().size();
            long eventsCount = db.events().size();
            long totalRecords = breedsCount + usersCount + eventsCount;

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=exported_data.json");

            return new ExportResponse(data, totalRecords);
        } catch (IOException e) {
            log.error("Failed to export data", e);
            return new ExportResponse(null, 0);
        }
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
