package com.github.moevm.nosql2h24.dogs.database.document;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document(collection = "events")
@NoArgsConstructor
public class Event {
    @Id
    private String id;

    @Field("recipient_user_id")
    private String recipientId;

    @Field("breed_id")
    private String breedId;

    @Field("breed_name")
    private String breedName;

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

        public static boolean isLikeOrRemoveLike(String type) {
            return type.equals(LIKE.name()) || type.equals(REMOVE_LIKE.name());
        }

        public static boolean isLike(String type) {
            return type.equals(LIKE.name());
        }

        public static boolean isBreedComment(String type) {
            return type.equals(COMMENT.name());
        }

        public static boolean isReply(String type) {
            return type.equals(REPLY.name());
        }
    }

    private Event(Builder builder) {
        this.id = builder.id;
        this.recipientId = builder.recipientId;
        this.breedId = builder.breedId;
        this.breedName = builder.breedName;
        this.type = builder.type;
        this.date = builder.date;
        this.commentText = builder.commentText;
        this.commentId = builder.commentId;
        this.actorId = builder.actorId;
    }

    public static class Builder {
        private String id;
        private String recipientId;
        private String breedId;
        private String breedName;
        private String type;
        private Date date;
        private String commentText;
        private String commentId;
        private String actorId;

        public Builder setId(String id) {
            this.id = id;
            return this;
        }

        public Builder setRecipientId(String recipientId) {
            this.recipientId = recipientId;
            return this;
        }

        public Builder setBreedId(String breedId) {
            this.breedId = breedId;
            return this;
        }

        public Builder setBreedName(String breedName) {
            this.breedName = breedName;
            return this;
        }

        public Builder setType(String type) {
            this.type = type;
            return this;
        }

        public Builder setDate(Date date) {
            this.date = date;
            return this;
        }

        public Builder setCommentText(String commentText) {
            this.commentText = commentText;
            return this;
        }

        public Builder setCommentId(String commentId) {
            this.commentId = commentId;
            return this;
        }

        public Builder setActorId(String actorId) {
            this.actorId = actorId;
            return this;
        }

        public Event build() {
            return new Event(this);
        }
    }

}