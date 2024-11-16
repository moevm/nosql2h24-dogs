package com.github.moevm.nosql2h24.dogs.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.github.moevm.nosql2h24.dogs.model.controller.Db;
import com.github.moevm.nosql2h24.dogs.service.ImportExportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class ImportExportController {
    private final ImportExportService importExportService;

    public ImportExportController(ImportExportService importExportService) {
        this.importExportService = importExportService;
    }

    @GetMapping(value = "/export", produces = MediaType.APPLICATION_JSON_VALUE)
    public Db exportDb() {
        return importExportService.getImportExport();
    }

    @PostMapping(value = "/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public HttpStatus importDbFromFile(@RequestParam("file") MultipartFile file) {
        try {
            importExportService.importDbFromFile(file);
            return HttpStatus.OK;
        } catch (Exception e) {
            log.error("Failed to import data", e);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
