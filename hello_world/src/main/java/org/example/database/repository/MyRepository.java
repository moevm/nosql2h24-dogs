package org.example.database.repository;

import org.example.database.document.MyDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyRepository extends MongoRepository<MyDocument, String> {

  @Query("{score: {$gt: ?0}}")
  List<MyDocument> findByScoreGreaterThan(int score);
}
