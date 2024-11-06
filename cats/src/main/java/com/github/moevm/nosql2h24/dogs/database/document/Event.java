package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document(collection = "events")
public class Event {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("breed_id")
    private String breedId;

    @Field("type")
    private String type;

    @Field("date")
    private Date date;

    //TODO
    public enum Type {
        LIKE, REPLY, COMMENT
    }
}