package com.github.moevm.nosql2h24.dogs.model.controller.response.events;

import com.github.moevm.nosql2h24.dogs.database.document.Event;

import static com.github.moevm.nosql2h24.dogs.service.StringifyUtils.stringify;

public record BreedCommentDto(String breedId, String breedName, String time, String commentId, String text,
                              String commentingUserId) {
    public static BreedCommentDto from(Event event) {
        return new BreedCommentDto(event.getBreedId(), event.getBreedName(),
                stringify(event.getDate()), event.getCommentId(), event.getCommentText(), event.getActorId());
    }
}
