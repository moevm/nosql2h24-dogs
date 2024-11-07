package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
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
            @RequestParam(required = false) String partName,
            @RequestParam(required = false) Integer indoorMin,
            @RequestParam(required = false) Integer indoorMax,
            @RequestParam(required = false) Integer adaptabilityMin,
            @RequestParam(required = false) Integer adaptabilityMax,
            @RequestParam(required = false) Integer affectionLevelMin,
            @RequestParam(required = false) Integer affectionLevelMax,
            @RequestParam(required = false) Integer childFriendlyMin,
            @RequestParam(required = false) Integer childFriendlyMax,
            @RequestParam(required = false) Integer dogFriendlyMin,
            @RequestParam(required = false) Integer dogFriendlyMax,
            @RequestParam(required = false) Integer energyLevelMin,
            @RequestParam(required = false) Integer energyLevelMax,
            @RequestParam(required = false) Integer groomingMin,
            @RequestParam(required = false) Integer groomingMax,
            @RequestParam(required = false) Integer healthIssuesMin,
            @RequestParam(required = false) Integer healthIssuesMax,
            @RequestParam(required = false) Integer intelligenceMin,
            @RequestParam(required = false) Integer intelligenceMax,
            @RequestParam(required = false) Integer sheddingLevelMin,
            @RequestParam(required = false) Integer sheddingLevelMax,
            @RequestParam(required = false) Integer socialNeedsMin,
            @RequestParam(required = false) Integer socialNeedsMax,
            @RequestParam(required = false) Integer strangerFriendlyMin,
            @RequestParam(required = false) Integer strangerFriendlyMax,
            @RequestParam(required = false) Integer vocalisationMin,
            @RequestParam(required = false) Integer vocalisationMax,
            @RequestParam(required = false) Integer experimentalMin,
            @RequestParam(required = false) Integer experimentalMax,
            @RequestParam(required = false) Integer hairlessMin,
            @RequestParam(required = false) Integer hairlessMax,
            @RequestParam(required = false) Integer naturalMin,
            @RequestParam(required = false) Integer naturalMax,
            @RequestParam(required = false) Integer rareMin,
            @RequestParam(required = false) Integer rareMax,
            @RequestParam(required = false) Integer rexMin,
            @RequestParam(required = false) Integer rexMax,
            @RequestParam(required = false) Integer suppressedTailMin,
            @RequestParam(required = false) Integer suppressedTailMax,
            @RequestParam(required = false) Integer shortLegsMin,
            @RequestParam(required = false) Integer shortLegsMax,
            @RequestParam(required = false) Integer hypoallergenicMin,
            @RequestParam(required = false) Integer hypoallergenicMax,
            @RequestParam(required = false) List<String> countryCode,
            @RequestParam(required = false) List<String> origin,
            @RequestParam(required = false) List<String> temperament,
            @RequestParam(required = false) Integer weightMin,
            @RequestParam(required = false) Integer weightMax,
            @RequestParam(required = false) Integer lifeSpanMin,
            @RequestParam(required = false) Integer lifeSpanMax) {
        return breedRepository.findAll().stream()
                .filter(breed -> (partName == null || breed.getName().toLowerCase().contains(partName.toLowerCase())))
                .filter(breed -> (indoorMin == null || breed.getIndoor() >= indoorMin) && (indoorMax == null || breed.getIndoor() <= indoorMax))
                .filter(breed -> (adaptabilityMin == null || breed.getAdaptability() >= adaptabilityMin) && (adaptabilityMax == null || breed.getAdaptability() <= adaptabilityMax))
                .filter(breed -> (affectionLevelMin == null || breed.getAffectionLevel() >= affectionLevelMin) && (affectionLevelMax == null || breed.getAffectionLevel() <= affectionLevelMax))
                .filter(breed -> (childFriendlyMin == null || breed.getChildFriendly() >= childFriendlyMin) && (childFriendlyMax == null || breed.getChildFriendly() <= childFriendlyMax))
                .filter(breed -> (dogFriendlyMin == null || breed.getDogFriendly() >= dogFriendlyMin) && (dogFriendlyMax == null || breed.getDogFriendly() <= dogFriendlyMax))
                .filter(breed -> (energyLevelMin == null || breed.getEnergyLevel() >= energyLevelMin) && (energyLevelMax == null || breed.getEnergyLevel() <= energyLevelMax))
                .filter(breed -> (groomingMin == null || breed.getGrooming() >= groomingMin) && (groomingMax == null || breed.getGrooming() <= groomingMax))
                .filter(breed -> (healthIssuesMin == null || breed.getHealthIssues() >= healthIssuesMin) && (healthIssuesMax == null || breed.getHealthIssues() <= healthIssuesMax))
                .filter(breed -> (intelligenceMin == null || breed.getIntelligence() >= intelligenceMin) && (intelligenceMax == null || breed.getIntelligence() <= intelligenceMax))
                .filter(breed -> (sheddingLevelMin == null || breed.getSheddingLevel() >= sheddingLevelMin) && (sheddingLevelMax == null || breed.getSheddingLevel() <= sheddingLevelMax))
                .filter(breed -> (socialNeedsMin == null || breed.getSocialNeeds() >= socialNeedsMin) && (socialNeedsMax == null || breed.getSocialNeeds() <= socialNeedsMax))
                .filter(breed -> (strangerFriendlyMin == null || breed.getStrangerFriendly() >= strangerFriendlyMin) && (strangerFriendlyMax == null || breed.getStrangerFriendly() <= strangerFriendlyMax))
                .filter(breed -> (vocalisationMin == null || breed.getVocalisation() >= vocalisationMin) && (vocalisationMax == null || breed.getVocalisation() <= vocalisationMax))
                .filter(breed -> (experimentalMin == null || breed.getExperimental() >= experimentalMin) && (experimentalMax == null || breed.getExperimental() <= experimentalMax))
                .filter(breed -> (hairlessMin == null || breed.getHairless() >= hairlessMin) && (hairlessMax == null || breed.getHairless() <= hairlessMax))
                .filter(breed -> (naturalMin == null || breed.getNatural() >= naturalMin) && (naturalMax == null || breed.getNatural() <= naturalMax))
                .filter(breed -> (rareMin == null || breed.getRare() >= rareMin) && (rareMax == null || breed.getRare() <= rareMax))
                .filter(breed -> (rexMin == null || breed.getRex() >= rexMin) && (rexMax == null || breed.getRex() <= rexMax))
                .filter(breed -> (suppressedTailMin == null || breed.getSuppressedTail() >= suppressedTailMin) && (suppressedTailMax == null || breed.getSuppressedTail() <= suppressedTailMax))
                .filter(breed -> (shortLegsMin == null || breed.getShortLegs() >= shortLegsMin) && (shortLegsMax == null || breed.getShortLegs() <= shortLegsMax))
                .filter(breed -> (hypoallergenicMin == null || breed.getHypoallergenic() >= hypoallergenicMin) && (hypoallergenicMax == null || breed.getHypoallergenic() <= hypoallergenicMax))
                .filter(breed -> (countryCode == null || countryCode.contains(breed.getCountryCode())))
                .filter(breed -> (origin == null || origin.contains(breed.getOrigin())))
                .filter(breed -> (temperament == null || breed.getTemperament().containsAll(temperament)))
                .filter(breed -> ((lifeSpanMin == null || lifeSpanMin <= breed.getLifeSpanMax()) && (lifeSpanMax == null || lifeSpanMax >= breed.getLifeSpanMin())))
                .filter(breed -> (weightMin == null || weightMin <= breed.getWeightMax()) && (weightMax == null || weightMax >= breed.getWeightMin()))
                .collect(Collectors.toList());
    }
}
