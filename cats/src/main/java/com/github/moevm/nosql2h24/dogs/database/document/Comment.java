package com.github.moevm.nosql2h24.dogs.database.document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.HashSet;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class Comment {

    @Id
    @JsonProperty("id")
    private String id;

    @Field("author")
    @JsonProperty("author")
    private String author;

    @Field("parent_comments_id")
    @JsonProperty("parent_comments_id")
    private String parentCommentsId;

    @Field("date")
    @JsonProperty("date")
    private Date date;

    @Field("text")
    @JsonProperty("text")
    private String text;

    @Field("likes")
    @JsonProperty("likes")
    private HashSet<String> likesUsersId;
}