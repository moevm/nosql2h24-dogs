package com.github.moevm.nosql2h24.dogs.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.github.moevm.nosql2h24.dogs.model.controller.Db;
import com.github.moevm.nosql2h24.dogs.service.ImportExportService;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
public class ImportExportController {
    private final ImportExportService importExportService;

    public ImportExportController(ImportExportService importExportService) {
        this.importExportService = importExportService;
    }

    @GetMapping(value = "/export", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> exportDb() {
        try {
            Db db = importExportService.getImportExport();
            Map<String, Integer> counts = importExportService.getExportCounts();
            return ResponseEntity.ok(Map.of(
                "data", db,
                "counts", counts
            ));
        } catch (Exception e) {
            log.error("Export failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Export failed");
        }
    }

    @PostMapping(value = "/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Integer>> importDbFromFile(@RequestParam("file") MultipartFile file) {
        try {
            Map<String, Integer> counts = importExportService.importDbFromFile(file);
            return ResponseEntity.ok(counts);
        } catch (Exception e) {
            log.error("Failed to import data", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", -1));
        }
    }
}
