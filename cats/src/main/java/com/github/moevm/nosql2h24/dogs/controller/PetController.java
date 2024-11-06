package com.github.moevm.nosql2h24.dogs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pets")
public class PetController {
    @GetMapping("")
    public String pets() {
        return "[{\"id\": 1, \"name\": \"foo\"}, {\"id\": 2, \"name\": \"bar\"}]";
    }
}
