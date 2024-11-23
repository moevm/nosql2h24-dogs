package com.github.moevm.nosql2h24.dogs.model.controller.response;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;

public record BreedInfo(String id, String name, String referenceImageId) implements Comparable<BreedInfo> {
    public BreedInfo(Breed breed) {
        this(breed.getId(), breed.getName(), breed.getReferenceImageId());
    }

    @Override
    public int compareTo(BreedInfo o) {
        return this.name.compareTo(o.name);
    }
}