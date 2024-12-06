package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.controller.request.events.BreedCommentDto;
import com.github.moevm.nosql2h24.dogs.model.controller.request.events.LikeDto;
import com.github.moevm.nosql2h24.dogs.model.controller.request.events.ReplyDto;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventController(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{userId}")
    public List<Event> getEventByUserId(@PathVariable String userId) {
        return eventRepository.findByRecipientId(userId);
    }

    @PostMapping("")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventRepository.deleteById(id);
    }

    @GetMapping("/likes/{id}")
    public List<LikeDto> getLikes(@PathVariable String id) {
        List<Event> events = eventRepository.findAll();
        return events.stream().filter(e -> Event.Type.isLike(e.getType()) && e.getRecipientId().equals(id)).
                map(LikeDto::from).toList();
    }

    @GetMapping("/reply/{id}")
    public List<ReplyDto> getComments(@PathVariable String id) {
        List<Event> events = eventRepository.findAll();
        return events.stream().filter(e -> Event.Type.isReply(e.getType()) && e.getRecipientId().equals(id)).
                map(ReplyDto::from).toList();

    }

    @GetMapping("/breed_comments/{id}")
    public List<BreedCommentDto> getNotifications(@PathVariable String id) {
        List<Event> events = eventRepository.findAll();
        HashSet<String> favoritesBreeds = userRepository.findById(id).orElseThrow().getFavorites();
        return events.stream().filter(e -> Event.Type.isBreesComment(e.getType()) && favoritesBreeds.contains(e.getBreedId())).
                map(BreedCommentDto::from).toList();

    }
}