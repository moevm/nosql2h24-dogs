package com.github.moevm.nosql2h24.dogs.service;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Comment;
import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
@Slf4j
public class CommentsService {
    private final BreedRepository breedRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public CommentsService(BreedRepository breedRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.breedRepository = breedRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public void addComment(String userId, String breedId, String comment) {
        addComment(userId, breedId, comment, null);
    }

    public String addComment(String userId, String breedId, String text, String parentCommentId) {
        User user = userRepository.findByName(userId).orElse(null);
        Breed breed = breedRepository.findById(breedId).orElse(null);
        if (user == null) {
            log.warn("can't find user {}", userId);
            return null;
        }
        if (breed == null) {
            log.warn("can't find breed {}", breedId);
            return null;
        }
        Comment parentComment = findCommentById(breed, parentCommentId);
        if (parentCommentId != null && parentComment == null) {
            return null;
        }
        Date date = Date.from(Instant.now());

        Comment comment = new Comment(userId, parentCommentId, date, text);

        breed.addComment(comment);
        breedRepository.save(breed);

        Event event = new Event.Builder().setActorId(userId)
                .setBreedId(breedId).setBreedName(breed.getName())
                .setCommentId(comment.getId()).
                setCommentText(text).setType(Event.Type.COMMENT.name()).setDate(date).build();
        eventRepository.save(event);

        if (parentCommentId != null) {
            Event parentEvent = new Event.Builder().setRecipientId(parentComment.getAuthor())
                    .setBreedId(breedId).setBreedName(breed.getName())
                    .setCommentId(comment.getId()).setCommentText(text)
                    .setActorId(userId).setType(Event.Type.REPLY.name()).setDate(date).build();
            eventRepository.save(parentEvent);
        }
        return comment.getId();
    }

    public boolean addLike(String userId, String breedId, String commentId) {
        User user = userRepository.findByName(userId).orElse(null);
        Breed breed = breedRepository.findById(breedId).orElse(null);
        if (user == null) {
            log.warn("can't find user {}", userId);
            return false;
        }
        if (breed == null) {
            log.warn("can't find breed {}", breedId);
            return false;
        }
        Comment comment = findCommentById(breed, commentId);
        if (comment == null) {
            log.warn("can't find comment {}", commentId);
            return false;
        }
        boolean result = comment.addLike(userId);
        breedRepository.save(breed);

        Date date = Date.from(Instant.now());
        Event event = new Event.Builder().setRecipientId(comment.getAuthor())
                .setBreedId(breedId).setBreedName(breed.getName())
                .setCommentId(commentId).setCommentText(comment.getText())
                .setActorId(userId).setType(Event.Type.LIKE.name()).setDate(date).build();
        eventRepository.save(event);
        return result;
    }

    public boolean removeLike(String userId, String breedId, String commentId) {
        User user = userRepository.findByName(userId).orElse(null);
        Breed breed = breedRepository.findById(breedId).orElse(null);
        if (user == null) {
            log.warn("can't find user {}", userId);
            return false;
        }
        if (breed == null) {
            log.warn("can't find breed {}", breedId);
            return false;
        }
        Comment comment = findCommentById(breed, commentId);
        boolean result = comment.removeLike(userId);
        breedRepository.save(breed);

        Date date = Date.from(Instant.now());
        Event event = new Event.Builder().setRecipientId(comment.getAuthor())
                .setBreedId(breedId).setBreedName(breed.getName())
                .setCommentId(commentId).setCommentText(comment.getText())
                .setActorId(userId)
                .setType(Event.Type.REMOVE_LIKE.name()).setDate(date).build();
        eventRepository.save(event);
        return result;
    }


    private Comment findCommentById(Breed breed, String commentId) {
        if (breed == null || commentId == null || breed.getComments() == null) {
            return null;
        }
        Comment comment = breed.getComments().stream().filter(c -> c.getId().equals(commentId)).findFirst().orElse(null);
        if (comment == null) {
            log.warn("can't find comment {}", commentId);
        }
        return comment;
    }
}
