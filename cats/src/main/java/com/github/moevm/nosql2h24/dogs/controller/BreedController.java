package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.dto.BreedFilter;
import com.github.moevm.nosql2h24.dogs.dto.BreedInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/breeds")
public class BreedController {
    @Autowired
    private BreedRepository breedRepository;

    @GetMapping("")
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @GetMapping("/info")
    public List<BreedInfo> getAllBreedInfo() {
        return breedRepository.findAll().stream().map(BreedInfo::new).toList();
    }

    @GetMapping("/{id}")
    public Breed getBreedById(@PathVariable String id) {
        return breedRepository.findById(id).orElse(null);
    }

    @GetMapping("/{id}/info")
    public BreedInfo getBreedInfoById(@PathVariable String id) {
        Breed breed = breedRepository.findById(id).orElse(null);
        if (breed != null) {
            return new BreedInfo(breed);
        }
        return null;
    }

    @GetMapping("/search")
    public List<Breed> searchBreeds(
            @RequestParam(required = false) List<Integer> indoor,
            @RequestParam(required = false) List<Integer> adaptability,
            @RequestParam(required = false) List<Integer> affectionLevel,
            @RequestParam(required = false) List<Integer> childFriendly,
            @RequestParam(required = false) List<Integer> dogFriendly,
            @RequestParam(required = false) List<Integer> energyLevel,
            @RequestParam(required = false) List<Integer> grooming,
            @RequestParam(required = false) List<Integer> healthIssues,
            @RequestParam(required = false) List<Integer> intelligence,
            @RequestParam(required = false) List<Integer> sheddingLevel,
            @RequestParam(required = false) List<Integer> socialNeeds,
            @RequestParam(required = false) List<Integer> strangerFriendly,
            @RequestParam(required = false) List<Integer> vocalisation,
            @RequestParam(required = false) List<Integer> experimental,
            @RequestParam(required = false) List<Integer> hairless,
            @RequestParam(required = false) List<Integer> natural,
            @RequestParam(required = false) List<Integer> rare,
            @RequestParam(required = false) List<Integer> rex,
            @RequestParam(required = false) List<Integer> suppressedTail,
            @RequestParam(required = false) List<Integer> shortLegs,
            @RequestParam(required = false) List<Integer> hypoallergenic,
            @RequestParam(required = false) List<String> countryCode,
            @RequestParam(required = false) List<String> origin,
            @RequestParam(required = false) List<String> temperament,
            @RequestParam(required = false) List<String> weight,
            @RequestParam(required = false) List<String> lifeSpan) {
        return breedRepository.findAll().stream()
                .filter(breed -> (indoor == null || indoor.contains(breed.getIndoor())))
                .filter(breed -> (adaptability == null || adaptability.contains(breed.getAdaptability())))
                .filter(breed -> (affectionLevel == null || affectionLevel.contains(breed.getAffectionLevel())))
                .filter(breed -> (childFriendly == null || childFriendly.contains(breed.getChildFriendly())))
                .filter(breed -> (dogFriendly == null || dogFriendly.contains(breed.getDogFriendly())))
                .filter(breed -> (energyLevel == null || energyLevel.contains(breed.getEnergyLevel())))
                .filter(breed -> (grooming == null || grooming.contains(breed.getGrooming())))
                .filter(breed -> (healthIssues == null || healthIssues.contains(breed.getHealthIssues())))
                .filter(breed -> (intelligence == null || intelligence.contains(breed.getIntelligence())))
                .filter(breed -> (sheddingLevel == null || sheddingLevel.contains(breed.getSheddingLevel())))
                .filter(breed -> (socialNeeds == null || socialNeeds.contains(breed.getSocialNeeds())))
                .filter(breed -> (strangerFriendly == null || strangerFriendly.contains(breed.getStrangerFriendly())))
                .filter(breed -> (vocalisation == null || vocalisation.contains(breed.getVocalisation())))
                .filter(breed -> (experimental == null || experimental.contains(breed.getExperimental())))
                .filter(breed -> (hairless == null || hairless.contains(breed.getHairless())))
                .filter(breed -> (natural == null || natural.contains(breed.getNatural())))
                .filter(breed -> (rare == null || rare.contains(breed.getRare())))
                .filter(breed -> (rex == null || rex.contains(breed.getRex())))
                .filter(breed -> (suppressedTail == null || suppressedTail.contains(breed.getSuppressedTail())))
                .filter(breed -> (shortLegs == null || shortLegs.contains(breed.getShortLegs())))
                .filter(breed -> (hypoallergenic == null || hypoallergenic.contains(breed.getHypoallergenic())))
                .filter(breed -> (countryCode == null || countryCode.contains(breed.getCountryCode())))
                .filter(breed -> (origin == null || origin.contains(breed.getOrigin())))
          //      .filter(breed -> (temperament == null || temperament.contains(breed.getTemperament())))
          //      .filter(breed -> (weight == null || weight.contains(breed.getWeight())))
          //      .filter(breed -> (lifeSpan == null || lifeSpan.contains(breed.getLifeSpan())))
                .collect(Collectors.toList());

    }
}
