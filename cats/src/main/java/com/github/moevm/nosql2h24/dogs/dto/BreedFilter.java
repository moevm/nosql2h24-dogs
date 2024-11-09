package com.github.moevm.nosql2h24.dogs.dto;

import lombok.Data;

@Data
public class BreedFilter {
    private Integer indoor;
    private Integer adaptability;
    private Integer affectionLevel;
    private Integer childFriendly;
    private Integer dogFriendly;
    private Integer energyLevel;
    private Integer grooming;
    private Integer healthIssues;
    private Integer intelligence;
    private Integer sheddingLevel;
    private Integer socialNeeds;
    private Integer strangerFriendly;
    private Integer vocalisation;
    private Integer experimental;
    private Integer hairless;
    private Integer natural;
    private Integer rare;
    private Integer rex;
    private Integer suppressedTail;
    private Integer shortLegs;
    private Integer hypoallergenic;
    private String countryCode;
    private String origin;
    private String[] temperament;
    private String[] weight;
    private String[] lifeSpan;
}