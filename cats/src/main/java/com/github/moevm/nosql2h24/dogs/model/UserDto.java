package com.github.moevm.nosql2h24.dogs.model;

public record UserDto(String name, int age, String passwordHash, String image) {
}