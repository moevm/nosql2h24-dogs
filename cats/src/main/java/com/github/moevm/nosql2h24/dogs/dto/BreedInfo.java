package com.github.moevm.nosql2h24.dogs.dto;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;

public record BreedInfo(String id, String name, String referenceImageId) {
    public BreedInfo(Breed breed) {
        this(breed.getId(), breed.getName(), breed.getReferenceImageId());
    }
}