package com.github.moevm.nosql2h24.dogs.controller;


import com.github.moevm.nosql2h24.dogs.dto.CommentDto;
import com.github.moevm.nosql2h24.dogs.service.CommentsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@Slf4j
public class CommentController {
    private final CommentsService commentsService;

    public CommentController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @PostMapping("")
    public String addComment(@RequestBody CommentDto commentDto) {
        return commentsService.addComment(commentDto.userId(), commentDto.breedId(), commentDto.text(), commentDto.parentCommentId());
    }

    @PutMapping("/like/{userId}/{breedId}/{commentId}")
    public HttpStatus addLike(@PathVariable String userId, @PathVariable String breedId, @PathVariable String commentId) {
        boolean result = commentsService.addLike(userId, breedId, commentId);
        if (!result) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    @PutMapping("/remove-like/{userId}/{breedId}/{commentId}")
    public HttpStatus removeLike(@PathVariable String userId, @PathVariable String breedId, @PathVariable String commentId) {
        boolean result = commentsService.removeLike(userId, breedId, commentId);
        if (!result) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }
}
