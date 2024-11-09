package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.HashSet;
@Builder
public class Comment {
    @Id
    private String id;

    @Field("author")
    private String author;

    @Field("parent_comments_id")
    private String parentCommentsId;

    @Field("date")
    private Date date;

    @Field("text")
    private String text;

    @Field("likes")
    private HashSet<String> likesUsersId;
}