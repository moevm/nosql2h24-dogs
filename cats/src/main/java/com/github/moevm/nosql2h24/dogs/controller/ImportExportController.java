package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.controller.model.response.Db;
import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.service.ImportExportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Slf4j
public class ImportExportController {
private final ImportExportService importExportService;

    public ImportExportController(ImportExportService importExportService) {
        this.importExportService = importExportService;
    }

    @GetMapping("/export")
    public Db exportDb() {
        return importExportService.getImportExport();
    }

    @PostMapping ("/import")
    public HttpStatus importDb(@RequestBody Db db) {
        importExportService.importDb(db);
        return HttpStatus.OK;
    }
}
