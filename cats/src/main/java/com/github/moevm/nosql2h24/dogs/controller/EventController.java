package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{userId}")
    public List<Event> getEventByUserId(@PathVariable String userId) {
        return eventRepository.findByUserId(userId);
    }

    @PostMapping("")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventRepository.deleteById(id);
    }
}