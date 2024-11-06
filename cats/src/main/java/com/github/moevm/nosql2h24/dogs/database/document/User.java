package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "users")
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("age")
    private int age;

    @Field("isAdmin")
    private boolean isAdmin;

    @Field("passwordHash")
    private String passwordHash;

    @Field("image")
    private String image;

    @Field("creation_date")
    private Date creationDate;

    @Field("last_date")
    private Date lastDate;

    @Field("favorites")
    private List<String> favorites;
}