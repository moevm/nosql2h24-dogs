package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.HashSet;

@Data
@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
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
    private HashSet<String> favorites;
}