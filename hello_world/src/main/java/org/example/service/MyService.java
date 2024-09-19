package org.example.service;

import org.example.database.document.MyDocument;
import org.example.database.repository.MyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyService {

    @Autowired
    private MyRepository repository;

    public void saveDocument(MyDocument document) {
        printLine();
        System.out.println("saving document " + document);
        repository.save(document);
    }

    public List<MyDocument> findAllDocuments() {
        printLine();
        var documents = repository.findAll();
        System.out.println("found documents:");
        documents.forEach(System.out::println);
        return documents;
    }

    public long countDocuments() {
        printLine();
        long count = repository.count();
        System.out.println("found documents amount: " + count);
        return count;
    }

    public List<MyDocument> findDocumentsByScoreGreaterThan(int score) {
        printLine();
        System.out.println("searching for documents with score > " + score);
        var documents = repository.findByScoreGreaterThan(score);
        documents.forEach(System.out::println);
        return documents;
    }

    public void deleteDocuments() {
        printLine();
        System.out.println("deleting all documents");
        repository.deleteAll();

    }

    private void printLine() {
        System.out.println("---------------------------");
    }
}