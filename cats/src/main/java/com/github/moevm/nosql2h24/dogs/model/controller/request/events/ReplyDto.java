package com.github.moevm.nosql2h24.dogs.model.controller.request.events;

import com.github.moevm.nosql2h24.dogs.database.document.Event;

public record ReplyDto(String breedId, String commentId, String text, String replyingUserId) {
    public static ReplyDto from(Event event) {
        return new ReplyDto(event.getBreedId(), event.getCommentId(), event.getCommentText(), event.getActorId());
    }
}
