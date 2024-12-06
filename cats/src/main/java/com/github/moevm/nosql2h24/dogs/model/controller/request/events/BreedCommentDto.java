package com.github.moevm.nosql2h24.dogs.model.controller.request.events;

import com.github.moevm.nosql2h24.dogs.database.document.Event;

public record BreedCommentDto(String breedId, String commentId, String text, String commentingUserId) {
    public static BreedCommentDto from(Event event) {
        return new BreedCommentDto(event.getBreedId(), event.getCommentId(), event.getCommentText(), event.getActorId());
    }
}
