package com.github.moevm.nosql2h24.dogs.model.controller.request;

import com.github.moevm.nosql2h24.dogs.database.document.Comment;

public record CommentDto(String userId, String breedId, String text, String parentCommentId) {
}
