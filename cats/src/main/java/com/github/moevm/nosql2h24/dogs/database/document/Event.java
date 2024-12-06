package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document(collection = "events")
@Builder
public class Event {
    @Id
    private String id;

    @Field("receiver_user_id")
    private String receiverId;

    @Field("breed_id")
    private String breedId;

    @Field("type")
    private String type;

    @Field("date")
    private Date date;

    @Field("comment_text")
    private String commentText;

    @Field("comment_id")
    private String commentId;

    @Field("actor_id")
    private String actorId;

    public enum Type {
        LIKE, REPLY, COMMENT, REMOVE_LIKE;

        public static boolean isLike(String type) {
            return type.equals(LIKE.name()) || type.equals(REMOVE_LIKE.name());
        }

        public static boolean isBreesComment(String type) {
            return type.equals(COMMENT.name());
        }

        public static boolean isReply(String type) {
            return type.equals(REPLY.name());
        }
    }
}