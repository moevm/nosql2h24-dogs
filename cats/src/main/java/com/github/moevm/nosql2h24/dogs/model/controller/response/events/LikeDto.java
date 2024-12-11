package com.github.moevm.nosql2h24.dogs.model.controller.response.events;

import com.github.moevm.nosql2h24.dogs.database.document.Event;

import static com.github.moevm.nosql2h24.dogs.service.StringifyUtils.stringify;

public record LikeDto(String breedId, String breedName, String date, String commentId, String likingUserId,
                      String type) {
    public static LikeDto from(Event event) {
        return new LikeDto(event.getBreedId(), event.getBreedName(), stringify(event.getDate()), event.getCommentId(), event.getActorId(), event.getType());
    }
}
