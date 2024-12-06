package com.github.moevm.nosql2h24.dogs.model.controller.request.events;

import com.github.moevm.nosql2h24.dogs.database.document.Event;

public record LikeDto(String breedId, String commentId, String likingUserId, String type) {
    public static LikeDto from(Event event) {
        return new LikeDto(event.getBreedId(), event.getCommentId(), event.getActorId(), event.getType());
    }
}
