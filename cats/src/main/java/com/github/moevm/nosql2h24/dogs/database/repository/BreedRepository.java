package com.github.moevm.nosql2h24.dogs.database.repository;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.dto.BreedFilter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BreedRepository extends MongoRepository<Breed, String> {
    List<Breed> findByName(String name);

    @Query("{ $and: [ " +
            "  { 'indoor': { $in: ?0 } }, " +
            "  { 'adaptability': { $in: ?1 } }, " +
            "  { 'affection_level': { $in: ?2 } }, " +
            "  { 'child_friendly': { $in: ?3 } }, " +
            "  { 'dog_friendly': { $in: ?4 } }, " +
            "  { 'energy_level': { $in: ?5 } }, " +
            "  { 'grooming': { $in: ?6 } }, " +
            "  { 'health_issues': { $in: ?7 } }, " +
            "  { 'intelligence': { $in: ?8 } }, " +
            "  { 'shedding_level': { $in: ?9 } }, " +
            "  { 'social_needs': { $in: ?10 } }, " +
            "  { 'stranger_friendly': { $in: ?11 } }, " +
            "  { 'vocalisation': { $in: ?12 } }, " +
            "  { 'experimental': { $in: ?13 } }, " +
            "  { 'hairless': { $in: ?14 } }, " +
            "  { 'natural': { $in: ?15 } }, " +
            "  { 'rare': { $in: ?16 } }, " +
            "  { 'rex': { $in: ?17 } }, " +
            "  { 'suppressed_tail': { $in: ?18 } }, " +
            "  { 'short_legs': { $in: ?19 } }, " +
            "  { 'hypoallergenic': { $in: ?20 } }, " +
            "  { 'country_code': { $in: ?21 } }, " +
            "  { 'origin': { $in: ?22 } } " +
//            "  { 'temperament': { $regex: ?23 } }" +

//            "  ,{ 'weight': { $in: ?24 } }, " +
//            "  { 'life_span': { $in: ?25 } } " +
            "] }")
    List<Breed> findByFilter(
            List<Integer> indoor,
            List<Integer> adaptability,
            List<Integer> affectionLevel,
            List<Integer> childFriendly,
            List<Integer> dogFriendly,
            List<Integer> energyLevel,
            List<Integer> grooming,
            List<Integer> healthIssues,
            List<Integer> intelligence,
            List<Integer> sheddingLevel,
            List<Integer> socialNeeds,
            List<Integer> strangerFriendly,
            List<Integer> vocalisation,
            List<Integer> experimental,
            List<Integer> hairless,
            List<Integer> natural,
            List<Integer> rare,
            List<Integer> rex,
            List<Integer> suppressedTail,
            List<Integer> shortLegs,
            List<Integer> hypoallergenic,
            List<String> countryCode,
            List<String> origin,
            List<String> temperament,
            List<String> weight,
            List<String> lifeSpan);

}
