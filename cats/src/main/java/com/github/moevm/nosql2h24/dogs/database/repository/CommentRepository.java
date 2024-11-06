package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByAuthor(String author);
}