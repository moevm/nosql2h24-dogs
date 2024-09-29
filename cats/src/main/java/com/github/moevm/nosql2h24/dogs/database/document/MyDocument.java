package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mycollection")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyDocument {
  
  @Id
  private String id;
  
  private String title;
  
  private int score;
  public MyDocument(String title, int score) {
    this.title = title;
    this.score = score;
  }
  @Override
  public String toString() {
    return "MyDocument{" +
        "id='" + id + '\'' +
        ", title='" + title + '\'' +
        ", score=" + score +
        '}';
  }
}