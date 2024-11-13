package com.github.moevm.nosql2h24.dogs.dto;

public record CommentDto(String userId, String breedId, String text, String parentCommentId) {
}
