package com.github.moevm.nosql2h24.dogs.model.controller.response.events;

import com.github.moevm.nosql2h24.dogs.database.document.Event;

import static com.github.moevm.nosql2h24.dogs.service.StringifyUtils.stringify;

public record ReplyDto(String breedId, String breedName, String date, String commentId, String text,
                       String replyingUserId) {
    public static ReplyDto from(Event event) {
        return new ReplyDto(event.getBreedId(), event.getBreedName(), stringify(event.getDate()), event.getCommentId(), event.getCommentText(), event.getActorId());
    }
}
