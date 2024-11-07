package com.github.moevm.nosql2h24.dogs.database.document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashSet;
import java.util.List;

@Document(collection = "breeds")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Breed {
    @Id
    @JsonProperty("id")
    private String id;

    @JsonProperty("weight_min")
    @Field("weight_min")
    private int weightMin;

    @JsonProperty("weight_max")
    @Field("weight_max")
    private int weightMax;

    @JsonProperty("name")
    @Field("name")
    private String name;

    @JsonProperty("cfa_url")
    @Field("cfa_url")
    private String cfaUrl;

    @JsonProperty("vetstreet_url")
    @Field("vetstreet_url")
    private String vetstreetUrl;

    @JsonProperty("vcahospitals_url")
    @Field("vcahospitals_url")
    private String vcahospitalsUrl;

    @JsonProperty("temperament")
    @Field("temperament")
    private HashSet<String> temperament;

    @JsonProperty("origin")
    @Field("origin")
    private String origin;

    @JsonProperty("country_codes")
    @Field("country_codes")
    private String countryCodes;

    @JsonProperty("country_code")
    @Field("country_code")
    private String countryCode;

    @JsonProperty("description")
    @Field("description")
    private String description;

    @JsonProperty("life_span_min")
    @Field("life_span_min")
    private int lifeSpanMin;

    @JsonProperty("life_span_max")
    @Field("life_span_max")
    private int lifeSpanMax;

    @JsonProperty("indoor")
    @Field("indoor")
    private int indoor;

    @JsonProperty("lap")
    @Field("lap")
    private int lap;

    @JsonProperty("alt_names")
    @Field("alt_names")
    private String altNames;

    @JsonProperty("adaptability")
    @Field("adaptability")
    private int adaptability;

    @JsonProperty("affection_level")
    @Field("affection_level")
    private int affectionLevel;

    @JsonProperty("child_friendly")
    @Field("child_friendly")
    private int childFriendly;

    @JsonProperty("dog_friendly")
    @Field("dog_friendly")
    private int dogFriendly;

    @JsonProperty("energy_level")
    @Field("energy_level")
    private int energyLevel;

    @JsonProperty("grooming")
    @Field("grooming")
    private int grooming;

    @JsonProperty("health_issues")
    @Field("health_issues")
    private int healthIssues;

    @JsonProperty("intelligence")
    @Field("intelligence")
    private int intelligence;

    @JsonProperty("shedding_level")
    @Field("shedding_level")
    private int sheddingLevel;

    @JsonProperty("social_needs")
    @Field("social_needs")
    private int socialNeeds;

    @JsonProperty("stranger_friendly")
    @Field("stranger_friendly")
    private int strangerFriendly;

    @JsonProperty("vocalisation")
    @Field("vocalisation")
    private int vocalisation;

    @JsonProperty("experimental")
    @Field("experimental")
    private int experimental;

    @JsonProperty("hairless")
    @Field("hairless")
    private int hairless;

    @JsonProperty("natural")
    @Field("natural")
    private int natural;

    @JsonProperty("rare")
    @Field("rare")
    private int rare;

    @JsonProperty("rex")
    @Field("rex")
    private int rex;

    @JsonProperty("suppressed_tail")
    @Field("suppressed_tail")
    private int suppressedTail;

    @JsonProperty("short_legs")
    @Field("short_legs")
    private int shortLegs;

    @JsonProperty("wikipedia_url")
    @Field("wikipedia_url")
    private String wikipediaUrl;

    @JsonProperty("hypoallergenic")
    @Field("hypoallergenic")
    private int hypoallergenic;

    @JsonProperty("reference_image_id")
    @Field("reference_image_id")
    private String referenceImageId;

    @JsonProperty("comments")
    @Field("comments")
    private List<Comment> comments;

}