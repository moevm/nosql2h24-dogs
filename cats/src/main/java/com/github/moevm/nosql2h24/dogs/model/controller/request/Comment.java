package com.github.moevm.nosql2h24.dogs.model.controller.request;

public record Comment(String userId, String breedId, String text, String parentCommentId) {
}
