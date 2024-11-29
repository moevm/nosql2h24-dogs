package com.github.moevm.nosql2h24.dogs.controller;


import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Comment;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.model.controller.request.CommentDto;
import com.github.moevm.nosql2h24.dogs.service.CommentsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@Slf4j
public class CommentController {
    private final CommentsService commentsService;
    private final BreedRepository breedRepository;

    public CommentController(CommentsService commentsService, BreedRepository breedRepository) {
        this.commentsService = commentsService;
        this.breedRepository = breedRepository;
    }

    @PostMapping("")
    public String addComment(@RequestBody CommentDto commentDto) {
        return commentsService.addComment(commentDto.userId(), commentDto.breedId(), commentDto.text(), commentDto.parentCommentId());
    }

    @GetMapping("/byBreed/{breedId}")
    public List<Comment> getCommentsByBreedId(@PathVariable String breedId) {
        Breed breed = breedRepository.findById(breedId).orElse(null);
        if (breed == null) {
            return null;
        }
        if (breed.getComments() == null) {
            return List.of();
        }
        return breed.getComments();
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
