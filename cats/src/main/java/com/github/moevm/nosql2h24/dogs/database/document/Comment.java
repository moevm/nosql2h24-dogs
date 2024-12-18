package com.github.moevm.nosql2h24.dogs.database.document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @JsonProperty("id")
    private String id;

    @Field("author")
    @JsonProperty("author")
    private String author;

    @Field("parent_comments_id")
    @JsonProperty("parent_comment_id")
    private String parentCommentId;

    @Field("date")
    @JsonProperty("date")
    private Date date;

    @Field("text")
    @JsonProperty("text")
    private String text;

    @Field("likes")
    @JsonProperty("likes")
    private HashSet<String> likesUsersId;

    public Comment(String author, String parentCommentId, Date date, String text) {
        this.author = author;
        this.parentCommentId = parentCommentId;
        this.date = date;
        this.text = text;
        this.likesUsersId = likesUsersId == null ? null : new HashSet<>();
        this.id = String.valueOf(Objects.hash(author, parentCommentId, date, text));
    }

    public boolean addLike(String userId) {
        if (likesUsersId == null) {
            likesUsersId = new HashSet<>();
        }
        return likesUsersId.add(userId);
    }

    public boolean removeLike(String userId) {
        if (likesUsersId == null) {
            return false;
        }
        return likesUsersId.remove(userId);
    }
}