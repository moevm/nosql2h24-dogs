package com.github.moevm.nosql2h24.dogs.controller.model.response;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.document.User;

import java.util.List;

public record Db(List<Breed> breeds, List<User> users, List<Event> events) {
}
